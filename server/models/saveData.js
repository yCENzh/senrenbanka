// models/saveData.model.js
import pool from '../config/database.js';
const MAX_SAVES = 48;

class SaveDataModel {
  
  async getSaveById(Did) {
    //查找存档的所有信息
    const [rows] = await pool.execute('SELECT * FROM save_data WHERE Did = ?', [Did]);
    return rows[0];
  }

  async getAllSaves() {
    //获取所有存档
    const [rows] = await pool.execute('SELECT * FROM save_data');
    return rows;
  }

  async updateSave(plot_id, timestamp, comment, stroyArc, Did) {
    //修改存档
    await pool.execute('UPDATE save_data SET plot_id = ?, timestamp = ?, comment = ?, stroyArc = ?  WHERE Did = ?', [plot_id, timestamp, comment,stroyArc , Did]);
    return this.getSaveById(Did);
  }

  async updateSaveComment(comment,Did,timestamp){
    //更改评论
    await pool.execute('UPDATE save_data SET comment = ? , timestamp = ? WHERE Did = ?', [comment , timestamp ,Did]);
    return this.getSaveById(Did);
  }

  async clearSaveData(Did){
    //清除存档
    await pool.execute("UPDATE save_data SET plot_id = ?, timestamp = null , comment = null,stroyArc = ? WHERE Did = ?",[-1,-1,Did]);
    return this.getSaveById(Did);
  }
}

export default  new SaveDataModel();