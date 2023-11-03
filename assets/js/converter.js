// Constants for DOM elements
const source = document.getElementById('input');
const result = document.getElementById('output');
const moduleSelect = document.getElementById('moduleSelect');
const reverseCheckbox = document.getElementById('reverse');
const autoScrollCheckbox = document.getElementById('autoScroll');

// Retrieve module data
const allCheater = all_cheater;
const cheaterModule = chooser('theCheatF', allCheater).module;
const reverseCheaterModule = chooser('theCheatF', allCheater).reverse;
const finallerModule = chooser('undefinedModule', allCheater).module;

// Event listeners
moduleSelect.addEventListener('change', moduleChanged);
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);
reverseCheckbox.addEventListener('change', handleReverseChange);
autoScrollCheckbox.addEventListener('change', handleAutoScrollChange);

// Functions
function replaceCharacters(str, mapper) {
  return str.split('').map(char => mapper[char] || char).join('');
}

function convertCharacters(input, from, to) {
  return input.replace(new RegExp(`${from.join('|')}`, 'g'), m => to[from.indexOf(m)]);
}

function translateText(statement, module, reverse) {
  statement = replaceCharacters(statement, cheaterModule);
  const transString = clone(chooser(module, all_data).input).toString();
  const final = replaceCharacters(transString, cheaterModule).split(',');

  if (reverse) {
    statement = convertCharacters(statement, chooser(module, all_data).output, final);
  } else {
    statement = convertCharacters(statement, final, chooser(module, all_data).output);
  }

  statement = replaceCharacters(statement, reverse ? reverseCheaterModule : finallerModule);
  return statement;
}

function moduleChanged() {
  const selectedModule = moduleSelect.value;
  let statement = result.value;

  if (!reverseCheckbox.checked) {
    statement = translateText(statement, selectedModule, false);
  }

  source.value = statement;
}

function inputHandler() {
  translate();
}

function translate() {
  const selectedModule = moduleSelect.value;
  const reverse = reverseCheckbox.checked;
  let statement = source.value;

  if (reverse) {
    statement = translateText(statement, selectedModule, true);
  } else {
    statement = translateText(statement, selectedModule, false);
  }

  const autoScroll = autoScrollCheckbox.checked;
  textScroller('output', autoScroll);
  result.innerHTML = statement;
}

function handleReverseChange() {
  const selectedModule = moduleSelect.value;
  const reverse = reverseCheckbox.checked;
  updateTranslation(selectedModule, reverse);
}

function handleAutoScrollChange() {
  const autoScroll = autoScrollCheckbox.checked;
  textScroller('output', autoScroll);
}