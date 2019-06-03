
// Setting the local storage

const storageKey = 'todos';

const convertStringToObj = (str) => JSON.parse(str) || [];

const converObjToString = (obj) => JSON.stringify(obj) || '';

// setting todo function

const getTodos = () => convertStringToObj(localStorage.getItem(storageKey));

// Add an item to the todo function

const addTodo = (todo) => localStorage.setItem(storageKey, converObjToString([...getTodos(), todo]));

// Delete an item from the todo function

const deleteTodo = (todo) => localStorage.setItem(storageKey, converObjToString(getTodos().filter(_todo => _todo !== todo)));

// creating our li elements 

const buildTodoEl = (todo) => {
    const el = document.createElement('li');
    el.classList.add('list-group-item');
    el.innerText = todo;
    return el;
}

// Inject li item to the ul element

const appendLiToDOM = (el) => document.getElementById('todo-list-container').appendChild(el);

// Clear UI todo list display

const clearTodoListDisplay = () => document.getElementById('todo-list-container').innerHTML = '';

// clear input field 

const clearInput = () => document.getElementById('new-todo-input').value = '';

// display our todo on the screen

const displayTodos = () => {
    clearInput();
    clearTodoListDisplay();
    getTodos().forEach(_todo => appendLiToDOM(buildTodoEl(_todo)));
    initClickListeners();
}

// create init function for our event listener

const initClickListeners = () => {
    Array.from(document.getElementsByClassName('list-group-item')).forEach(_item => {
        _item.addEventListener('click', (event) => {
            const todo = event.target.innerText;
            if(window.confirm('Are you sure you want to delete this item? ' + todo)) {
                deleteTodo(todo);
                displayTodos();
            }
        });
    });
}

// Adding event listener 

document.addEventListener('DOMContentLoaded', () => displayTodos());

document.getElementById('submit-new-todo-btn').addEventListener('click', (event) => {
    const newTodoInput = document.getElementById('new-todo-input');
    if(newTodoInput.value) {
        addTodo(newTodoInput.value.trim());
        displayTodos();
    }
});



