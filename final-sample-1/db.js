import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',  
    user: 'std',
    password: 'std',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3310
});
export default pool;