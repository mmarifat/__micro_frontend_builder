import mongoose, { Model } from 'mongoose';

/* LicenseSchema will correspond to a collection in your MongoDB database. */
const LicenseSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: [true, 'Please provide a key.'],
        },
        type: {
            type: String,
            required: [true, 'Please provide the type either microsoft or gmail'],
            default: () => 'microsoft',
        },
        user: {
            type: String,
            required: [true, 'Please specify user for node mailer.'],
        },
        pass: {
            type: String,
            required: [true, 'Please specify password for node mailer.'],
        },
        from: {
            type: String,
            required: [true, 'Please specify FROM for node mailer.'],
        },
        sender: {
            type: String,
            required: [true, 'Please specify SENDER INFO for node mailer.'],
        },
        pageTitle: {
            type: String,
            required: [true, 'Please specify Page Title.'],
            default: () => 'Contact Us',
        },
        pageDescription: {
            type: String,
            required: [true, 'Please specify Page Description.'],
            default: () => 'Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.',
        },
        sendButtonText: {
            type: String,
            required: [true, 'Please specify send button text for the form.'],
            default: () => 'Send Message',
        },
    },
    {
        autoIndex: true,
    },
);

LicenseSchema.index({ key: 1 }, { unique: true });
export const License: typeof Model = mongoose.models['emailer_licenses'] || mongoose.model('emailer_licenses', LicenseSchema);
