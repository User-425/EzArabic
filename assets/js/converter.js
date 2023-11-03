const source = document.getElementById( 'input' );
const result = document.getElementById( 'output' );
const cheater = chooser('theCheatF',all_cheater).module;
const reverse_cheater = chooser('theCheatF',all_cheater).reverse;
const finaller = chooser('undefinedModule',all_cheater).module;


function theUndefiner( str, mapper ) {
  str = ( str.split( '' )
    .map( a => mapper[ a ] ?? a )
    .join( '' ) );
  return str;
}

function trans( str, from, to ) {
  return str.replace( new RegExp( `${from.join('|')}`, 'g' ), function( m ) {
    return to[ from.indexOf( m ) ];
  } );
};  

function trans2(s, m) {
  s = theUndefiner(s, cheater);

  // Cheat: Translate the input text
  let transString = clone(chooser(m, all_data).input).toString();
  let final = theUndefiner(transString, cheater).split(',');

  // Handle case where input character is not in the module
  s = s.split('').map(char => {
    const index = final.indexOf(char);
    if (index !== -1) {
      return final[index];
    } else {
      // Convert to lowercase if not found in module
      return char.toLowerCase();
    }
  }).join('');

  s = trans(s, final, chooser(m, all_data).output);
  s = theUndefiner(s, reverse_cheater);
  s = theUndefiner(s, finaller);
  return s;
}

function trans3(s, m) {
  s = theUndefiner(s, cheater);
  s = trans(s, chooser(m, all_data).output, chooser(m, all_data).input);
  s = theUndefiner(s, reverse_cheater);

  // Handle case where input character is not in the module
  s = s.split('').map(char => {
    const index = chooser(m, all_data).output.indexOf(char);
    if (index !== -1) {
      return chooser(m, all_data).input[index];
    } else {
      // Convert to lowercase if not found in module
      return char.toLowerCase();
    }
  }).join('');

  s = theUndefiner(s, finaller);
  return s;
}

function moduleChanged() {
  toModule = $( "#moduleSelect" )
    .val()
  s = result.value
  if ( reverse == false ) {
    s = trans( s, chooser( toModule, all_data ).output, chooser( toModule, all_data ).input );
  }
  source.value = s;
}

const inputHandler = function() {
translate();
}

function translate() {
selected = document.getElementById( 'moduleSelect' )
  .value
reverse = document.getElementById( "reverse" )
  .checked

stmt = source.value;
if ( reverse == true ) {
  stmt = trans3( stmt, selected );
} else {
  stmt = trans2( stmt, selected );
}

a = document.getElementById( 'autoScroll' )
  .checked;
textScroller( "output", a );
result.innerHTML = stmt;
}

$( "#moduleSelect" )
  .change( function() {
    moduleChanged();
  } );
  
source.addEventListener( 'input', inputHandler );
source.addEventListener( 'propertychange', inputHandler );
