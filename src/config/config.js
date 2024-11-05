import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../constants/env.js';

export const config = {
    database: {
        name: DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
    },
};
