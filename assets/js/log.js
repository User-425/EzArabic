log = [
  "{-v2.5.0-} ; - Minor Changes; - Github Version Release;",
  "{-v2.4.2-} ; - Bug Fixed, Switching Modules Doesn't Update Input;",
  "{-v2.4.1-} ; - Deleted Unnecessary Codes;",
  "{-v2.4.0-} ; - Backend Remake, Combined Normal and Legacy Mode which Fixed Most Undefined Bugs; - Edited Navbar Style;",
  "{-v2.3.1-} ; - Fixed Super Minor Bug;",
  "{-v2.3.0-} ; - Added Auto Scroll Setting ; - Added Reverse Translate ;",
  "{-v2.2.1-} ; - Fixed Minor Bugs ; - Dramatically Reduced File Size;",
  "{-v2.2.0 (Major Updates)-} ; - Added Changelog ; - Added Setting ;- Added Auto Scroll for Output; - Added Legacy Mode ; - Added Font Size Slider for Output; - Added Table Copy Features; - Bugs Fixed ; - Reduced File Size ;",
  "{-v2.1.0-} ; - Added Table ;",
  "{-v2.0.0-} ; - Web Release ;",
  "{-v1.0.0-} ; - Lua Release"
];

var logOutput = '';

// log templating
var logresult = log.map( function( x ) {
  x = x.replace( /;/g, '<br>' );
  x = x.replace( /-}/g, '</strong>' );
  x = x.replace( /{-/g, '<strong>' )
  return x;
} );

// loggin with new line
logresult.forEach( function( element ) {
  logOutput += element + '\n';
} );
document.getElementById( 'logId' )
  .innerHTML += logOutput;
