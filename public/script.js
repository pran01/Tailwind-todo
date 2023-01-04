let modal = document.querySelector("#modal");
let blur = document.querySelector("#blur");
let addbtn = document.querySelector("#addbtn");
let editbtn = document.getElementsByClassName(".editbtn");
let cancelbtn = document.querySelector("#cancelbtn");
let taskNameInp = document.querySelector("#name");
let saveBtn = document.querySelector("#savebtn");
let taskBeingEdited = -1;
let lastAdded = 6;
let todos = new Array();

function deleteTodo(id) {
  todos = todos.filter(function (ele) {
    return ele.id != id;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// todo={
//     id:1,
//     name:"dkfjdf",
//     status:"In Progress",
// }

let showOrRemModal = () => {
  modal.classList.toggle("hidden");
  blur.classList.toggle("hidden");
};

let openEditModal = (element) => {
  taskNameInp.value = element.name;
  document.querySelector(
    `#${element.status.replace(/\s/g, "").toLowerCase()}-status`
  ).checked = true;
  taskBeingEdited = element.id;
  showOrRemModal();
};

let sortTodos = () => {
  todos.sort((a, b) => {
    let sta = a.status.toLowerCase(),
      stb = b.status.toLowerCase();

    if (sta < stb) {
      return 1;
    }
    if (sta > stb) {
      return -1;
    }
    return 0;
  });
};

cancelbtn.addEventListener("click", () => {
  taskBeingEdited = -1;
  document.querySelector("#todo-status").checked = true;
  taskNameInp.value = "";
  showOrRemModal();
});

addbtn.addEventListener("click", () => {
  taskBeingEdited = lastAdded + 1;
  document.querySelector("#todo-status").checked = true;
  showOrRemModal();
});

saveBtn.addEventListener("click", () => {
  for (let task of todos) {
    if (task.id == taskBeingEdited) {
      task.name = taskNameInp.value;
      task.status = document.querySelector(
        'input[name="status"]:checked'
      ).value;
      render();
      taskBeingEdited = -1;
      document.querySelector("#todo-status").checked = true;
      taskNameInp.value = "";
      showOrRemModal();
      localStorage.setItem("todos", JSON.stringify(todos));
      return;
    }
  }
  lastAdded = taskBeingEdited;
  let todo = {
    id: taskBeingEdited,
    name: taskNameInp.value,
    status: document.querySelector('input[name="status"]:checked').value,
  };
  todos.push(todo);
  render();
  taskBeingEdited = -1;
  document.querySelector("#todo-status").checked = true;
  taskNameInp.value = "";
  showOrRemModal();
  localStorage.setItem("todos", JSON.stringify(todos));
  return;
});

let tbody = document.querySelector(".table-body");

let render = () => {
  sortTodos();
  tbody.innerHTML = ``;
  Array.from(todos).forEach((element) => {
    let tr = document.createElement("tr");
    tr.setAttribute("class", "text-center h-12 md:h-8");
    tr.setAttribute("id", element.id);

    let tdName = document.createElement("td");
    tdName.setAttribute("class", "w-min");
    tdName.innerText = element.name;
    tr.appendChild(tdName);

    let tdSt = document.createElement("td");
    tdSt.innerText = element.status;
    tr.appendChild(tdSt);

    let tdEdit = document.createElement("td");
    let btn = document.createElement("button");
    btn.setAttribute("class", "editbtn");
    btn.addEventListener("click", () => {
      openEditModal(element);
    });
    let i = document.createElement("i");
    i.setAttribute("class", `fa fa-pencil ${element.id}`);
    btn.appendChild(i);
    tdEdit.appendChild(btn);
    tr.appendChild(tdEdit);

    let tdRem = document.createElement("td");
    let btn2 = document.createElement("button");
    btn2.setAttribute("class", "removebtn");
    btn2.addEventListener("click", (event) => {
      let id = event.target.classList[2];
      console.log(id);
      deleteTodo(id);
      render();
    });
    let i2 = document.createElement("i");
    i2.setAttribute("class", `fa fa-remove ${element.id}`);
    btn2.appendChild(i2);
    tdRem.appendChild(btn2);

    tr.appendChild(tdRem);
    tbody.appendChild(tr);
  });
};

let loadTasks = () => {
  todos = Array.from(JSON.parse(localStorage.getItem("todos")));
  console.log(todos);
  render();
};
loadTasks();

// let removeBtn = document.getElementsByClassName("removebtn");
// Array.from(removeBtn).forEach((element) => {
//   element.addEventListener("click", (event) => {
//     let id = event.target.classList[2];
//     console.log(id);
//     deleteTodo(todos, id);
//     render();
//   });
// });
