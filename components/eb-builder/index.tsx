import React, { CSSProperties } from 'react';
import EmailEditor, { AppearanceConfig, ToolsConfig, UnlayerOptions } from 'react-email-editor';
import EbTitle from '@components/shared/eb-title';

type Props = {
    readonly editorId?: string | undefined;
    readonly style?: CSSProperties | undefined;
    readonly minHeight?: number | string | undefined;
    readonly options?: UnlayerOptions | undefined;
    readonly tools?: ToolsConfig | undefined;
    readonly appearance?: AppearanceConfig | undefined;
    readonly projectId?: number | undefined;
    readonly scriptUrl?: string | undefined;
    /** @deprecated Use **onReady** instead */
    onLoad?(): void;
    onReady?(ref: React.Ref<any>): void;
};

const EbBuilderComponent: React.FC<Props> = props => {
    const emailEditorRef = React.useRef(null);
    const __onReady = () => {
        if (props?.onReady) props?.onReady(emailEditorRef.current);
    };
    return (
        <>
            <EbTitle title="Email:Builder" />
            <EmailEditor ref={emailEditorRef} {...props} onReady={__onReady} />;
        </>
    );
};

EbBuilderComponent.displayName = 'EbBuilderComponent';
export default EbBuilderComponent;
