import { NextPage } from 'next';
import ErrorComponent from '@components/Error';

const Error403Page: NextPage = (): JSX.Element => <ErrorComponent statusCode={403} statusText="Sorry, Access Denied!!" />;

export default Error403Page;
