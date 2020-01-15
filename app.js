//==========================Event Listeners====================================
//AddBookToList

    document.querySelector('#book-form').addEventListener('submit', function(e){
        const title = document.querySelector('#title-box').value,
            author = document.querySelector('#author-box').value,
            isbn = document.querySelector('#isbn-box').value;

        const book = new Book(title, author, isbn);
        const ui = new UI();


        if(title === '' || author === '' || isbn === ''){
            ui.showMessage(`Please check the text boxes`, 'error');

        }else{
            ui.addBookToList(book);
            ui.showMessage(`Book successfully added`, 'success');
            ui.clearFields();

        }

        e.preventDefault();

    }); 

//RemoveBookFromList

    document.querySelector('#book-list').addEventListener('mousedown', function(e){
        const ui = new UI();

        ui.removeBook(e.target);


        e.preventDefault();

    });


//==========================Book Constructor ==================================
function Book(title, author, isbn){

    this.title = title;
    this.author = author;
    this.isbn = isbn;

}


//==========================UI Constructor ====================================
function UI(){}

UI.prototype.addBookToList = function(book){

    const row = document.createElement('tr'); 
        
    row.innerHTML = ` 
    <td> ${book.title}</td>
    <td> ${book.author}</td>
    <td> ${book.isbn}</td>
    <td> <a href="#" class="fa fa-close"></a></td>
    `;

    document.querySelector('#book-list').appendChild(row);
    

}

UI.prototype.clearFields = function(){
    document.querySelector('#title-box').value = '';
    document.querySelector('#author-box').value = '';
    document.querySelector('#isbn-box').value = '';
}

UI.prototype.removeBook = function(target){

    if(target.className === 'fa fa-close'){
        if(confirm("Are you sure?")){
            target.parentElement.parentElement.remove();
            this.showMessage(`Book removed`, 'warning');
        }
    }
}

UI.prototype.showMessage = function(msg, type){

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









