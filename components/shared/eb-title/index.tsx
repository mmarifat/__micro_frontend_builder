import React from 'react';
import Head from 'next/head';

export default function EbTitle({ title }: { title: string }) {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
}
