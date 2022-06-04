import {createPool} from "mysql2/promise";
import { v4 as uuid } from 'uuid';
import {config} from "../config/config";

export {
    uuid,
};

export const pool = createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
    namedPlaceholders: true,
    decimalNumbers: true,
});
