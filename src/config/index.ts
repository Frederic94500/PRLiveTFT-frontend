import { config } from 'dotenv';
config({ path: `.env.${process.env['NODE_ENV'] || 'development'}.local` });

export const { API_URL } = process.env;
export const { SECRET_KEY } = process.env;