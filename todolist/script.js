// inseriamo una costante per ogni elemento con il quale dobbiamo interagire all'interno del codice
const button = document.querySelector("#NT"); // Bottone per inserire una nuova task
const task = document.querySelector("#taskbox"); // Spazio dove ci sono le task da fare (è un div)
const taskC = document.querySelector("#checkedtaskbox"); // Spazio dove ci sono le task completate (è un div)
const txtTsk = document.querySelector("#txtTsk"); // È l'input="text" dove si inserisce il testo della task
const nomeTsk = document.querySelector("#nomeTsk"); // È l'input="text" dove si inserisce il nome della task
const buttonDel = document.querySelector("#deleteButt"); // È il bottone che ritroviamo all'interno delle task per eliminarl, nonostante non sia
// presente allo stato attuale all'interno del codice, lo sarà visto che quando aggiungiamo una task, ci sarà un bottone con questo id impostato da me
const buttonCheck = document.querySelector("#CompleteButt"); // È il bottone per mettere in checked le task, e seguiamo lo stesso ragionamento del
// bottone di delete

let todos = []; // Dichiariamo e inizializziamo l'array che conterrà le nostre task
let todo={}; // Dichiariamo come oggetto le nostre task che verranno poi inserite dentro l'array, che diventerà un'array di oggetti

let todosC = []; // Facciamo lo stesso procedimento per l'array e per la task del gruppo di quelle completate
let todoC={}

// A seguire definiamo la funzione che ci permette di aggiungere le task.
function aggiuntaTask(){
    // All'interno della funzione definiamo la struttura dell'oggetto todo
   todo={
    data: new Date().toLocaleString(), // Sarà il nostro identificativo in quanto non possiamo aggiungere due task nello stesso momento e ci permette
    // di identificare univocamente le task quando dovremo eliminarle o confermarle;
    nome: (nomeTsk.value === "") ? "Unsigned": nomeTsk.value,  // Inserisco un'operazione ternaria in quanto voglio che se l'utente inserisce
    // un nome della task vuoto, questo venga contrassegnato come Unsigned
    txt: (txtTsk.value === "") ? "Unsigned": txtTsk.value, // Facciamo lo stesso procedimento per il testo della task
    // Queste due operazioni ternarie sono state inserite per bellezza, infatti avremmo potuto lasciare "nome: nomeTsk.value" dove viene preso il valore
    // che ha l'input di testo e viene passato alla variabile nome dell'oggetto todo. Idem per il testo della task.
   }
   
   todos.unshift(todo); // Metodo per inserire in un array, un elemento come primo
   addTask(); // Chiamiamo la funzione addTask
   
   // Diamo questo valore ai campi txtTsk e nomeTsk in quanto voglio che dopo che inserisco una task, il testo della task precedente non rimanga
   // ma si vada a liberare il campo dell'input per poterne inserire un'altra.
   txtTsk.value="";
   nomeTsk.value="";

}

// Funzione addTask, che viene usata tramite il metodo .map() per ciclare l'array e per prendere i campi di ogni singolo oggetto todo. A seguire una
// spiegazione più dettagliata
function addTask (){
    // Usiamo task.innerHTML per scrivere dentro il codice (bisogna usare ` ` e non ' ' o ""). Usiamo ${} per inserire dentro un testo del codice
    // javascript. Invochiamo il metodo .map() in modo tale che per ogni oggetto lui scriva il codice scritto sotto. Si invoca una funzione di callback
    // che prende ogni oggetto todo e ne scrive il codice inserendo i vari attributi. Poi usiamo il .join(" ") per unire tutti gli elementi di un'array
    // dentro un'unica stringa. Lo stesso procedimento è stato usato per inserire gli elementi dentro la stringa delle task completate. Da considerare 
    // che per identificare le task al momento della cancellazione o completamento prendiamo con i bottoni i loro indici (t rappresenta temporanemanete
    // l'elemento dell'array durante l'iterazione), successivamente, dopo che abbiamo l'indice e lo passiamo come parametro delle funzioni usate
    // rispettivamente per cancellare e mettere come checked le task, queste le usano per eliminare l'elemento o nel caso del checker, lo elimina
    // dall'array todos (quelle da completare) e lo copia nell'array delle task completate.
    task.innerHTML=` 
    ${todos.map(todo => {
        return `
            <div class="boxes">
                <h3>${todo.nome}</h3>
                <p>${todo.txt}</p>
                <h6>${todo.data}</h6>
                <button class="buttBox"  onclick="deleteTask(${todos.findIndex(t =>t.data === todo.data)})">Elimina Task</button> 
                <button class="buttBox"  onclick="checkTask(${todos.findIndex(t=>t.data === todo.data)})">Task Completata</button>
            </div>
        `
    }).join(" ")}
`;
}

function deleteTask (index){
    todos.splice(index,1);
    addTask();
}



function checkTask(index) {
    todos[index].data = "Completata il: " + new Date().toLocaleString();
    todosC.unshift(todos[index]);
    todos.splice(index,1);
    addTask();
    checkerTask();
}

function checkerTask (){
    taskC.innerHTML=`
    ${todosC.map(todoC => {
        return `
            <div class="boxesC">
                <h3>${todoC.nome}</h3>
                <p>${todoC.txt}</p>
                <h6>${todoC.data}</h6>
                <h3>Checked</h3>
                <button class="buttBox" onclick="deleteTaskC(${todosC.findIndex(t =>t.data === todoC.data)})">Elimina Task</button>
            </div>
        `
    }).join(" ")}
`;
}

function deleteTaskC (index){
    // aggiungere commento
    todosC.splice(index,1);
    checkerTask();
}


button.addEventListener('click', aggiuntaTask);

