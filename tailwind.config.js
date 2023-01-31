/** @type {import("tailwindcss").Config} */
module.exports = {
    corePlugins: { preflight: false },
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './library/**/*.{js,ts}'],
    theme: {
        fontFamily: {
            poppins: ['Poppins'],
        },
        colors: {
            primary: {
                DEFAULT: '#14b8a6',
                2: '#5Fb8a6',
            },
            secondary: {
                DEFAULT: '#e0e7ff',
            },
            white: {
                DEFAULT: '#ffffff',
            },
            black: {
                DEFAULT: '#000000',
                semi: '#414a4c',
            },
            red: {
                DEFAULT: '#ff0e0e',
            },
        },
        extend: {
            maxWidth: {
                980: '980px',
                1160: '1160px',
                1320: '1320px',
            },
        },
    },
    plugins: [],
};
