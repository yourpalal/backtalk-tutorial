import {Scope} from "backtalk";

export interface Example {
    prepareScope(scope: Scope);
    showResult: boolean;
    name: string;
}

let examples: {
    [name: string]: Example
} = {};

export function getExample(name: string): Example {
    return examples[name];
};

function addExample(ex: Example) {
    examples[ex.name] = ex;
}

addExample({
    name: "simple_example",
    prepareScope: (scope: Scope) => {
        scope.set("suzy", "suzy likes programming");
        scope.set("harry", "harry likes to read");
        scope.set("bingo", "bingo likes going for walks");
    },

    showResult: true
});
