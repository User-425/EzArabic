const inputElement = $('#input');
const outputElement = $('#output');
const moduleSelectElement = $('#moduleSelect');
const reverseCheckboxElement = $('#reverse');
const autoScrollCheckboxElement = $('#autoScroll');

// Retrieve module data
const allCheaterData = all_cheater;
const defaultCheaterModule = useModule('theCheatF', allCheaterData).module;
const reverseCheaterModule = useModule('theCheatF', allCheaterData).reverse;
const undefinedModule = useModule('undefinedModule', allCheaterData).module;

// Event listeners
moduleSelectElement.on('change', onModuleChange);
inputElement.on('input', onInputChange);
inputElement.on('propertychange', onInputChange);
reverseCheckboxElement.on('change', onReverseChange);
autoScrollCheckboxElement.on('change', onAutoScrollChange);

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
  const selectedModule = moduleSelectElement.val();
  let statement = outputElement.val();

  if (!reverseCheckboxElement.prop('checked')) {
    statement = translateText(statement, selectedModule, false);
  }

  inputElement.val(statement);
}

function onInputChange() {
  translateAndDisplay();
}

function translateAndDisplay() {
  const selectedModule = moduleSelectElement.val();
  const isReversed = reverseCheckboxElement.prop('checked');
  let statement = inputElement.val();

  if (isReversed) {
    statement = translateText(statement, selectedModule, true);
  } else {
    statement = translateText(statement, selectedModule, false);
  }

  const autoScroll = autoScrollCheckboxElement.prop('checked');
  textScroller('output', autoScroll);
  outputElement.html(statement);
}

function onReverseChange() {
  const selectedModule = moduleSelectElement.val();
  const isReversed = reverseCheckboxElement.prop('checked');
  updateTranslation(selectedModule, isReversed);
}

function onAutoScrollChange() {
  const autoScroll = autoScrollCheckboxElement.prop('checked');
  textScroller('output', autoScroll);
}