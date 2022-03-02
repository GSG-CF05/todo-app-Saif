let todoInput = document.querySelector('.todo-input');
let todoAdd = document.querySelector('.todo-add-btn');
let todoList = document.querySelector('.todo-list');


todoAdd.addEventListener('click',addNewTodo);

// create list item function : 
function createLi(value){
    let newTodo = document.createElement('li');
    newTodo.innerHTML = 
    `
      <p>${value}</p>
      <div class="icons"> 
            <i class="fa-solid fa-circle-xmark delete-icon" title="delete" ></i>
            <i class="fa-solid fa-pen-to-square edit-icon" title="edit" ></i>
      </div>
    ` ;
    todoList.appendChild(newTodo);
    newTodo.classList.add('new-todo');
}

function addNewTodo(event){
    // prevent default setting for the form and btn
     event.preventDefault();

   //   create array to store the data 
     let allTodo = [];

    // check if localStorage is empty or not 
    if(localStorage.getItem('allTodo')){
        allTodo = JSON.parse(localStorage.getItem('allTodo'));
    }

   let inputValue = todoInput.value ;
   if(inputValue != ""){

    //   create li element with his children
     createLi(inputValue);

    // push the new value into array 
    allTodo.push(inputValue);

    // add the new Array into local storage
    localStorage.setItem('allTodo',JSON.stringify(allTodo));

    // empty textBox input 
    todoInput.value = '';
   }

}


window.onload = resetTodo ;
function resetTodo(){
    let allTodo = [];
    if(localStorage.getItem('allTodo')){
         allTodo = JSON.parse(localStorage.getItem('allTodo'));
    } 
    for(let i = 0 ; i<allTodo.length ; i++){
        createLi(allTodo[i]);
    }
}

// Delete function 
document.addEventListener('click',function(e){
    let clickedItem = e.target;

    if(clickedItem.className.includes('delete-icon')){

        let iconsDiv = clickedItem.parentElement ;
        let ListItem = iconsDiv.parentElement;
     
         
        let allTodo = [];
        if(localStorage.getItem('allTodo')){
             allTodo = JSON.parse(localStorage.getItem('allTodo'));
        } 
        let textLi = ListItem.innerText.trimEnd();
        let IndexOfDeleteIcon = allTodo.indexOf(textLi);
        
        // Delete Element form the array 
        allTodo.splice(IndexOfDeleteIcon,1);
        localStorage.setItem('allTodo',JSON.stringify(allTodo));


        // Delete Element form the page 
        ListItem.remove();
  
    }   
})

