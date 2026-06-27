// models/userModel.js
import pool from '../config/database.js';

class MainModel {
  // 查询主表，返回对应剧情信息
   async getPlotById(id) {
    const [rows] = await pool.execute('SELECT * FROM main WHERE plot_id = ?', [id]);
    
    return rows[0];
  }

}

export default  new  MainModel();