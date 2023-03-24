import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Button, Card } from 'antd';
import EbTitle from '@components/shared/eb-title';

const App: NextPage = (): JSX.Element => {
    return (
        <div className="grid h-screen place-items-center">
            <div className="!w-[95%]">
                <EbTitle title="Content Builder" />
                <p className="text-center pb-2 text-primary text-4xl">Welcome to Content Builder</p>
                <Card title={<span className="flex justify-center items-center">What platform you want to use?</span>}>
                    <Card.Grid className="!w-[50%] text-center">
                        <Button type="ghost">
                            <Link href="/email-builder">Email Builder</Link>
                        </Button>
                    </Card.Grid>
                    <Card.Grid className="!w-[50%] text-center">
                        <Button type="ghost">
                            <Link href={{ pathname: '/contact-us', query: { key: 'developer-public-key' } }}>Contact Us</Link>
                        </Button>
                    </Card.Grid>
                </Card>
            </div>
        </div>
    );
};
export default App;
