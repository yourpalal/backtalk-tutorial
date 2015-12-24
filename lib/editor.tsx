/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import * as React from "react";
import AceEditor = require("react-ace");

export interface EditorProps {
    key?: any;
    source: string;
    onChange?: Function;
}

export interface EditorState {

}

export class EditorComponent extends React.Component<EditorProps, EditorState> {
    render() {
        let {source, onChange} = this.props;

        var e = <AceEditor value={source} onChange={(v) => {console.log(v); onChange(v);}} maxLines={5} />;
        return (<div className="ace">{e}
        </div>);
    }
}
