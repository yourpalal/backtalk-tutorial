declare module "react-ace" {
    import * as React from "react";

    interface AceEditorProps {
        value?: string;
        mode?: string;
        theme?: string;
        name?: string;
        editorProps?: any;
        maxLines?: number;

        onChange?: Function;
    }

    interface AceEditorState {

    }

    export = class AceEditor extends React.Component<AceEditorProps, AceEditorState> {

    }
}
