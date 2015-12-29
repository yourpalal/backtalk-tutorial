/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import {EditorComponent} from "./editor";
import {Evaluator, Immediate, ParseError} from "backtalk";
import * as React from "react";
import * as ReactDOM from "react-dom";

import * as examples from "./examples";


export interface ExampleProps {
    name: number;
    bt: Evaluator;
    example: examples.Example;
    source: string;
};

export interface ExampleState {
    result?: any;
    value?: string;
    err?: any;
    output?: string[];
};

export class ExampleComponent extends React.Component<ExampleProps, ExampleState> {
    constructor(props: ExampleProps, context) {
        super(props, context);

        this.state = {
            result: null,
            value: props.source.trim(),
            output: []
        };

        props.bt.scope.env["stdout"] = this;
        props.bt.scope.env["example"] = this;
    }

    // api for examples
    write(s: any) {
        this.setState((state) => {
            return {output: state.output.concat([s.toString()])};
        });
    }

    updateResult(value?) {
        value = value || this.state.value;

        this.setState({
            output: []
        });
        let {bt, example} = this.props;

        example.refreshScope(bt.scope);

        Immediate.wrap(() => {
            let node = bt.compile(value, example.name);
            return bt.runForResult(example.name);
        }).then((result) => {
            if (result === undefined || result === null || result.toString === undefined) {
                result = "";
            }

            this.setState({
                result: result.toString(),
                err: null
            });
        }, (err) => {
            this.setState({
                result: null,
                err: err
            });
        });
    }

    // events

    componentDidMount() {
        this.updateResult(this.props.source);
    }

    onCodeChange(value) {
        this.setState({
            value: value,
            output: []
        });
        this.updateResult(value);
    }

    resetCode() {
        this.setState({
            value: this.props.source.trim()
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
        let {bt, example, source, name} = this.props;
        let {value, result, err} = this.state;
        let editorName = `${example.name}_${name}`;

        return <div className="example">
            <div className="extras">
                {example.makeExtras(() => this.updateResult())}
            </div>
            <button className="reset" onClick={() => this.resetCode()}>reset</button>
            <EditorComponent name={editorName} source={value} onChange={(v) => this.onCodeChange(v)} />
            {!err ? "" :
                <div className="errors">
                    <label>errors</label>
                    {this.renderError()}
                </div>}
            {!example.showResult ? "": <div className="result" key="result">
                    <label htmlFor="result">result</label>
                    <output name="result">{result}</output>
                </div>}
            {!example.showOutput ? "": <div className="output">
                <label htmlFor="output">output</label>
                <output name="output">{this.state.output.map((line, i) =>
                    <div key={i}>{line}</div>
                )}</output>
            </div>}
        </div>;
    }
};

export function injectExamples() {
    let codes = Array.prototype.slice.apply(document.getElementsByTagName("code"));
    for (var i = 0; i < codes.length; i++) {
        let code = codes[i];
        let pre = code.parentNode; // markdown does <pre><code> for blocks
        let match = code.innerText.match(/\s*--\s*([^\s]*)[\n\s]+/);
        if (!match) {
            continue;
        }
        let source = code.innerText.substr(match[0].length).trim();

        let exampleName = match[1];
        // make a backtalk evaluator and set up the scope for the
        // given example.

        let bt = new Evaluator();
        let example = new examples[exampleName]();
        example.prepareScope(bt.scope);

        // make an example component and mount it, replacing the
        // <code> element

        let container = document.createElement("div");
        container.className = "editor";
        pre.parentNode.replaceChild(container, pre);

        ReactDOM.render((<ExampleComponent example={example} bt={bt} source={source} name={i} />), container);
    }
}
