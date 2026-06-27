// services/saveService.js
import saveDataModel from '../models/saveData.js';
import jumpDataModel from '../models/jump.js';
import mainModel from '../models/main.js';
import PlotDataModel from '../models/plotData.js';
import gameConfigModel from '../models/gameConfig.js';

class SaveService {
  async createSave(plot_id, characterData) {
    // 1. 创建存档，获取自动生成的Did
    const [saveResult] = await pool.execute(
      'INSERT INTO save_data (plot_id) VALUES (?)',
      [plot_id]
    );
    const saveDid = saveResult.insertId;  // 自增主键

    // 2. 若有角色数据，使用saveDid创建角色记录
    if (characterData) {
      await pool.execute(
        'INSERT INTO characters (Did, appearance_data) VALUES (?, ?)',
        [saveDid, characterData]
      );
    }

    return this.getSaveDetails(saveDid);
  }

  async getSaveDetails(Did) {
    // 根据收到的Did传递指定存档的信息:chpater,background,plot_id,Did,timestamp,comment
    const save = await saveDataModel.getSaveById(Did);
    if (!save) throw new Error('存档不存在');
    
    const plot = await mainModel.getPlotById(save.plot_id);
    // const character = await charactersModel.getCharacterByDid(Did);
    
    return {
      ...save,
        chapter: plot.chapter,
        background: plot.background
    };
  }

  async getSaveData(Did){
    const save = await saveDataModel.getSaveById(Did);
    if (!save) throw new Error('存档不存在');
    return {
      ...save
    }
  }

  async getAllSaves() {
    // 初始化，传递所有存档信息
    const saves = await saveDataModel.getAllSaves();
    
    return Promise.all(saves.map(async save => {
      const plot = await mainModel.getPlotById(save.plot_id);
      if(plot){
        return {
          ...save,
            chapter: plot.chapter ,
            background: plot.background ,
        };
      }else{
        return {
          ...save,
            chapter: "1-1" ,
            background: '' ,
        };

      }
      
   
    }));
  }

  async getAllPlot() {
    // 初始化，传递所有剧情信息
    const plots = await PlotDataModel.getAllPlot();
    
    return Promise.all(plots.map(async plot => {
      const mplot = await mainModel.getPlotById(plot.plot_id);
      return {
        ...plot,
        chapter:mplot.chapter,
        background: mplot.background
      };
    }));
  }

  async getAllJump(){
    // 初始化，传递所有剧情分支
    const jumps = await jumpDataModel.getAllJump();
    
    return Promise.all(jumps.map(async jump => {
      
      return {
        ...jump
      };
    }));
  }

  async updateSave(plot_id, timestamp, comment, stroyArc ,Did) {
    // 修改存档
    await saveDataModel.updateSave(plot_id, timestamp, comment, stroyArc, Did);
    console.log("修改数据");
  }

  async updateSaveComment(comment,Did,timestamp) {
    await saveDataModel.updateSaveComment(comment, Did,timestamp);
  }
  // 修改存档评论

  async deleteSave(Did) {
    return await saveDataModel.deleteSave(Did);
  }

  async getStartPlot() {
    return await gameConfigModel.getStartPlot();
  }

  async clearSaveData(Did){
    // 清除指定存档
    await saveDataModel.clearSaveData(Did);
  }

  async moveSaveData(Did1,Did2){
    // 将存档1覆盖到存档2上，并清除存档1
    
  }
}

export default  new SaveService();