/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import {EditorComponent} from "./editor";
import {Evaluator} from "backtalk";
import * as React from "react";
import * as ReactDOM from "react-dom";

import * as examples from "./examples";


export interface ExampleProps {
    bt: Evaluator;
    source: string;
    example: examples.Example;
};

export interface ExampleState {

};

export class ExampleComponent extends React.Component<ExampleProps, ExampleState> {
    render() {
        let {bt, source} = this.props;

        return <div className="example">
            <EditorComponent source={source} />
        </div>;
    }
};

export function injectExamples() {
    let codes = document.getElementsByTagName("code");
    for (var i = 0; i < codes.length; i++) {
        let code = codes[i];
        let pre = code.parentNode; // markdown does <pre><code> for blocks
        let match = codes[i].innerText.match(/\s*{([^\s]*)}/);
        if (!match) {
            continue;
        }
        let source = codes[i].innerText.substr(match[0].length);

        let exampleName = match[1];
        // make a backtalk evaluator and set up the scope for the
        // given example.

        let bt = new Evaluator();
        let example = examples.getExample(exampleName);
        example.prepareScope(bt.scope);

        // make an example component and mount it, replacing the
        // <code> element

        let container = document.createElement("div");
        container.className = "editor";
        pre.parentNode.replaceChild(container, pre);

        ReactDOM.render((<ExampleComponent example={example} bt={bt} source={source} />), container);
    }
}
