import mysql from 'mysql2/promise';
export const pool = mysql.createPool({
    host: 'localhost',  
    user: 'std',
    password: '',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
