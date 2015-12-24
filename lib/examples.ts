import {Scope, StdLib} from "backtalk";

export interface Example {
    prepareScope(scope: Scope);
    showResult: boolean;
    showOutput: boolean;
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

    showResult: true,
    showOutput: false,
});

class Friend {
    constructor(public name: string, public message: string) {
    }
}

addExample({
    name: "commands_example",
    prepareScope: (scope: Scope) => {
        StdLib.inScope(scope);

        scope.set("suzy", new Friend("Suzy", "programming is fun!"));
        scope.set("harry", new Friend("Harry", "reading is fun!"));
        scope.set("bingo", new Friend("doggy", "woof!"));

        scope.addFunc(["say hi to $:friend"], (args) => {
            let friend = args.getObject("friend") as any;
            scope.env.stdout.write(`You: "Hi ${friend.name}!"`);
        });

        scope.addFunc(["listen to $:friend"], (args) => {
            let friend = args.getObject("friend") as any;
            scope.env.stdout.write(`${friend.name}: ${friend.message}`);
        });
    },

    showResult: false,
    showOutput: true
});
