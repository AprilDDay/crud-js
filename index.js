const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const todo = document.getElementById("todo");

let todoList = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {

    const newTodo = input.value;
//dont add if already on todo list
    if (!newTodo) return;

//add to todo list
    todoList.push({
        text: newTodo,
        completed: false,
    });

    //set in local storage    
    localStorage.setItem("todos", JSON.stringify(todoList));

    render();
}//end function addTodo()

function render () {
    todo.innerHTML = null;

    const todos = localStorage.getItem("todos");

    todoList = JSON.parse(todos) || [];

    for (let i =0; i  < todoList.length; i++) {
        const item = document.createElement("li");
//checkbox to update completed state
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.addEventListener("click", function(e){
            todoList[i].completed = e.target.checked;
            localStorage.setItem("todos", JSON.stringify(todoList));

            if(todoList[i].completed) {
                item.classList.add("completed");
                item.classList.remove("uncompleted");
                checkbox.checked = todoList[i].completed;
            } else {
                item.classList.add("uncompleted");
                item.classList.remove("completed");
                checkbox.checked = todoList[i].completed;
            }
        });
    } 

// add delete button and function
    const text = document.getElementById("p");
    text.innerText = todoList[i].text;

    const button = document.getElementById("button");
    button.innerText="delete";
    button.addEventListener("click", function(){
        todoList.splice(i,1);
        localStorage.setItem("todos", JSON.stringify(todoList));
    });

} //end function render()

