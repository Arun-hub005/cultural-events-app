const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
  try {
    console.log(`Attempting to connect to MySQL as '${process.env.MYSQL_USER}'@'${process.env.MYSQL_HOST}'...`);
    
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || ''
    });
    
    console.log('Connection successful! Creating database...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DB}\`;`);
    console.log(`Database '${process.env.MYSQL_DB}' created or verified successfully.`);
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('\n--- DATABASE CREATION FAILED ---');
    console.error('Error:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 FIX: Your MySQL root user requires a password, but MYSQL_PASSWORD in your .env file is currently empty.');
      console.error('Please open /backend/.env, fill in the correct MYSQL_PASSWORD, and try again.');
    }
    process.exit(1);
  }
}

createDatabase();
