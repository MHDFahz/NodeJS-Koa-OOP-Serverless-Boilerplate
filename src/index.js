import App from "./app.js";

const app = new App();

// Lamda Function
export const handler = async (event, context) => {
  const result = await app.handler(event, context);
  return result;
};
