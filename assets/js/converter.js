// Constants for DOM elements
const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');
const moduleSelectElement = document.getElementById('moduleSelect');
const reverseCheckboxElement = document.getElementById('reverse');
const autoScrollCheckboxElement = document.getElementById('autoScroll');

// Retrieve module data
const allCheaterData = all_cheater;
const defaultCheaterModule = useModule('theCheatF', allCheaterData).module;
const reverseCheaterModule = useModule('theCheatF', allCheaterData).reverse;
const undefinedModule = useModule('undefinedModule', allCheaterData).module;

// Event listeners
moduleSelectElement.addEventListener('change', onModuleChange);
inputElement.addEventListener('input', onInputChange);
inputElement.addEventListener('propertychange', onInputChange);
reverseCheckboxElement.addEventListener('change', onReverseChange);
autoScrollCheckboxElement.addEventListener('change', onAutoScrollChange);

// Functions
function replaceCharacters(inputString, characterMap) {
  return inputString.split('').map(char => characterMap[char] || char).join('');
}

function convertCharacters(input, fromChars, toChars) {
  return input.replace(new RegExp(`${fromChars.join('|')}`, 'g'), match => toChars[fromChars.indexOf(match)]);
}

function translateText(statement, selectedModule, isReversed) {
  statement = replaceCharacters(statement, defaultCheaterModule);

  const translationString = clone(useModule(selectedModule, all_data).input).toString();
  const finalChars = replaceCharacters(translationString, defaultCheaterModule).split(',');

  if (isReversed) {
    statement = convertCharacters(statement, useModule(selectedModule, all_data).output, finalChars);
  } else {
    statement = convertCharacters(statement, finalChars, useModule(selectedModule, all_data).output);
  }

  statement = replaceCharacters(statement, isReversed ? reverseCheaterModule : undefinedModule);
  return statement;
}

function onModuleChange() {
  const selectedModule = moduleSelectElement.value;
  let statement = outputElement.value;

  if (!reverseCheckboxElement.checked) {
    statement = translateText(statement, selectedModule, false);
  }

  inputElement.value = statement;
}

function onInputChange() {
  translateAndDisplay();
}

function translateAndDisplay() {
  const selectedModule = moduleSelectElement.value;
  const isReversed = reverseCheckboxElement.checked;
  let statement = inputElement.value;

  if (isReversed) {
    statement = translateText(statement, selectedModule, true);
  } else {
    statement = translateText(statement, selectedModule, false);
  }

  const autoScroll = autoScrollCheckboxElement.checked;
  textScroller('output', autoScroll);
  outputElement.innerHTML = statement;
}

function onReverseChange() {
  const selectedModule = moduleSelectElement.value;
  const isReversed = reverseCheckboxElement.checked;
  updateTranslation(selectedModule, isReversed);
}

function onAutoScrollChange() {
  const autoScroll = autoScrollCheckboxElement.checked;
  textScroller('output', autoScroll);
}