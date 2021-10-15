import { Tokens } from "../lexical/header";
import { States, LEFT, LEN } from "./header";
import Actions from "./actions";
import Stack from "../stack";
import Scope from "../scope/index";

const IS_SHIFT = (p) => p > 0;
const IS_REDUCTION = (p) => p < 0;
const RULE = (p) => -p;

export default class Syntatical {
  constructor(lexical) {
    this.lexical = lexical;
    this.scope = new Scope(this.lexical);
  }

  syntaxError() {
    throw new Error(`Syntaxe Error on line: ${this.lexical.currentLine}`);
  }

  parse() {
    const stack = new Stack();

    const final_state = 1;
    let q = 0;
    stack.push(q);
    let tk = this.lexical.nextToken()[0];

    do {
      if (!Actions[q] || !Actions[q][tk]) {
        console.log({ q, tk });
        this.syntaxError();
      } else {
        let p = Actions[q][tk];
        if (IS_SHIFT(p)) {
          stack.push(p);
          tk = this.lexical.nextToken()[0];
        } else if (IS_REDUCTION(p)) {
          let r = RULE(p);
          stack.pop(LEN[r]);
          stack.push(Actions[stack.top][LEFT[r]]);
          this.scope.semantics(r);
        } else {
          this.syntaxError();
        }
        q = stack.top;
      }
    } while (q != final_state);
    console.log("Passou\n");
  }
}
