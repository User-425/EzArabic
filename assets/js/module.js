dbversion = "3.3";
all_module = [ {
    name: 'Legacy',
    type: 'Module',
    formulas: [
      "a~~;ﭐ",
      "_'u;ٗ",
      "a~u;ؤ",
      "a~i;ئ",
      "a~y;ئ",
      "a~a;أ",
      "t~h;ة",
      "_a;َ",
      "_A;ً",
      "_'a;ٰ",
      "_i;ِ",
      "_I;ٍ",
      "_'i;ٖ",
      "_u;ُ",
      "_U;ٌ",
      "_';ْ",
      '_";ّ',
      '_"a;َّ',
      '_"A;ًّ',
      '_"i;ِّ',
      '_"I;ٍّ',
      '_"u;ُّ',
      '_"U;ٌّ',
      "<=;←",
      "=>;→",
      "_sh;ۖ",
      "_q;ۗ",
      "_l;ۙ",
      "_j;ۚ",
      "_m;ۢ",
      "_s;ۜ",
      "_Th;‌ؕ",
      "_...;ۛ",
      "ng;غ",
      "Kh;ح",
      "ch;ح",
      "ny;ي",
      "A;ع",
      "Sh;ص",
      "DH;ض",
      "Dh;ظ",
      "Sy;ش",
      "KH;خ",
      "Gh;غ",
      "Ts;ث",
      "Dz;ذ",
      "Th;ط",
      "1;١",
      "2;٢",
      "3;٣",
      "4;٤",
      "5;٥",
      "6;٦",
      "7;٧",
      "8;٨",
      "9;٩",
      "0;٠",
      "a;ا",
      "b;ب",
      "c;ج",
      "d;د",
      "f;ف",
      "h;ه",
      "i;ى",
      "j;ج",
      "k;ك",
      "g;ك",
      "l;ل",
      "m;م",
      "n;ن",
      "o;و",
      "p;ف",
      "q;ق",
      "r;ر",
      "s;س",
      "t;ت",
      "u;و",
      "v;ف",
      "w;و",
      "y;ي",
      "z;ز",
      "';ء"
    ],
    special: [

    ]
  }, {
    name: 'Main',
    type: 'Module',
    formulas: [
      "_;ࣤ",
      "<;ٰ",
      ">;ٖ",
      "a;ا",
      "b;ب",
      "c;ج",
      "d;د",
      "f;ف",
      "g;ك",
      "h;ه",
      "i;ى",
      "j;ج",
      "k;ك",
      "l;ل",
      "m;م",
      "n;ن",
      "o;و",
      "p;ف",
      "q;ق",
      "r;ر",
      "s;س",
      "t;ت",
      "u;ؤ",
      "v;ف",
      "w;و",
      "y;ي",
      "z;ز",
      "';ء",
      "1;١",
      "2;٢",
      "3;٣",
      "4;٤",
      "5;٥",
      "6;٦",
      "7;٧",
      "8;٨",
      "9;٩",
      "0;٠",
      "~;ة",
      "!;َ",
      "@;ً",
      "#;ِ",
      "$;ٍ",
      "%;ُ",
      "^;ٌ",
      "G;غ",
      "H;ح",
      "A;ع",
      "S;ص",
      "D;ض",
      "R;ظ",
      "x;ش",
      "X;ش",
      "K;خ",
      "Y;ث",
      "Z;ذ",
      "T;ط",
      "I;ئ",
      '";ّ',
      "&;ّ"
    ]
  },
  {
    name: 'theCheatF',
    type: 'Cheater',
    formulas: [
      '$;☺',
      '^;☻',
      '*;♥',
      '(;♦',
      ');♣',
      '-;♠',
      '+;◘',
      '[;•',
      '];◙',
      '{;♀',
      '};♂',
      '|;♫',
      '/;♪',
      '?;¶',
      '.;§'
    ]
  },
  {
    name : 'undefinedModule',
    type : 'Cheater',
    formulas : [
      "?;؟",
      "!;!",
      "-;-",
      "{;﴾",
      "};﴿",
      "+;ۤ",
      "*;ْ",
      "|;"
    ]
  }
];

all_data = [];
all_cheater = [];

function chooser( module , all) {
  return all.find( ( {name} ) => name === module );
};

function makeOption( m, e ) {
  var n = "";
  n += `<option value="${m}">${m}</option>`;
  document.getElementById( e )
    .innerHTML += n;
}

function moduleDeconstruct( m ) {
  o = clone( chooser( m , all_module).formulas );
  for ( let a in o ) o[ a ] = o[ a ].split( ";" );
  return o;
};

function moduleDeconstruct2( m, i, o ) {
  d = m.flat()
  d.forEach( ( a, e ) => {
    e % 2 == 0 ? i.push( a ) : o.push( a );
  } );
  return;
};

class customModule {
  constructor( n, f ) {
    this.name = n;
    this.formulas = f;
  }
}

class data {
  constructor( n, m, i, o, nf, r ) {
    this.name = n;
    this.module = m;
    this.input = i;
    this.output = o;
    this.notFlat = nf;
    this.reverse = r;
  }
}


function sort( data ) {
  let x = chooser( data , all_data);
  ids = Array.from( {
    length: x.input.length
  }, ( _, i ) => i )
  ids.sort( ( a, b ) => x.input[ b ].length - x.input[ a ].length )
  x.input = x.input.map( ( _, i ) => x.input[ ids[ i ] ] )
  x.output = x.output.map( ( _, i ) => x.output[ ids[ i ] ] )
}

// Deconstruct to data
function moduleDeconstruct3( name ) {
  let a = [];
  let b = [];
  let reverse = [];
  let c = moduleDeconstruct( name )
  d = clone( moduleDeconstruct( name ) )
  moduleDeconstruct2( c, a, b );
  for ( i = 0; i < a.length; i++ ) {
    reverse.push( b[ i ], a[ i ] );
  }
  all_data.push( new data( name, c, a, b, d, reverse ) )
  sort( name )
};

( dbtext = document.getElementById( "dbversion" ) ),
( dbtext.innerHTML = "v".concat( dbversion ) );

all_module.forEach( ( module ) => {
  moduleDeconstruct3( module.name );
} );

function swap( obj ) {
return Object.assign({}, ...Object.entries(obj).map(([a,b]) => ({ [b]: a })));
}

function mapper( rep, splitter ) {
  let rep_map = rep.map( a => a.split( splitter ) )
    .reduce( ( p, c ) => {
      p[ c[ 0 ] ] = c[ 1 ];
      return p;
    }, {} );
  return rep_map;
};

for ( let i = 0; i < all_module.length; i++ ) {
  if ( all_module[ i ].type == 'Module' ) {
    makeOption( all_module[ i ].name, 'moduleSelect' )
  }else if (all_module[ i ].type == 'Cheater') {
    let a = mapper(all_module[ i ].formulas,';')
    all_cheater.push( new data( all_module[ i ].name,a , null, null, null, swap(a)) )
  }
}

// Function make table
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

// Run function make table based on module data
makeTable( chooser('Main',all_data).notFlat, "table1", "n_", 4 ), makeTable( chooser('Legacy', all_data).notFlat, "table2", "l_", 4 );
