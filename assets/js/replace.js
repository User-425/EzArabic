const replaceHistory = [];

// Get Time
function getDateTime() {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')} ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:${today.getSeconds().toString().padStart(2, '0')}`;
}

// Log Replace History to replaceHistory
function logReplaceHistory(findText, replaceText, inputText) {
    const dateTime = getDateTime();
    const regexFlags = document.getElementById("caseInsensitiveCheckbox").checked ? "gi" : "g";
    const regex = new RegExp(findText, regexFlags);
    const outputText = inputText.replace(regex, replaceText);

    replaceHistory.push({ date: dateTime, find: findText, replaceWith: replaceText, input: inputText, output: outputText });
}

// Function to rollback the last replace operation
function rollbackLastReplace() {
    if (replaceHistory.length > 0) {
        const lastHistory = replaceHistory.pop();
        document.getElementById("input").value = lastHistory.input;
        translate();
    }
}

// Function to populate the history modal with replace history data
function updateHistoryModalContent() {
    const historyTable = document.querySelector("#replaceHistoryModal table tbody");
    // Clear existing rows
    historyTable.innerHTML = "";
    // Iterate through the replaceHistory array and create rows for each history item
    for (let i = 0; i < replaceHistory.length; i++) {
        const historyItem = replaceHistory[i];
        const newRow = historyTable.insertRow();
        newRow.innerHTML = `<th scope="row">${i + 1}</th><td>${historyItem.input}</td><td>${historyItem.output}</td><td>${historyItem.find}</td><td>${historyItem.replaceWith}</td><td>${historyItem.date}</td><td><button class="btn btn-danger" onclick="rollbackLastReplace(${i})">Rollback</button></td>`;
    }
}

// Perform Replace
function performReplace() {
    const findText = document.getElementById("findText").value;
    const replaceText = document.getElementById("replaceText").value;
    const inputText = document.getElementById("input").value;
    // Error handling: Check if 'Find' and 'Replace' fields are empty
    if (!findText || !replaceText) {
        alert("Please provide values for 'Find' and 'Replace' fields.");
        return;
    }
    // Log the replacement history
    logReplaceHistory(findText, replaceText, inputText);
    // Create and apply regular expression replacement
    const regexFlags = document.getElementById("caseInsensitiveCheckbox").checked ? "gi" : "g";
    const regex = new RegExp(findText, regexFlags);
    document.getElementById("input").value = inputText.replace(regex, replaceText);
    translate();
    $('#replace').modal('hide'); // Close the modal
}

document.getElementById("showHistoryButton").addEventListener("click", function () {
    // Call a function to populate the history modal with the actual replace history data
    updateHistoryModalContent();
});
