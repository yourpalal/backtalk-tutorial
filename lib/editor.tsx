/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/react-ace.d.ts"/>

import * as React from "react";
import {AceEditor} from "react-ace";

export interface EditorProps {

}

export interface EditorState {

}

export class EditorComponent extends React.Component<EditorProps, EditorState> {
    render() {
        return <AceEditor />;
    }
}
