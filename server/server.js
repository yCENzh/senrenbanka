// server.js
//router
import app from './app.js';
const PORT = process.env.PORT || 3300;
import cors from 'cors';
// ...其他导入和配置
app.use(cors({
  origin: 'http://localhost:5173', // 假设前端运行在 5173 端口，根据实际修改
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});