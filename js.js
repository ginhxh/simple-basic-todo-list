const input = document.querySelector("input");
const h1 = document.querySelector("h1");
const ul = document.querySelector(".om");
const sub = document.querySelector(".sub");

let alllTOdo = JSON.parse(localStorage.getItem("alllTOdo")) || [];

sub.addEventListener("click", () => {
  if (input.value !== "") {
    const newTodo = {
      text: input.value,
      done: false,
    };

    alllTOdo.push(newTodo);

    localStorage.setItem("alllTOdo", JSON.stringify(alllTOdo));

    renderAllTodos();

    input.value = "";
  }
});

window.addEventListener("load", () => {
  renderAllTodos();
});

function renderTodoItem(todo, index) {
  let li = document.createElement("li");
  let tegxt = document.createElement("p");

  let delet = document.createElement("button");
  let modifie = document.createElement("button");
  let mark = document.createElement("button");

  mark.textContent = "Done";
  delet.textContent = "Delete";
  modifie.textContent = "Modify";
  tegxt.textContent = todo.text;

  if (todo.done) {
    tegxt.style.textDecoration = "line-through";
  }

  ul.append(li);
  li.append(tegxt, modifie, mark, delet);

  delet.addEventListener("click", () => {
    li.remove();
    alllTOdo.splice(index, 1);
    localStorage.setItem("alllTOdo", JSON.stringify(alllTOdo));
    renderAllTodos();
  });

  mark.addEventListener("click", () => {
    todo.done = !todo.done;

    tegxt.style.textDecoration = todo.done ? "line-through" : "none";

    localStorage.setItem("alllTOdo", JSON.stringify(alllTOdo));
  });

  modifie.addEventListener("click", () => {
    let inputmdf = document.createElement("input");
    let submiMdf = document.createElement("button");
    submiMdf.textContent = "Submit";
    li.append(inputmdf, submiMdf);

    submiMdf.addEventListener("click", () => {
      todo.text = inputmdf.value;
      localStorage.setItem("alllTOdo", JSON.stringify(alllTOdo));
      tegxt.textContent = inputmdf.value;
      submiMdf.style.display = "none";
      inputmdf.style.display = "none";
    });
  });
}

function renderAllTodos() {
  ul.innerHTML = "";
  alllTOdo.forEach((todo, index) => renderTodoItem(todo, index));
}
