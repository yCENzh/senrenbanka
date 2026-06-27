// controllers/saveController.js
import saveService from '../services/saveService.js';

class SaveController {
  async createSave(req, res) {
    console.log("请求创建存档")
    try {
      const { plot_id, characterData } = req.body;
      const save = await saveService.createSave(plot_id, characterData);
      res.status(201).json(save);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSave(req, res) {
    //获取指定存档
    try {
      const { Did } = req.body;
      const save = await saveService.getSaveDetails(Did);
      res.json(save);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllSaves(req, res) {
    //获取全部存档
    console.log("收到全部存档请求")
    try {
      const saves = await saveService.getAllSaves();
      console.log("saves");
      res.json(saves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSave(req, res) {
    //更新存档（这里前端是创建）
    try {
      const { Did,plot_id, timestamp,comment,stroyArc} = req.body;
      console.log(plot_id);
      const save = await saveService.updateSave(plot_id, timestamp, comment , stroyArc ,Did);
      return res.status(200).json({
        message:"保存成功"
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSave(req, res) {
    try {
      const Did = parseInt(req.params.Did);
      await saveService.deleteSave(Did);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStartPlot(req, res) {
    try {
      const startPlotId = await saveService.getStartPlot();
      res.json({ startPlotId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async copySaveData(req,res){
    //将Did1的信息覆盖到Did2
    //Did1=>Di2
    const { Did1,Did2,timestamp} = req.body;
    if (Did1 === Did2) {
      return res.status(400).json({ error: 'Cannot exchange the same save' });
    }
    const save1 = await saveService.getSaveData(Did1);
    const save2 = await saveService.getSaveData(Did2);
    if (!save1 || !save2) {
      return res.status(404).json({ error: 'One or both saves not found' });
    }
    console.log("准备");
    const a= await saveService.updateSave( save1.plot_id, timestamp, save1.comment,save1.stroyArc, Did2);
    console.log("完成");
    return res.status(200).json({
      message:"存档覆盖成功"
    });
  }

  async getAllPlot(req,res){
    //获取所有剧情顺序
    console.log("收到全部剧情请求")
    try {
      const plots = await saveService.getAllPlot();
      console.log("plots");
      res.json(plots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllJump (req, res){
    //获取所有剧情分支
    console.log("收到全部剧情分支请求")
    try {
      const jumps = await saveService.getAllJump();
      console.log("jumps");
      res.json(jumps);
    } catch (error) {
      res.status(600).json({ error: error.message });
    }
  }

  async commentChange (req, res){
    //修改评论&备注
    const { Did,comment,timestamp} = req.body;
    await saveService.updateSaveComment(comment,Did,timestamp);
      res.status(200).json({
      message:"修改评论成功"
    });
    } catch (error) {
      res.status(400).json({ error: error.message });
    
  }

  async clearSaveData(req, res){
    // 清除某个存档
    const {Did} = req.body;
    await saveService.clearSaveData(Did)
    res.status(200).json({
      message:"清除成功"
    });
    
  }

  async moveSaveData(req,res){
    // 将存档1覆盖到存档2上，并清除存档1
    const { Did1,Did2,timestamp} = req.body;
    if (Did1 === Did2) {
      return res.status(400).json({ error: 'Cannot the same save' });
    }
    const save1 = await saveService.getSaveData(Did1);
    const save2 = await saveService.getSaveData(Did2);
    if (!save1 || !save2) {
      return res.status(404).json({ error: 'One or both saves not found' });
    }
    await saveService.updateSave( save1.plot_id, timestamp, save1.comment,save1.stroyArc, Did2);

    //清除Did1
    await saveService.clearSaveData(Did1);
    res.status(200).json({
      message:"移动成功"
    });
  }
}
export default new SaveController();