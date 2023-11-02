const replaceHistory = [];

// Get Time
function getDateTime() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
}

// Log Replace History to replaceHistory
function logReplaceHistory(findText, replaceText, inputText) {
    const dateTime = getDateTime();
    const regexFlags = document.getElementById("caseInsensitiveCheckbox").checked ? "gi" : "g";
    const regex = new RegExp(findText, regexFlags);
    const outputText = inputText.replace(regex, replaceText);

    replaceHistory.push({ date: dateTime, find: findText, replaceWith: replaceText, input: inputText, output: outputText });
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
