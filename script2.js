task = document.querySelector("#task");
myform = document.querySelector("#myform");
lists = document.querySelector("#list");
checkmain = document.querySelector("#check");
divinput = document.querySelector("#orginput");
litems = document.querySelector(".items-left");
coun = document.querySelector(".counts");
comple = document.querySelector(".completed");
noele = document.querySelector('.noele');
svg = document.querySelector('.svg')
svg1= document.querySelector('.svg1')
window.addEventListener("load", (e) => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  myform.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      check: e.target.elements.ch.checked,
      task: e.target.elements.task.value,
      completed:"no"
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    task.value = "";

    dis();
  });
  dis();
});

function total() {
  let total = todos.length;
  litems.innerHTML = `${total} items left`;
}

function dis() {
  lists.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    const x = todo.check;
    check.checked = x;
    li.appendChild(check);
    const label = document.createElement("label");
    const t = document.createTextNode(` ${todo.task} `);
    label.appendChild(t);
    label.classList.add("list-label");
    li.appendChild(label);
    const btn = document.createElement("button");
    btn.classList.add("delbtn");
    li.appendChild(btn);

    //li element
    lists.appendChild(li);
    li.classList.add("list-element", "task-container");
    total();

    function cg(){
        if (todo.completed ==="yes") {
            label.classList.add("strike");
          } else {
            label.classList.remove("strike");
          }
    }
    cg();
    //label  strike unstrike
    check.addEventListener('click',(e)=>{
        let checkproperty= check.checked
        todo.check=checkproperty
        localStorage.setItem("todos", JSON.stringify(todos));
    })

    label.addEventListener('click', strikefun);

    function strikefun(){
        if (todo.completed ==="no") {
            label.classList.add("strike");
            todo.completed="yes"
            localStorage.setItem("todos", JSON.stringify(todos));
    
          } else {
            label.classList.remove("strike");
            todo.completed="no"
            localStorage.setItem("todos", JSON.stringify(todos));
    
          }
    }

    //remove element

    btn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      dis();
      total();
    });










    coun.addEventListener("click", filter);

    function filter(e) {
      const item = e.target;

      if (item.classList[0] === "all") {
        li.style.display = "flex";
        noele.style.display="none"
      }else{

      }

      if (item.classList[0] === "completed") {
        if (label.classList.contains("strike")) {
          li.style.display = "flex";   
        } else {
          li.style.display = "none";     
        }
      }

      if (item.classList[0] === "active") {
        if (check.checked === true) {
          lis.style.display="flex"
        } else {
          li.style.display = "none"; 
        }
      }


      if (item.classList[0] == "clearall") {
        if (label.classList.contains("strike")) {
          todos = todos.filter((t) => t != todo);
          localStorage.setItem("todos", JSON.stringify(todos));
          dis();
          total();
        }
      }
    }
  });


}
// clicked change to dark theme
svg.addEventListener('click', (e)=>{
  console.log("hello");
  svg1.style.display="block"
  svg.style.display="none"
  document.body.style.backgroundImage="url('images/bg-desktop-dark.jpg')";
  document.body.style.backgroundColor="black"
  lists.backgroundColor="black"


})
svg1.addEventListener('click',(e)=>{
  svg1.style.display="none"
  svg.style.display="block"
  document.body.style.backgroundImage="url('images/bg-desktop-light.jpg')";
  document.body.style.backgroundColor="white";

})

// comple.addEventListener('click' , (e)=>{
//     let g =0
//     for(let i =1;i<lists.childNodes.length-1;i++){
//        if(lists.childNodes[i].style.display==="flex"){
//            g=g+1
//        }

//     }
//     litems.innerHTML=`${g} items left`

// })
