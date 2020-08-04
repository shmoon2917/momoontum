const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanTodos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanTodos;
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  const newId = toDos.length + 1;

  delBtn.addEventListener("click", deleteTodo);
  delBtn.innerText = "X";
  span.innerText = text;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveTodos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);

  toDoInput.value = "";
}

function loadToDos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();