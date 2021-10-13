export const options = [
  {
    label: "Correct",
    value: `function sqrt(n: integer) : integer {
  var diff,media,aux,min,max: integer;

  do{
    media = max+min;
    media = media/2;
    aux = media*media;
    if (aux > n) {
      max = media;
    } else {
      min = media;
    }
    diff = max - min;
  }while (diff > 1);

  return media;
}

function mmc(a: integer, b: integer): integer {
  var aa,bb : integer;

  aa=0;
  bb=0;
  while(aa != bb){
    if (aa < bb){
      aa = aa+a;
    }else{
      bb = bb+b;
    }
  }

  return aa;
  }

  function primo(n: integer): boolean {
  var divisor: integer;
  divisor = 2;
  do {
    if(mmc(n,divisor) == n){
      return true;
    } else {
      divisor = divisor + 1;
    }
  } while(divisor < sqrt(n));
  return false;
}
`,
  },
  {
    label: "Wrong lexer",
    value: `function dois(): integer {
  return 2;
}

%%
`,
  },
  {
    label: "Wrong parser",
    value: `
    function dois(): integer {
      return 2
    }
    `,
  },
  {
    label: "Wrong scope - error",
    value: `
    function dois(): integer {
      var x: integer;
      x=2;
      return x;
    }

    function f(): integer {
      var t: integer;
      var t: integer;
    }
    `,
  },
  {
    label: "Wrong scope - warning",
    value: `
    function dois(): integer {
      var x: integer;
      x=2;
      return x;
    }

    function f(): integer {
      var t: integer;
      x=2;
    }
    `,
  },
  {
    label: "Wrong type",
    value: `
    function dois(): integer {
      return 2;
    }

    function loka(): integer {
      var letra: char;
      letra = dois();
    }
    `,
  },
];
