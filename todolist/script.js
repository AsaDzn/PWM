const button = document.querySelector("#NT");
const task = document.querySelector("#taskbox");
const txtTsk = document.querySelector("#txtTsk");
const nomeTsk = document.querySelector("#nomeTsk");
function conferma(){
    alert("Task aggiunta con successo!!");

}

// 
let todos = [];
let todo={}



function aggiuntaTask(){
   todo={
    data: Date.now(),
    nome: nomeTsk.value,
    txt: txtTsk.value,
    check: false
   }

   todos.unshift(todo);

   conferma();
}
// map ritorna, per ogni elemento dell' array lui scrive una parte di una stringa che per essere concatenata usiamo il join(" ") dve " " e' elemento separatore
task.innerHTML=`
    ${todos.map(todo => {
        return `
            <div> </div>
        `
    }).join(" ")}
`;

button.addEventListener('click', aggiuntaTask);

