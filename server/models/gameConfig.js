// models/gameConfig.model.js
// 实现游戏初始化继续游戏需要的配置，目前只有plot_id
import pool from '../config/database.js';
class GameConfigModel {
  async getStartPlot() {
    const [rows] = await pool.execute('SELECT start FROM game_config LIMIT 1');
    return rows[0]?.start;
  }
}

export default  new GameConfigModel();