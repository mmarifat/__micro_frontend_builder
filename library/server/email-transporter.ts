import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class EmailTransporter {
    transporter: Transporter<SMTPTransport.SentMessageInfo>;

    constructor(user: string, pass: string) {
        this.transporter = nodemailer.createTransport({
            service: 'Outlook365',
            host: 'smtp.office365.com',
            port: '587',
            tls: { ciphers: 'SSLv3' },
            auth: { user, pass },
        } as any);
    }
}
