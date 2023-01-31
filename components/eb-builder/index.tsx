import React from 'react';
import EmailEditor from 'react-email-editor';

type Props = {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);;
    onLoad?: () => void;
    // editor is ready
    onReady: (ref: React.Ref<any>) => void;
};

const EbBuilderComponent: React.FC<Props> = ({ onReady, onLoad }) => {
    const emailEditorRef = React.useRef(null);
    const __onLoad = () => {
        if (onLoad) onLoad();
    };
    const __onReady = () => {
        if (onReady) onReady(emailEditorRef.current);
    };
    return <EmailEditor style={{ minHeight: '92vh' }} ref={emailEditorRef} onLoad={__onLoad} onReady={__onReady} />;
};

EbBuilderComponent.displayName = 'EbBuilderComponent';
export default EbBuilderComponent;
