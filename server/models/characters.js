// models/characters.model.js
import pool from '../config/database.js';


class CharactersModel {
  // 角色表的Did与save_data的Did保持一致（通过外键关联，无需单独生成）
  async createCharacter(saveDid, appearanceData) {  // 传入save_data的Did
    await pool.execute(
      'INSERT INTO characters (Did, appearance_data) VALUES (?, ?)',
      [saveDid, appearanceData]  // 直接使用save_data的Did作为主键
    );
    return this.getCharacterByDid(saveDid);
  }

  async getCharacterByDid(Did) {
    const [rows] = await pool.execute('SELECT * FROM characters WHERE Did = ?', [Did]);
    return rows[0];
  }

  async updateCharacter(Did, appearanceData) {
    await pool.execute(
      'UPDATE characters SET appearance_data = ? WHERE Did = ?',
      [appearanceData, Did]
    );
    return this.getCharacterByDid(Did);
  }
}

export default  new CharactersModel();