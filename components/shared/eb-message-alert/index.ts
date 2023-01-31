import { message as atndMessage } from 'antd';

const EbMessageAlert = (message: string, type: 'success' | 'info' | 'error' | 'warning' | 'loading' = 'success', duration = 5) => {
    atndMessage[type](
        {
            content: message,
            style: { textAlign: 'center' },
        },
        duration,
    );
};

export default EbMessageAlert;
