import React from 'react';
import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const EbBackdrop: React.FC<{ status: boolean; maskStyle?: Record<string, any> }> = ({ status, maskStyle = {} }) => {
    return (
        <Modal
            destroyOnClose={true}
            wrapClassName="ant-modal-content-transparent"
            maskStyle={{ backgroundColor: 'rgba(255,255,255,0.05)', ...maskStyle }}
            transitionName=""
            maskTransitionName=""
            centered
            open={status}
            width="auto"
            footer={false}
            closable={false}>
            <Spin size="large" indicator={<LoadingOutlined spin />} />
        </Modal>
    );
};

export default EbBackdrop;
