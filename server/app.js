// app.js
import express from 'express';
import Routes from './routes/Routes.js';
import pool from './config/database.js';

const app = express();
// 中间件
app.use(express.json());

// 将数据库连接注入到请求对象中
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// 路由
app.use('/api', Routes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});


// 测试数据库连接
pool.getConnection()
  .then(connection => {
    console.log('Connected to database');
    console.log()
    connection.release();
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

export default  app;