function makeTable( a, e, t, l ) {
  var n = "<table class='table table-bordered align-middle'><tr>",
    c = l;
  a.forEach( ( e, l ) => {
      n += l % 2 == 0 ? `<td id="${t}${[l]}" onclick="press('${t}${[l]}','in')">${e}</td>` : `<td id="${t}${[l]}" class="arabCell" onclick="press('${t}${[l]}','in')">${e}</td>`;
      var r = l + 1;
      r % c == 0 && r != a.length && ( n += "</tr><tr>" )
    } ), n += "</tr></table>", document.getElementById( e )
    .innerHTML = n;
}

makeTable( chooser('Main',all_data).notFlat, "table1", "n_", 4 ), makeTable( chooser('Legacy', all_data).notFlat, "table2", "l_", 4 );
