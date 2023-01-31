import { Button } from 'antd';
import React from 'react';
import { CommonInterface } from '@library/interfaces';
import CaptureButtonInterface = CommonInterface.CaptureButtonInterface;

const EbButton: React.FC<CaptureButtonInterface> = ({
    size,
    disabled,
    label,
    htmlType,
    buttonType,
    className,
    onClick,
    style,
    icon,
    loading,
    ...rest
}) => (
    <Button
        disabled={disabled}
        size={size}
        icon={icon}
        type={buttonType}
        htmlType={!!htmlType ? htmlType : 'button'}
        onClick={onClick}
        loading={loading}
        style={style || {}}
        className={`border border-transparent hover:text-primary hover:border-primary hover:border focus:border-transparent focus:text-primary ${className}`}
        {...rest}>
        {label}
    </Button>
);
EbButton.displayName = 'EbButton';
export default EbButton;
