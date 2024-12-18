
// Array für Speicherung aller Aufgaben
let todos = [];

// HTML-Elemente aus dem DOM
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoInfo = document.querySelector('.todo-info p');


// Speichert das Aufgaben-Array im localstorage und 
// wandelt das Aufgaben-Array mit JSON.stringify in einen String um, bevor es speichert. 
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Lädt die Aufgaben aus dem localStorage und schreibt sie in das Array `todos´
function loadTodos() {
    const savedTodos = localStorage.getItem('todos'); // This retrieves the saved data from the browser's localStorage as a String
    if (savedTodos) { // if this Variable is not null (i.e. some data exists and it is not empty)
        todos = JSON.parse(savedTodos); // the code proceeds to load and parse it. 
        // if savedTodos is null (nothing was saved in localStorage, the cood skips this part and goes to else)    
    } else {
        todos = []; // Falls keine Daten vorhanden sind, setzt ein leeres Array
    }
}

// Aktualisiert die offenen Aufgaben
function updateTodoInfo() { // This function will be used to update the display of open tasks
    // Zählt die offenen Aufgaben
    const openTasksCount = todos.filter(todo => !todo.completed).length;

    // Aktualisiere die Anzeige
    todoInfo.textContent = openTasksCount > 0 // 
        ? `Offene Aufgaben: ${openTasksCount}`
        : 'Keine offenen Aufgaben!';

    // todoInfo: refers to HMTL Element
    // textContent: used to set or get the text content of that element
    // here is a new string assigned to textContent

    // Ternary Operator: alternative for if-else and it has three parts
    // 1. Condition (openTaskcount > 0) checks if for open tasks
    // 2. True Case (? ....) The condition is true, the openTaskCount is greater than zero
    // 3. False Case (: ....) The condition is false, means there is no open tasks
}


// Event-Listener für das Formular, um eine neue Aufgabe hinzuzufügen
todoForm.addEventListener('submit', function (event) {
    // Verhindere das Standardverhalten des Formulars (Seite neu laden)
    event.preventDefault();
    // By default, when a form is submitted, the browser reloads the page or navigates to a new URL
    // this prevents this defualt behavior so the page does not reload
    // This is useful where form data is processed dynamically 
    // (e.g. adding a to-do itemto a list without reloading the page)

    // Holt den Text aus dem Eingabefeld und entfernt unnötige Leerzeichen
    const taskText = todoInput.value.trim();

    // Wenn das Eingabefeld leer ist, nichts weiter tun (Verhindert leere Aufgaben)
    if (taskText === '') { // checks if variable taskText is empty
        return; // Beende die Funktion, falls der Text leer ist
        // if taskText is empty, the return statement stops the execution of the function
    }

    // Erstelle ein neues Aufgabenobjekt (die Referenz des Objekts wird sich nicht ändern, 
    // daher 'const')
    const newTask = {
        text: taskText,  // Der Text der Aufgabe
        completed: false, // Standardmäßig ist die Aufgabe nicht erledigt
        id: Date.now()  // Einzigartige ID basierend auf der aktuellen Zeit
    };

    todos.push(newTask); // Füge die neue Aufgabe zum Array hinzu
    todoInput.value = ''; // Leere das Eingabefeld nach dem Hinzufügen der Aufgabe

    renderTodos(); // Rendere die Liste der Aufgaben neu, um die aktuelle Aufgabe anzuzeigen
    updateTodoInfo(); // aktualisiert die offenen Aufgaben-Anzeige
    saveTodos(); // Speichern nach Hinzufügen
});


// Funktion zum Rendern der To-Dos
// Rendering is the process of generating and displaying content by updating DOM
function renderTodos() {
    // Leere die Liste, bevor neue Aufgaben angezeigt werden
    todoList.innerHTML = '';

    // wenn es Aufgaben gibt, zeigt die Liste
    if (todos.length > 0) { //checks of todos Array has any items
        // if the length is greater than zero, means there are items 
        // this code will execute
        todoList.classList.add('visible'); //Liste Sichtbar machen
        //todoList.classList: manipulate the CSS classes of the todoList element
        //.add('visible'): adds the visible class to the element
    } else { // othewise if the length is zero, the code in else block will execute
        todoList.classList.remove('visible'); // Liste ausblenden
        // .remove('visible'): hides the todoList by removing the class that would have made it visible
    }

    // Iteriere über das 'todos'-Array und erstelle für jede Aufgabe ein Listenelement
    todos.forEach(todo => { // is a loop that iterates (repeats) over each element in the todos Array
        const li = document.createElement('li'); // Create a new <li> element to the variable li
        li.classList.add('todo-item');
        // li.classList: manages the CSS class of li Element
        // .add('todo-item'): adds the todo-item in to the li element
        // This class style the list item according to CSS rule for the "todo-item" class

        // Erstelle die Checkbox (Referenz des 'input' wird sich nicht ändern, daher 'const')
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.checked = todo.completed; // Setze den Status (abhängig vom 'completed'-Wert der Aufgabe)

        // Event-Listener für die Änderung des Status der Aufgabe (abhängig von der Checkbox)
        checkbox.addEventListener('change', function () {
            // Ändere den 'completed'-Status, wenn die Checkbox angeklickt wird
            todo.completed = checkbox.checked;
            renderTodos(); // Rendere die Todos neu, um die Änderung zu reflektieren
            updateTodoInfo(); // aktualisiert die offenen Aufgaben-Anzeige
            saveTodos(); // speichern nach Statusänderung
        });

        // Erstelle das <span>-Element für den Text der Aufgabe (Referenz des Texts ändert sich nicht, daher 'const')
        const span = document.createElement('span');
        span.classList.add('todo-text');
        span.textContent = todo.text;

        // Wenn die Aufgabe als erledigt markiert ist, durchstreiche den Text
        if (todo.completed) {
            span.style.textDecoration = 'line-through'; // Durchgestrichener Text für erledigte Aufgaben
        }

        // Erstelle den Löschen-Button für die Aufgabe (Referenz des Buttons ändert sich nicht, daher 'const')
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('todo-dltbutton');
        deleteButton.textContent = 'Löschen';

        // Event-Listener für das Löschen der Aufgabe (über die ID der Aufgabe)
        deleteButton.addEventListener('click', function () {
            // Entferne die Aufgabe aus dem 'todos'-Array anhand der ID
            todos = todos.filter(task => task.id !== todo.id);
            renderTodos(); // Rendere die Todos neu, um die gelöschte Aufgabe zu entfernen
            updateTodoInfo(); // aktualisiert die offenen Aufgaben-Anzeige
            saveTodos(); // speichern nach löschen
        });

        // Füge die Checkbox, den Text und den Löschen-Button zum <li>-Element hinzu
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li); // Füge das <li>-Element zur Liste (ul) hinzu
    });

}

// initiales laden der todos aus dem localstorage und rendern
// Ensures that when the webpage is loaded, the following actions happen:
document.addEventListener('DOMContentLoaded', function () {
    loadTodos(); // Aufgaben beim laden der Seite abrufen
    renderTodos(); // Liste anzeigen
    updateTodoInfo(); // Anzeige der offenen Aufgaben aktualisieren 
});

// document.addEventListener: sets up an even listener on teh DOMContentLoaded event
// DOMContentLoaded: event fires when the HTML document is fully loaded and parsed
// parsed means the browser has analyzed and processsed the HTML to build DOM, which represents the structure of the webpage in memory


