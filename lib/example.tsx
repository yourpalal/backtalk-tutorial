/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import {EditorComponent} from "./editor";
import * as React from "react";
import * as ReactDOM from "react-dom";


export interface ExampleProps {

};

export interface ExampleState {

};

export class ExampleComponent extends React.Component<ExampleProps, ExampleState> {
    render() {
        return <div className="example">
            <EditorComponent />
        </div>;
    }
};

export function injectExamples() {
    let codes = document.getElementsByTagName("code");
    for (var i = 0; i < codes.length; i++) {
        let code = codes[i];
        console.log(codes[i].innerText);
    }
}
