import React from 'react';
import { Button } from 'antd';
import EbTitle from '@components/shared/eb-title';
import EbMessageAlert from '@components/shared/eb-message-alert';

type Props = {
    license: string;
    pageTitle: string;
    pageDescription: string;
    sendButtonText: string;
};

type State = {
    email: string;
    subject: string;
    text: string;
    loading: boolean;
};

const EbContactUsComponent: React.FC<Props> = props => {
    const [state, setState]: [State, React.Dispatch<Partial<State>>] = React.useReducer((s: State, a: Partial<State>) => ({ ...s, ...a }), {
        email: '',
        subject: '',
        text: '',
        loading: false,
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        setState({ loading: true });
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: props.license,
                to: state.email,
                subject: state.subject,
                text: state.text,
            }),
        })
            .then(async res => {
                const response = await res.json();
                EbMessageAlert(response?.message || response?.errorMessage || 'Server Error', response?.status === 200 ? 'success' : 'error');
                if (response?.status === 200) {
                    setState({
                        email: '',
                        subject: '',
                        text: '',
                    });
                }
            })
            .finally(() => {
                setState({ loading: false });
            });
    };
    return (
        <div>
            <EbTitle title="Contact US" />

            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">{props.pageTitle}</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">{props.pageDescription}</p>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-gray-900 dark:text-gray-300">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={state.email}
                                onChange={e => setState({ email: e.currentTarget.value })}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-gray-900 dark:text-gray-300">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={state.subject}
                                onChange={e => setState({ subject: e.currentTarget.value })}
                                className="block p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Let us know how we can help you"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-gray-900 dark:text-gray-400">
                                Your message
                            </label>
                            <textarea
                                id="message"
                                rows={6}
                                value={state.text}
                                onChange={e => setState({ text: e.currentTarget.value })}
                                className="block p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Leave a comment..."
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button type="primary" htmlType="submit" size="large" loading={state.loading}>
                                {props.sendButtonText}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

EbContactUsComponent.displayName = 'EbContactUsComponent';
export default EbContactUsComponent;
