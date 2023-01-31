import React from 'react';
import Link from 'next/link';
import { Button, Result } from 'antd';

function ErrorCode({ statusCode = 404, statusText = 'Sorry, the page you visited does not exist.' }) {
    return (
        <div className="min-h-screen grid place-items-center bg-white">
            <Result
                status={statusCode.toString() as any}
                title={statusCode}
                subTitle={statusText}
                extra={
                    <Link href="/" passHref>
                        <a>
                            <Button>Back Home</Button>
                        </a>
                    </Link>
                }
            />
        </div>
    );
}

export default ErrorCode;
