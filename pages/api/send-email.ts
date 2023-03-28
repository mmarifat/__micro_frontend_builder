// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getLicenseInfo } from './get-license-info';
import MongoConnect from '@library/server/mongo';
import EmailTransporter from '@library/server/email-transporter';

type Data = {
    message: string;
    status: number;
};

export const sendEmailHelper = async (key: string, to: string, subject: string, text: string) => {
    await MongoConnect();
    const licenseInfo = await getLicenseInfo(key);
    const { user, pass, from, sender } = licenseInfo || {};
    if (!user || !pass || !from || !sender) {
        return { status: 400, message: 'Wrong project configuration' };
    }
    const transporter = await EmailTransporter(licenseInfo);
    return transporter
        .sendMail({
            from: `${sender} <${from}>`,
            sender,
            to,
            subject,
            text,
            html: text,
        })
        .then(() => {
            return { status: 200, message: 'Thank you for contacting us!' };
        })
        .catch(e => {
            console.log(new Date().toISOString(), 'emailer failure reason', e);
            return { status: 400, message: 'Something went wrong! Please contact admin.' };
        });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        res.status(400).json({ status: 400, message: 'Wrong request method' });
    }
    const { key, to, subject, text } = req.body;
    if (!key || !to || !subject || !text) {
        res.status(400).json({ status: 400, message: 'Wrong project configuration' });
    }
    const { status, message } = await sendEmailHelper(key, to, subject, text);
    res.status(status).json({ status, message });
}
