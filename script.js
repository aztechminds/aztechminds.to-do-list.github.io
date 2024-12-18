// Array, das alle Aufgaben speichert (kann sich ändern, deshalb verwenden wir 'let')
let todos = [];

// Hole das Formular, Eingabefeld und die Liste aus dem DOM (Wir verwenden 'const', 
// weil die Referenz der Elemente sich nicht ändert)
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

// **Hole das Info-Element aus dem DOM** (NEU HINZUGEFÜGT)
const todoInfo = document.querySelector('.todo-info p');

// **Funktion zum Aktualisieren der offenen Aufgaben-Anzeige** (NEU HINZUGEFÜGT)
function updateTodoInfo() {
    // Zähle die offenen Aufgaben
    const openTasksCount = todos.filter(todo => !todo.completed).length;
    // Aktualisiere die Anzeige
    todoInfo.textContent = openTasksCount > 0
        ? `Offene Aufgaben: ${openTasksCount}`
        : 'Keine offenen Aufgaben!';
}

// Event-Listener für das Formular, um eine neue Aufgabe hinzuzufügen
todoForm.addEventListener('submit', function (event) {
    // Verhindere das Standardverhalten des Formulars (Seite neu laden)
    event.preventDefault();

    // Hole den Text aus dem Eingabefeld und entferne unnötige Leerzeichen
    const taskText = todoInput.value.trim();

    // Wenn das Eingabefeld leer ist, nichts weiter tun (Verhindert leere Aufgaben)
    if (taskText === '') {
        return; // Beende die Funktion, falls der Text leer ist
    }

    // Erstelle ein neues Aufgabenobjekt (die Referenz des Objekts wird sich nicht ändern, 
    // daher 'const')
    const newTask = {
        text: taskText,  // Der Text der Aufgabe
        completed: false, // Standardmäßig ist die Aufgabe nicht erledigt
        id: Date.now()  // Einzigartige ID basierend auf der aktuellen Zeit
    };

    // Füge die neue Aufgabe zum Array hinzu
    todos.push(newTask);

    // Leere das Eingabefeld nach dem Hinzufügen der Aufgabe
    todoInput.value = '';

    // Rendere die Liste der Aufgaben neu, um die aktuelle Aufgabe anzuzeigen
    renderTodos();

    // **Aktualisiere die offenen Aufgaben-Anzeige** (NEU HINZUGEFÜGT)
    updateTodoInfo();
});

// Funktion zum Rendern der To-Dos
function renderTodos() {
    // Leere die Liste, bevor neue Aufgaben angezeigt werden
    todoList.innerHTML = '';

    // wenn es Aufgaben gibt, zeige die Liste
    if (todos.length > 0) {
        todoList.classList.add('visible'); //Liste Sichtbar machen
    } else {
        todoList.classList.remove('visible'); // Liste ausblenden
    }


    // Iteriere über das 'todos'-Array und erstelle für jede Aufgabe ein Listenelement
    todos.forEach(todo => {
        // Erstelle das <li>-Element für die Aufgabe (Referenz des <li> wird sich nicht ändern, also 'const')
        const li = document.createElement('li');
        li.classList.add('todo-item');

        // Erstelle die Checkbox (Referenz des 'input' wird sich nicht ändern, daher 'const')
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.checked = todo.completed; // Setze den Status (abhängig vom 'completed'-Wert der Aufgabe)

        // Event-Listener für die Änderung des Status der Aufgabe (abhängig von der Checkbox)
        checkbox.addEventListener('change', function () {
            // Ändere den 'completed'-Status, wenn die Checkbox angeklickt wird
            todo.completed = checkbox.checked;
            // Rendere die Todos neu, um die Änderung zu reflektieren
            renderTodos();
            // **Aktualisiere die offenen Aufgaben-Anzeige** (NEU HINZUGEFÜGT)
            updateTodoInfo();
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
            // Rendere die Todos neu, um die gelöschte Aufgabe zu entfernen
            renderTodos();
            // **Aktualisiere die offenen Aufgaben-Anzeige** (NEU HINZUGEFÜGT)
            updateTodoInfo();
        });

        // Füge die Checkbox, den Text und den Löschen-Button zum <li>-Element hinzu
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        // Füge das <li>-Element zur Liste (ul) hinzu
        todoList.appendChild(li);


    });
}


