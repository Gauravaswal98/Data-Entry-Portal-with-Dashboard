function saveNote() {
    var noteText = document.getElementById("note-text").value;
    if (noteText.trim() !== "") {
        var savedNotesContainer = document.getElementById("saved-notes");
        var newNote = document.createElement("div");
        newNote.innerHTML = `
            <p>${noteText}</p>
            <button onclick="editNote(this)">Edit</button>
            <button onclick="deleteSingleNote(this)">Delete</button>
        `;
        savedNotesContainer.appendChild(newNote);
        document.getElementById("note-text").value = ""; // Clear the textarea after saving
    } else {
        alert("Please enter a note before saving.");
    }
}

function editNote(buttonElement) {
    var noteText = buttonElement.previousElementSibling.textContent;
    document.getElementById("note-text").value = noteText;
    buttonElement.parentElement.remove(); // Remove the note from the display
}

function deleteSingleNote(buttonElement) {
    buttonElement.parentElement.remove(); // Remove the note from the display
}

function deleteNotes() {
    var savedNotesContainer = document.getElementById("saved-notes");
    savedNotesContainer.innerHTML = ""; // Clear all saved notes
}