declare module "react-ace" {
    import * as React from "react";

    interface AceEditorProps {
        value?: string;
        mode?: string;
        theme?: string;
        onChange?: Function;
        name?: string;
        editorProps?: any;
    }

    interface AceEditorState {

    }

    export = class AceEditor extends React.Component<AceEditorProps, AceEditorState> {

    }
}
