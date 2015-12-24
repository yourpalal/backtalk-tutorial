/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import {EditorComponent} from "./editor";
import {Evaluator, Immediate, ParseError} from "backtalk";
import * as React from "react";
import * as ReactDOM from "react-dom";

import * as examples from "./examples";


export interface ExampleProps {
    bt: Evaluator;
    example: examples.Example;
    source: string;
};

export interface ExampleState {
    result?: any;
    value?: string;
    err?: any;
};

export class ExampleComponent extends React.Component<ExampleProps, ExampleState> {
    update: number;

    constructor(props: ExampleProps, context) {
        super(props, context);

        this.update = 0;

        this.state = {
            result: null,
            value: props.source.trim() + "\n" + "\n"
        };
    }

    componentDidMount() {
        this.updateResult(this.props.source);
    }


    updateResult(value) {
        let updating = ++this.update;

        let {bt} = this.props;

        Immediate.wrap(() => {
            let node = bt.compile(value, this.props.example.name);
            return bt.runForResult(this.props.example.name);
        }).then((result) => {
            if (updating != this.update) {
                return;
            }

            this.setState({
                result: result,
                err: null
            });
        }, (err) => {
            if (updating != this.update) {
                return;
            }

            this.setState({
                result: null,
                err: err
            });
        });
    }

    onCodeChange(value) {
        this.setState({
            value: value
        });
        this.updateResult(value);
    }

    resetCode() {
        this.setState({
            value: this.props.source.trim() + "\n" + "\n"
        });
        this.updateResult(this.props.source);
    }

    renderError() {
        let {err} = this.state;

        if (!err) {
            return "";
        }

        if (!(err instanceof ParseError)) {
            return err.toString();
        }

        return <ul>{err.errors.map((e) =>
            <li key={e.line}>line {e.line}</li>
        )}</ul>;
    }

    render() {
        let {bt, example, source} = this.props;
        let {value, result, err} = this.state;

        return <div className="example">
            <button className="reset" onClick={() => this.resetCode()}>reset</button>
            <EditorComponent key="editor" source={value} onChange={(v) => this.onCodeChange(v)} />
            {!err ? "" :
                <div className="errors">
                    <label>errors</label>
                    {this.renderError()}
                </div>}
            {!example.showResult ? "": <div className="result" key="result">
                    <label htmlFor="result">result</label>
                    <output name="result">{result}</output>
                </div>}
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
