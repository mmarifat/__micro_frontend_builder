import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';

export const funcGreetings = () => {
    const curHr = new Date().getHours();
    if (curHr < 12) return 'Good Morning!';
    else if (curHr < 18) return 'Good Afternoon!';
    else return 'Good Evening!';
};

export const funcTailwindConfig = () => resolveConfig(tailwindConfig as any) as any;
