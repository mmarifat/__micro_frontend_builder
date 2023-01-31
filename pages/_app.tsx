import React from 'react';
import '@module-federation/nextjs-mf/src/include-defaults';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import en_GB from 'antd/lib/locale/en_GB';
import EbBackdrop from '@components/shared/eb-backdrop';
import { funcTailwindConfig } from '@library/functions';
import '@styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [backdrop, setBackdrop] = React.useState<boolean>(false);
    const [hydrated, setHydrated] = React.useState<boolean>(false);

    React.useEffect(() => {
        setHydrated(true);
        router.events.on('routeChangeError', () => setBackdrop(false));
        router.events.on('routeChangeStart', () => setBackdrop(true));
        router.events.on('routeChangeComplete', () => setBackdrop(false));

        return () => {
            router.events.off('routeChangeError', () => setBackdrop(false));
            router.events.off('routeChangeStart', () => setBackdrop(true));
            router.events.off('routeChangeComplete', () => setBackdrop(false));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!hydrated) return null;
    if (typeof window === 'undefined') return <></>;

    const { colors, fontFamily } = funcTailwindConfig().theme;
    const defaultPrimaryColor = colors.primary.DEFAULT;
    const defaultFontFamily = fontFamily['poppins'].join(' ');

    return (
        <ConfigProvider
            locale={en_GB}
            direction="ltr"
            theme={{
                token: {
                    fontFamily: defaultFontFamily,
                    colorPrimary: defaultPrimaryColor,
                    colorPrimaryActive: defaultPrimaryColor,
                    colorPrimaryText: defaultPrimaryColor,
                    colorPrimaryTextActive: defaultPrimaryColor,
                    colorPrimaryTextHover: defaultPrimaryColor,
                    colorPrimaryBorder: defaultPrimaryColor,
                    colorPrimaryBorderHover: defaultPrimaryColor,
                    colorPrimaryBg: defaultPrimaryColor,
                    colorPrimaryBgHover: defaultPrimaryColor,
                    colorPrimaryHover: defaultPrimaryColor,
                },
            }}>
            <EbBackdrop status={backdrop} />
            <Head>
                <title>Email:Builder</title>
            </Head>
            <Component {...pageProps} />
        </ConfigProvider>
    );
}

export default MyApp;
