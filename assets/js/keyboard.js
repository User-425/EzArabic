function addTextAtCaret( t, e ) {
  var n = document.getElementById( t ),
    i = n.selectionStart;
  addTextAtCursorPosition( n, i, e ), updateCursorPosition( i, e, n );
  const o = main,
    s = source.value;
  let u = o.map( ( t => t.split( ";" ) ) )
    .reduce( ( ( t, e ) => ( t[ e[ 0 ] ] = e[ 1 ], t ) ), {} );
  hasil = s.split( "" )
    .map( ( t => u[ t ] ?? t ) )
    .join( "" ), result.innerHTML = hasil
}

function addTextAtCursorPosition( t, e, n ) {
  var i = t.value.substring( 0, e ),
    o = t.value.substring( e, t.value.length );
  t.value = i + n + o
}

function updateCursorPosition( t, e, n ) {
  t += e.length, n.selectionStart = t, n.selectionEnd = t, n.focus()
}
