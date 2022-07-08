import 'dotenv/config';

export default {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.USER_NAME,
    PASSWORD: process.env.USER_PASSWORD
}