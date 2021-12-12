// TODO === variable we need ===
const todoList = document.querySelector(".todo-list");
const addTodoBtn = document.querySelector("#btnAdd");

// TODO === function we need ===
// * get data from localStorage
function getData() {
  let listNotes = localStorage.getItem("listNotes");
  let noteObj; // * store data when parsed

  noteObj = listNotes != null ? JSON.parse(listNotes) : [];

  return noteObj;
}

// * show todo list from localStorage
function showTodo() {
  todoList.innerHTML = "";

  // ! have a lot of todoItem, scroll
  // ? get data from localStorage
  const listTodoData = [...getData()];

  if (listTodoData.length > 0) {
    listTodoData.forEach((item, index) => {
      const listTodoItem = document.createElement("li");
      listTodoItem.classList.add("todo-item");
      let styleSpan = "";
      if (item.completed == 1) {
        styleSpan = `text-decoration: line-through;`;
      }
      listTodoItem.innerHTML = `
        <span onclick="todoStatus(${index})" style="${styleSpan}">
            ${item.note}
        </span>
        <button onclick="delTodo(${index})" class="btnDel">
          <ion-icon name="trash-bin"></ion-icon>
        </button>
      `;
      todoList.appendChild(listTodoItem);
    });
  } else {
    todoList.innerHTML = `
          <h2>No data</h2>
        `;
  }
}

// * add todo item and update data in localStorage when click add Btn
function addTodo() {
  const todoText = document.querySelector("#todoText");

  // ? get data from localStorage
  const listTodoData = [...getData()];

  if (todoText.value == "") {
    alert("You have not entered the value");
  } else {
    // ? check todo text exist
    let todoTextValid = true;
    // ? check todo text exist
    listTodoData.forEach((todoItem) => {
      if (todoItem.note == todoText.value) {
        alert("To do already exists");
        todoText.value = "";
        todoTextValid = false;
      }
    });

    if (todoTextValid) {
      // ? add todo to listNotesData array
      listTodoData.push({
        note: `${todoText.value}`,
        completed: 0,
      });

      // ? store to localStorage
      localStorage.setItem("listNotes", JSON.stringify(listTodoData));

      // ? reset todoText input
      todoText.value = "";

      // ? show todo notes again
      showTodo();
    }
  }
}

// * delete todo item and update data in localStorage when click del Btn
function delTodo(index) {
  // ? get data from localStorage
  const listTodoData = [...JSON.parse(localStorage.getItem("listNotes"))];

  // ? delete data and update from localStorage
  listTodoData.splice(index, 1);
  localStorage.setItem("listNotes", JSON.stringify(listTodoData));

  // ? show todo notes again
  showTodo();
}

// * set todo item status and update data in localStorage when click
function todoStatus(index) {
  // ? get data from localStorage
  const listTodoData = [...JSON.parse(localStorage.getItem("listNotes"))];

  listTodoData.forEach((item, itemIndex) => {
    if (itemIndex == index) {
      if (item.completed == 0) {
        item.completed = 1;
      } else {
        item.completed = 0;
      }
    }
  });

  // ? store to localStorage
  localStorage.setItem("listNotes", JSON.stringify(listTodoData));

  // ? show todo notes again
  showTodo();
}

// ? Show when dom loaded
showTodo();

// TODO === add event when action ===
addTodoBtn.addEventListener("click", addTodo);
