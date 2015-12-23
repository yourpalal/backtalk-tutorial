import {Scope} from "backtalk";

export interface Example {
    prepareScope(scope: Scope);
}

let examples: {
    [name: string]: Example
} = {};

export function getExample(name: string): Example {
    return examples[name];
};


examples["simple_example"] = {
    prepareScope: (scope: Scope) => {

    }
};
