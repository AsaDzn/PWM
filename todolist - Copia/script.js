// inseriamo una costante per ogni elemento con il quale dobbiamo interagire all'interno del codice
const button = document.querySelector("#NT"); // Bottone per inserire una nuova task
const task = document.querySelector("#taskbox"); // Spazio dove ci sono le task da fare (è un div)
const taskC = document.querySelector("#checkedtaskbox"); // Spazio dove ci sono le task completate (è un div)
const txtTsk = document.querySelector("#txtTsk"); // È l'input="text" dove si inserisce il testo della task
const nomeTsk = document.querySelector("#nomeTsk"); // È l'input="text" dove si inserisce il nome della task

let todos = [];  // Lista delle task attive
let todosC = []; // Lista delle task completate

// Funzione per aggiungere una task
function aggiuntaTask() {
    let todo = {
        id: Date.now(), // ID univoco basato sul timestamp
        data: new Date().toLocaleString(),
        nome: nomeTsk.value.trim() === "" ? "Unsigned" : nomeTsk.value.trim(),
        txt: txtTsk.value.trim() === "" ? "Unsigned" : txtTsk.value.trim()
    };

    todos.unshift(todo); // Aggiunge la task in cima all'array
    addTask(todo); // Passiamo l'oggetto della task
    txtTsk.value = "";
    nomeTsk.value = "";
}

// Funzione per aggiungere la task al DOM
function addTask(todo) {
    let tsk = document.createElement("div");
    tsk.id = `tsk-${todo.id}`;
    tsk.classList.add("boxes");

    tsk.innerHTML = `
        <h3>${todo.nome}</h3>
        <p>${todo.txt}</p>
        <h6>${todo.data}</h6>
        <button class="buttBox" onclick="deleteTask(${todo.id})">Elimina Task</button> 
        <button class="buttBox" onclick="checkTask(${todo.id})">Task Completata</button>
    `;

    task.appendChild(tsk);
}

// Funzione per eliminare la task dal DOM e dall'array
function deleteTask(id) {
    // Trova l'elemento nel DOM
    let taskToRemove = document.querySelector(`#tsk-${id}`);
    if (taskToRemove) {
        taskToRemove.remove(); // Rimuove dal DOM
    }

    // Rimuove la task dall'array
    todos = todos.filter(todo => todo.id !== id);
}

// Funzione per completare la task
function checkTask(id) {
    let completed = todos.find(todo => todo.id === id);
    if (!completed) return; // Se non troviamo la task, non fare nulla

    // Crea un oggetto per la task completata
    let todoC = {
        ...completed,  // Copia tutti i dati della task
        data: "Completata il: " + new Date().toLocaleString()
    };

    todosC.unshift(todoC); // Aggiunge la task completata all'inizio
    deleteTask(id); // Elimina la task dal DOM e dall'array "todos"
    checkerTask(todoC); // Aggiungi la task completata nel DOM
}

// Funzione per aggiungere la task completata al DOM
function checkerTask(todoC) {
    let tskC = document.createElement("div");
    tskC.id = `tskC-${todoC.id}`;
    tskC.classList.add("boxes");

    tskC.innerHTML = `
        <h3>${todoC.nome}</h3>
        <p>${todoC.txt}</p>
        <h6>${todoC.data}</h6>
        <button class="buttBox" onclick="deleteTaskC(${todoC.id})">Elimina Task</button> 
    `;

    taskC.appendChild(tskC);
}

// Funzione per eliminare la task completata
function deleteTaskC(id) {
    let taskToRemove = document.querySelector(`#tskC-${id}`);
    if (taskToRemove) {
        taskToRemove.remove(); // Rimuove dal DOM
    }

    todosC = todosC.filter(todo => todo.id !== id); // Rimuove dall'array "todosC"
}

button.addEventListener("click", aggiuntaTask);
