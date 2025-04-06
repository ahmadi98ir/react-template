const mysql = require('mysql2/promise');

async function healthCheck() {
  try {
    // بررسی اتصال به پایگاه داده
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    
    await connection.query('SELECT 1');
    await connection.end();
    console.log('✅ Database connection is healthy');

    // بررسی متغیرهای محیطی ضروری
    const requiredEnvVars = [
      'DB_HOST',
      'DB_USER',
      'DB_PASSWORD',
      'DB_NAME',
      'JWT_SECRET',
      'NEXT_PUBLIC_API_URL'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      console.error('❌ Missing required environment variables:', missingVars);
      process.exit(1);
    }
    console.log('✅ All required environment variables are set');

    console.log('✅ Health check completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Health check failed:', error);
    process.exit(1);
  }
}

healthCheck(); 