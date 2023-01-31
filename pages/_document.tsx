import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { revalidate } from '@module-federation/nextjs-mf/utils';

export default function MyDocument() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
                <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export const getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);
    // can be any lifecycle or implementation you want
    ctx?.res?.on('finish', () => {
        revalidate().then((shouldUpdate: any) => {
            console.log('finished sending response', shouldUpdate);
        });
    });
    return initialProps;
};
