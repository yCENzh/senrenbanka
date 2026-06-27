// models/plotData.model.js
import pool from '../config/database.js';
class PlotDataModel{
    async getAllPlot(){
    //获取所有剧情
    const [rows] = await pool.execute('SELECT * FROM plot');
    return rows;
  }
}
export default  new PlotDataModel();