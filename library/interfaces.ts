import React from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ButtonType } from 'antd/es/button';

export type EmailBuilderResponse = { design: any; html: any; [x: string]: any };

export type ExportType = 'html' | 'design';

export namespace CommonInterface {
    export interface CaptureButtonInterface {
        size?: SizeType;
        disabled?: boolean;
        label: string;
        loading?: boolean;
        icon?: React.ReactElement;
        buttonType?: ButtonType;
        htmlType?: 'button' | 'reset' | 'submit' | undefined;
        className?: string;
        style?: any;
        onClick?: (e: any) => void;
        [x: string]: any;
    }
}
