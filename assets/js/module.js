  dbversion = "3.1";
  all_module = [ {
      name: 'Legacy',
      type: 'Module',
      formulas: [
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

  const all_data = [];
  const all_cheater = [];

  class data {
    constructor(name, module, input, output, notFlat, reverse) {
      this.name = name;
      this.module = module;
      this.input = input;
      this.output = output;
      this.notFlat = notFlat;
      this.reverse = reverse;
    }
  }

  function useModule(name,all) {
    return all.find((module) => module.name === name);
  }

  function createOption(module) {
    return `<option value="${module}">${module}</option>`;
  }

  function deconstructModule(name) {
    const module = useModule(name,all_module);
    return module.formulas.map((formula) => formula.split(';'));
  }

  function createTable(data, elementId, tableId, columns) {
    let table = `<div class="table-responsive"><table class="table table-bordered table-striped table-hover"><thead><tr>`;

    data.forEach((entry, index) => {
      table += index % columns === 0 ? `<tr>` : '';
      table += `<td id="${tableId}${index}" class="clickable-cell">${entry}</td>`;
      table += index % columns === columns - 1 || index === data.length - 1 ? `</tr>` : '';
    });

    table += `</tbody></table></div>`;
    document.getElementById(elementId).innerHTML = table;
  }

  function deconstructModules() {
    all_module.forEach((module) => {
      const formulas = deconstructModule(module.name);
      const notFlat = formulas.flat();
      const reverse = notFlat.map((a, e) => (e % 2 === 0 ? notFlat[e + 1] : notFlat[e - 1]));

      all_data.push(new data(module.name, formulas, notFlat, reverse, notFlat, reverse));
      sort(module.name);
    });
  }

  function sort(dataName) {
    const x = all_data.find((data) => data.name === dataName);
    const ids = Array.from({ length: x.input.length }, (_, i) => i);
    ids.sort((a, b) => x.input[b].length - x.input[a].length);
    x.input = ids.map((_, i) => x.input[ids[i]]);
    x.output = ids.map((_, i) => x.output[ids[i]]);
  }

  function initializeTables() {
    createTable(useModule('Main', all_data).notFlat, 'table1', 'n_', 4);
    createTable(useModule('Legacy', all_data).notFlat, 'table2', 'l_', 4);
  }

  function initializeOptionsAndCheaters() {
    all_module.forEach((module) => {
      if (module.type === 'Module') {
        document.getElementById('moduleSelect').innerHTML += createOption(module.name);
      } else if (module.type === 'Cheater') {
        const formulaMap = module.formulas.map((formula) => formula.split(';'));
        const formulaObject = Object.fromEntries(formulaMap);
        all_cheater.push(new data(module.name, formulaObject, null, null, null, swap(formulaObject)));
      }
    });
  }

  function main() {
    document.getElementById('dbversion').innerHTML = `v${dbversion}`;
    deconstructModules();
    initializeOptionsAndCheaters();
    initializeTables();
  }

  function swap(obj) {
    return Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));
  }
  
  main();