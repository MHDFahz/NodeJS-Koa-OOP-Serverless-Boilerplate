import App from './app.mjs';

const app = new App();

// Lamda Function
export const handler = async (event, context) => {
    const result = await app.handler(event, context);
    return result;
};

export default handler;
