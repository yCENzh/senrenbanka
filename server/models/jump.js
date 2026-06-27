// models/jumpModel.js
import pool from '../config/database.js';
class jumpModel {
    async getAllJump(){
        //获取所有剧情分支
        const [rows] = await pool.execute('SELECT * FROM jump');
        return rows
    }
}

export default  new jumpModel();