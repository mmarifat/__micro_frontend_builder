import React from 'react';
import type { NextPage } from 'next';
import { Divider, Modal, Tabs, Tooltip } from 'antd';
import { CloseOutlined, CopyOutlined, SaveOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import EbBuilderComponent from '@components/eb-builder';
import EbButton from '@components/shared/eb-button';
import EbMessageAlert from '@components/shared/eb-message-alert';
import { EmailBuilderResponse, ExportType } from '@library/interfaces';

const EntryPage: NextPage = (): JSX.Element => {
    const [ref, setRef] = React.useState<any>(null);
    const [resultModal, setResultModal] = React.useState<{ type: ExportType; data: EmailBuilderResponse | null }>({
        type: 'design',
        data: null,
    });
    const emailResult = React.useMemo(() => {
        const resp = resultModal?.data as EmailBuilderResponse;
        if (!resp) return '';
        return resultModal?.type === 'html' ? resp[resultModal?.type] : JSON.stringify(resp[resultModal?.type]);
    }, [resultModal]);
    const onReady = (_ref: any) => setRef(() => _ref);
    const onGenerate = () =>
        ref?.editor.exportHtml((data: EmailBuilderResponse) =>
            setResultModal(p => ({
                ...p,
                data,
            })),
        );

    const onDownload = () => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(emailResult));
        element.setAttribute('download', `${Date.now()}-${resultModal?.type}.${resultModal?.type === 'html' ? 'html' : 'json'}`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div>
            {!!ref && (
                <div className="h-14 w-auto  px-5 bg-primary flex items-center justify-center md:justify-end gap-4">
                    <EbButton
                        label="Export"
                        buttonType="ghost"
                        htmlType="button"
                        className="bg-black hover:bg-white text-white hover:text-black"
                        onClick={onGenerate}
                    />
                </div>
            )}

            <EbBuilderComponent onReady={onReady} minHeight="93vh" />

            <Modal
                centered
                closable
                destroyOnClose
                width="75%"
                open={resultModal.data !== null}
                okButtonProps={{ className: 'hidden' }}
                cancelButtonProps={{ className: 'hidden' }}
                closeIcon={<CloseOutlined onClick={() => setResultModal({ type: 'design', data: null })} />}>
                <div className="mt-10">
                    <div className="flex flex-wrap justify-between items-center p-3 !border-t-[1px] !border-l-[1px] !border-r-[1px] border-primary">
                        <div className="text-lg">Email Builder Result</div>
                        <div>
                            <Tabs
                                defaultActiveKey={resultModal.type}
                                items={[
                                    { key: 'design', label: 'JSON' },
                                    { key: 'html', label: 'HTML' },
                                ]}
                                onChange={key => setResultModal(p => ({ ...p, type: key as ExportType }))}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <CopyToClipboard text={emailResult} onCopy={() => EbMessageAlert('Copied to clipboard!')}>
                                <Tooltip title="Copy to clipboard">
                                    <CopyOutlined className="cursor-pointer !text-2xl text-black-semi" />
                                </Tooltip>
                            </CopyToClipboard>
                            <Divider type="vertical" />
                            <Tooltip title="Download">
                                <SaveOutlined className="cursor-pointer text-2xl text-black-semi" onClick={onDownload} />
                            </Tooltip>
                        </div>
                    </div>
                    <div className="!border-[1px] py-3 px-1 border-primary break-words bg-[#E7E7E7] h-72 overflow-y-auto">
                        <pre>
                            <code>{emailResult}</code>
                        </pre>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EntryPage;
