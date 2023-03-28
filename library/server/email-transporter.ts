import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const GMAIL_REDIRECT_URI = 'https://developers.google.com/oauthplayground';

export default async function EmailTransporter(license: Record<string, any>) {
    if (license.type === 'gmail') {
        const oAuth2Client: OAuth2Client = new google.auth.OAuth2(license.oAuth2ClientId, license.oAuth2ClientSecret, GMAIL_REDIRECT_URI);
        await oAuth2Client.setCredentials({ refresh_token: license.oAuth2RefreshToken });
        const accessToken = await oAuth2Client.getAccessToken();
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: license.oAuth2EmailId,
                clientId: license.oAuth2ClientId,
                clientSecret: license.oAuth2ClientSecret,
                refreshToken: license.oAuth2RefreshToken,
                accessToken: accessToken,
            },
        } as any);
    } else {
        return nodemailer.createTransport({
            service: 'Outlook365',
            host: 'smtp.office365.com',
            port: '587',
            tls: { ciphers: 'SSLv3' },
            auth: { user: license.user, pass: license.pass },
        } as any);
    }
}
