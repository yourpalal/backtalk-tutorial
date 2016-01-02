/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import {EditorComponent} from "./editor";
import {Evaluator, Immediate, ParseError, Scope} from "backtalk";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Promise} from "es6-promise";

import * as examples from "./examples";


export class ExampleRunner {
    output: string[] = [];
    result: any;
    err: any;

    bt: Evaluator;
    scope: Scope;

    constructor(public example: examples.Example) {
        this.bt = new Evaluator();
        this.scope = this.bt.scope;

        example.prepareScope(this.scope);

        // override stdout
        this.scope.env.stdout = this;
        this.scope.env.example = this;
    }

    run(code): Promise<ExampleState> {
        let {bt, example} = this;

        return new Promise<ExampleState>((resolve) => {
            let node = bt.compile(code, example.name);
            resolve(bt.runForResult(example.name));
        }).then((result) => {
            if (result === undefined || result === null || result.toString === undefined) {
                result = "";
            }

            return {
                result: result.toString(),
                output: this.output,
                err: null
            };
        }, (err) => ({
            result: null,
            err: err,
            output: this.output
        }));
    }

    write(s: any) {
        this.output.push(s.toString());
    }
}

interface ErrorProps {
    err: any;
}

class ErrorComponent extends React.Component<ErrorProps, {}> {
    render() {
        let {err} = this.props;
        if (!err) {
            return null;
        }

        return (<div className="errors">
            <label>errors</label>
            {!(err instanceof ParseError) ? err.toString() :
                <ul>{err.errors.map((e) =>
                    <li key={e.line}>line {e.line}</li>
                )}</ul>
            }
        </div>);
    }
}


export interface ExampleProps {
    name: number;
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
    step: number = 0;

    constructor(props: ExampleProps, context) {
        super(props, context);

        this.state = {
            result: null,
            value: props.source.trim(),
            output: []
        };
    }

    updateResult(value?) {
        value = value || this.state.value;

        let run = new ExampleRunner(this.props.example).run(value);
        let step = ++this.step;
        run.then((result) => {
                if (step == this.step) {
                    this.setState(result);
                }
            }, (err) => {
                if (step == this.step) {
                    this.setState(err);
                }
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

    render() {
        let {example, source, name} = this.props;
        let {value, result, err} = this.state;
        let editorName = `${example.name}_${name}`;

        return <div className="example">
            <div className="extras">
                {example.makeExtras(() => this.updateResult())}
            </div>
            <button className="reset" onClick={() => this.resetCode()}>reset</button>
            <EditorComponent name={editorName} source={value} onChange={(v) => this.onCodeChange(v)} />
            <ErrorComponent err={err} />
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
        let match = code.textContent.match(/\s*--\s*([^\s]*)[\n\s]+/);
        if (!match) {
            continue;
        }
        let source = code.textContent.substr(match[0].length).trim();

        let exampleName = match[1];
        // make a backtalk evaluator and set up the scope for the
        // given example.

        let example = new examples[exampleName]();

        // make an example component and mount it, replacing the
        // <code> element

        let container = document.createElement("div");
        container.className = "editor";
        pre.parentNode.replaceChild(container, pre);

        ReactDOM.render((<ExampleComponent example={example} source={source} name={i} />), container);
    }
}
