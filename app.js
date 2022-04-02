// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo');


// Events
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('change', filterItems);


// Functions
function addTodo() {
    if(todoInput.value === '') {
        alert('pole jest puste');
    } 
    else {
    // Todo li
        const todoListItem = document.createElement('li');
        todoListItem.classList.add('todo');

    // Create li element
        const newTodo = document.createElement('p');
        newTodo.textContent = todoInput.value;
        newTodo.classList.add('todo-list');
        todoListItem.appendChild(newTodo);

    // Add todo to localStorage
        saveLocalStorage(todoInput.value);

    // check mark btn
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('complete-btn');
        completedBtn.setAttribute('aria-label', 'Complete button');
        todoListItem.appendChild(completedBtn);

    // trash btn
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        trashBtn.setAttribute('aria-label', 'delete todo button');
        todoListItem.appendChild(trashBtn);

    // append to list
        todoList.appendChild(todoListItem);

    // clear input value after addTodo
        todoInput.value = '';
    }
}

function deleteCheck(e) {
    const item = e.target;
    // Delete the item
    if(item.classList.contains('trash-btn')) {
        const parentElementItem = item.parentElement;
        parentElementItem.remove();
        removeTodoFromLocalStorage(parentElementItem);
    }

    // check mark item
    if(item.classList.contains('complete-btn')) {
        const parentElementItem = item.parentElement;
        saveCompleted(parentElementItem);
        parentElementItem.classList.toggle('completed');
    }
}

// Filter out completed and uncompleted items
function filterItems(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}


// save todos to an local storage
function saveLocalStorage(todo) {
    // check if we already have
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// get todos from localStorage and display on the screen
function getTodos() {
    // check if we already have todos
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // check if we already have completed todos
    let completedTodos;
    if(localStorage.getItem('completedTodos') === null) {
        completedTodos = [];
    }
    else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'))
    }
    //load completed todos
    completedTodos.forEach(todos => {
        const todoListItem = document.createElement('li');
        todoListItem.classList.add('todo');

    // Create li element
        const newTodo = document.createElement('p');
        newTodo.textContent = todos;
        newTodo.classList.add('todo-list');
        todoListItem.appendChild(newTodo);

    // check mark btn
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('complete-btn');
        completedBtn.setAttribute('aria-label', 'Complete button');
        todoListItem.appendChild(completedBtn);

    // trash btn
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        trashBtn.setAttribute('aria-label', 'delete todo button');
        todoListItem.appendChild(trashBtn);

    // append to list
        todoList.appendChild(todoListItem);
        todoListItem.classList.add('completed');
    })


    // load todos
    todos.forEach(todos => {
        const todoListItem = document.createElement('li');
        todoListItem.classList.add('todo');

    // Create li element
        const newTodo = document.createElement('p');
        newTodo.textContent = todos;
        newTodo.classList.add('todo-list');
        todoListItem.appendChild(newTodo);

    // check mark btn
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('complete-btn');
        completedBtn.setAttribute('aria-label', 'Complete button');
        todoListItem.appendChild(completedBtn);

    // trash btn
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        trashBtn.setAttribute('aria-label', 'delete todo button');
        todoListItem.appendChild(trashBtn);

    // append to list
        todoList.appendChild(todoListItem);
    })
}

// remove items form localStorage
function removeTodoFromLocalStorage(todo) {
    // check if we already have
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
        const todoIndex = todo.childNodes[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));

    let completedTodos;
    if(localStorage.getItem('completedTodos') === null) {
        completedTodos = [];
    }
    else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'))
    }
    completedTodos.splice(completedTodos.indexOf(todoIndex), 1);
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
}

// Save checked todos
function saveCompleted(todo) {
    let completedTodos;

    // check if we already have todos
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // check if we already have completedTodos
    if(localStorage.getItem('completedTodos') === null) {
        completedTodos = [];
    }
    else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'))
    }

    if(!completedTodos.includes(todo.childNodes[0].innerText)) {
        completedTodos.push(todo.childNodes[0].innerText)
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
        // delete from todos tab
        const todoIndex = todo.childNodes[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    else {
        //delete form completedTodos
        const todoIndex = todo.childNodes[0].innerText;
        completedTodos.splice(completedTodos.indexOf(todoIndex), 1);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
        // Add back to todos table
        saveLocalStorage(todoIndex);
    }
}



// call getTodos function
getTodos();