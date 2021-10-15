export const options = [
  {
    label: "Lexical Error",
    value: `function banana(): integer {
      return 2; %%%-
}
`,
  },
  {
    label: "Simple Algebraic function",
    value: `function algebra () : integer {
      return (1 + 2) * ( 3 / 4 );
}
    `,
  },
  {
    label: "Simple Algebraic Formula",
    value: `function StaticAvg () : integer {
      var a, b: integer;
      a = 2;
      b = 3;
        return (a + b) / 2;
}
    `,
  },
  {
    label: "Next",
    value: `function next (a: integer) : integer {
      return a + 1; 
}
`,
  },
  {
    label: "Soma",
    value: `function soma (a: integer, b: integer) : integer {
      var sum: integer;
      sum = a + b;
      return sum;
}
`,
  },
  {
    label: "Auxiliar",
    value: `function aux (a: integer) : integer {
      var au, auxx: integer;
      au = a;
      return au; 
}
`,
  },
];
