const replaceHistory = [];
const undoRollbackHistory = []; // Change the name to undoRollbackHistory

// Get Time
function getDateTime() {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')} ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:${today.getSeconds().toString().padStart(2, '0')}`;
}

// Log Replace History to replaceHistory
function logReplaceHistory(findText, replaceText, inputDelta) {
    const dateTime = getDateTime();
    const regexFlags = document.getElementById("caseInsensitiveCheckbox").checked ? "gi" : "g";
    const regex = new RegExp(findText, regexFlags);

    const inputText = inputDelta.ops.map((op) => op.insert).join('');
    const outputText = inputText.replace(regex, replaceText);

    const historyItem = {
        date: dateTime,
        find: findText,
        replaceWith: replaceText,
        input: inputDelta,
        output: outputText,
    };

    replaceHistory.push(historyItem);

    // Clear undoRollback history as a new action is performed
    undoRollbackHistory.length = 0; 
}

// Function to populate the history modal with replace history data
function updateHistoryModalContent() {
    const historyTable = document.querySelector("#replaceHistoryModal table tbody");
    // Clear existing rows
    historyTable.innerHTML = "";

    for (let i = 0; i < replaceHistory.length; i++) {
        const historyItem = replaceHistory[i];
        const newRow = historyTable.insertRow();
        newRow.innerHTML = `<th scope="row">${i + 1}</th><td>${historyItem.input.ops.map((op) => op.insert).join('')}</td><td>${historyItem.output}</td><td>${historyItem.find}</td><td>${historyItem.replaceWith}</td><td>${historyItem.date}</td><td><button class="btn btn-danger" onclick="undoReplace(${i})">Undo</button></td>`; // Change the onclick function to undoRollback
    }
}

// Function to populate Undo Rollback History
function updateUndoRollbackHistoryModalContent() {
    const historyTable = document.querySelector("#undoRollbackHistoryModal table tbody"); 
    // Clear existing rows
    historyTable.innerHTML = "";

    for (let i = 0; i < undoRollbackHistory.length; i++) { 
        const undoRollbackItem = undoRollbackHistory[i]; 
        const newRow = historyTable.insertRow();
        newRow.innerHTML = `<th scope="row">${i + 1}</th><td>${undoRollbackItem.inputBeforeUndoRollback.ops.map((op) => op.insert).join('')}</td><td>${undoRollbackItem.inputAfterUndoRollback.ops.map((op) => op.insert).join('')}</td><td>${undoRollbackItem.undoRollbackDate}</td><td><button class="btn btn-danger" onclick="undoRollback(${i})">Undo</button></td>`; 
    }
}

function undoRollback(index) {
    if (index >= 0 && index < undoRollbackHistory.length) { 
        const undoneHistory = undoRollbackHistory.splice(index, 1)[0]; 
        const undoRollbackData = {
            inputBeforeUndoRollback: inputElement.getContents(),
            inputAfterUndoRollback: undoneHistory.inputAfterUndoRollback,
            undoRollbackDate: undoneHistory.undoRollbackDate, 
            date: undoneHistory.replaceDate, 
            input: undoneHistory.replaceInput, 
            output: undoneHistory.replaceOutput, 
            find: undoneHistory.replaceFind, 
            replaceWith: undoneHistory.replaceWith, 
        };
        // Perform the undoRollback operation by setting the editor content to the input after undoRollback
        inputElement.setContents(undoneHistory.inputAfterUndoRollback);        
        replaceHistory.push(undoRollbackData); 
        updateUndoRollbackHistoryModalContent()
        updateHistoryModalContent(); // Refresh the history modal
        translateAndDisplay();
    }
}

// Function to undo a replace operation
function undoReplace(index) {
    if (index >= 0 && index < replaceHistory.length) {
        const undoneHistory = replaceHistory.splice(index, 1)[0];
        const undoRollbackData = {
            inputBeforeUndoRollback: inputElement.getContents(),
            inputAfterUndoRollback: undoneHistory.input,
            undoRollbackDate: getDateTime(), 
            replaceDate: undoneHistory.date, 
            replaceInput: undoneHistory.input, 
            replaceOutput: undoneHistory.output, 
            replaceFind: undoneHistory.find, 
            replaceWith: undoneHistory.replaceWith,
        };
        // Perform the undo operation by setting the editor content to the original input
        inputElement.setContents(undoneHistory.input);
        undoRollbackHistory.push(undoRollbackData); 
        updateHistoryModalContent(); // Refresh the history modal
        translateAndDisplay();
    }
}

// Perform Replace
function performReplace() {
    const findText = document.getElementById("findText").value;
    const replaceText = document.getElementById("replaceText").value;

    // Error handling: Check if 'Find' and 'Replace' fields are empty
    if (!findText || !replaceText) {
        alert("Please provide values for 'Find' and 'Replace' fields.");
        return;
    }

    const delta = inputElement.getContents();
    const regexFlags = document.getElementById("caseInsensitiveCheckbox").checked ? "gi" : "g";
    const regex = new RegExp(findText, regexFlags);

    // Convert Quill delta to plain text
    const inputText = delta.ops.map((op) => op.insert).join('');

    // Perform the replace operation
    const outputText = inputText.replace(regex, replaceText);

    // Log the replacement history
    logReplaceHistory(findText, replaceText, delta);

    // Convert the modified text back to Quill delta and set it in the editor
    inputElement.setContents([{ insert: outputText }]);
    translateAndDisplay();
    $('#replace').modal('hide'); // Close the modal
}

document.getElementById("showHistoryButton").addEventListener("click", function () {
    // Call a function to populate the history modal with the actual replace history data
    updateHistoryModalContent();
});
