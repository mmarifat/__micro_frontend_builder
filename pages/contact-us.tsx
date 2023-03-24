import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Error from '@components/Error';
import EbContactUsComponent from '@components/eb-contact-us';
import { getLicenseInfo } from './api/get-license-info';

type Props = {
    pageTitle: string;
    pageDescription: string;
    sendButtonText: string;
} & any;

const EmailContactUs: NextPage = (props: Props) => {
    const {
        query: { key },
    } = useRouter();
    if (!key || typeof key !== 'string') return <Error statusCode={403} statusText="Invalid Page" />;
    return (
        <EbContactUsComponent
            license={key as string}
            pageTitle={props.pageTitle}
            pageDescription={props.pageDescription}
            sendButtonText={props.sendButtonText}
        />
    );
};
export default EmailContactUs;

export async function getServerSideProps({ req }: any) {
    const url = new URL(req.url, 'http://google.com');
    const key = url.searchParams.get('key');
    const ret = {
        props: {},
    };
    if (!key) return ret;
    let res: Props = await getLicenseInfo(key as string, ['pageTitle', 'pageDescription', 'sendButtonText']);
    if (!res) return ret;
    res = res || {};
    ret.props = {
        pageTitle: res?.pageTitle,
        pageDescription: res?.pageDescription,
        sendButtonText: res?.sendButtonText,
    };
    return ret;
}
