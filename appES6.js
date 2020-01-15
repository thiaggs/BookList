//===========================Classes===========================================
class  Book{

    constructor(title, author, isbn){

        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI{

    constructor(){}

    addBookToList(book){

        const row = document.createElement('tr'); 
        
        row.innerHTML = ` 
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href="#" class="fa fa-close"></a></td>
        `;
    
        document.querySelector('#book-list').appendChild(row);
    }

    clearFields(){
        document.querySelector('#title-box').value = '';
        document.querySelector('#author-box').value = '';
        document.querySelector('#isbn-box').value = '';
    }

    removeBook(target){

        if(target.className === 'fa fa-close'){
            if(confirm("Are you sure?")){

                target.parentElement.parentElement.remove();
                //Remove book from localStorage
                Store.removeBook(target.parentElement.previousElementSibling.textContent);    
            }

        }
        
    }

    showMessage(msg, type){

        if(document.querySelector(`.alert.alert-${type}`)){
            return;
            
        }
    
        const messageDiv = document.createElement('div');
        const form = document.querySelector('#book-form');
        const  container = document.querySelector('.container');
        
        if(type === 'error'){
    
            messageDiv.className = 'alert alert-error';
        
        }else if(type === 'success'){
            messageDiv.className = 'alert alert-success';
        
        }else{
            messageDiv.className = 'alert alert-warning';
        
        }
    
        messageDiv.appendChild(document.createTextNode(msg));
        container.insertBefore(messageDiv, form);
    
        setTimeout(function(){
            messageDiv.remove();
        }, 3000);

    }

}

class Store{

    static getBooks(){

        let books;

        if(localStorage.getItem('books') === null){
            books = [];
        }else{

            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }

    static displayBooks(){

        const books = Store.getBooks();
        const ui = new UI;

        books.forEach(function(book){

            ui.addBookToList(book);
        });
        
    }

    static addBook(book){

        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn){


        
        const books = Store.getBooks();
    

        books.forEach(function(book, index){

            if(book.isbn == isbn){

                books.splice(index, 1);

            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }
}

//==========================Event Listeners====================================
//AddBookToList

    document.querySelector('#book-form').addEventListener('submit', function(e){
        const title = document.querySelector('#title-box').value,
            author = document.querySelector('#author-box').value,
            isbn = document.querySelector('#isbn-box').value;

        const book = new Book(title, author, isbn);
        const ui = new UI();


        if(title === '' || author === '' || isbn === ''){
            ui.showMessage(`Please check the text fields`, 'error');

        }else{
            ui.addBookToList(book);
            Store.addBook(book);

            ui.showMessage(`Book successfully added`, 'success');
            ui.clearFields();

        }

        e.preventDefault();

    }); 

//RemoveBookFromList

    document.querySelector('#book-list').addEventListener('mousedown', function(e){
        const ui = new UI();

        ui.removeBook(e.target);
        ui.showMessage(`Book removed`, 'warning');

        e.preventDefault();

    });

//DisplayListOfBooks

    document.addEventListener('DOMContentLoaded', Store.displayBooks());