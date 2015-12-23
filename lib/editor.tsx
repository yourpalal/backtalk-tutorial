/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import * as React from "react";
import AceEditor = require("react-ace");

export interface EditorProps {
    source: string;
}

export interface EditorState {

}

export class EditorComponent extends React.Component<EditorProps, EditorState> {
    render() {
        var e = <AceEditor value={this.props.source} />;
        return (<div className="ace">{e}
        </div>);
    }
}
