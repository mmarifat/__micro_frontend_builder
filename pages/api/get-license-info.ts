// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import MongoConnect from '@library/server/mongo';
import { License } from '@library/server/models';

type Data = {
    data?: {
        license: string;
        from: string;
        sender: string;
        user: string;
        pass: string;
        type: 'microsoft' | 'gmail';
    };
    status: number;
    message: string;
};

export const getLicenseInfo = async (key: string, fields: string[] = []) => {
    await MongoConnect();
    return License.findOne({ key }, fields.join(' ')).lean() as any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'GET') {
        res.status(400).json({ status: 400, message: 'Wrong request method' });
    }
    const { key } = req.query;
    const licenseInfo = await getLicenseInfo(key as string);
    if (!licenseInfo) {
        res.status(400).json({ status: 400, message: 'No license info found' });
        return;
    }
    res.status(200).json({ status: 200, message: 'License info fetched successfully', data: licenseInfo });
}
