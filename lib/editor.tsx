/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import * as React from "react";
import AceEditor = require("react-ace");

export interface EditorProps {
    name: string;
    source: string;
    onChange?: Function;
}

export interface EditorState {

}

export class EditorComponent extends React.Component<EditorProps, EditorState> {
    render() {
        let {source, onChange, name} = this.props;

        return (<div className="editor">
            <label>code</label>
            <AceEditor name={name} value={source} onChange={onChange} maxLines={30} editorProps={{$blockScrolling: Infinity}} />
        </div>);
    }
}
