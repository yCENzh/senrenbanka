// routes/saveRoutes.js
import express from 'express';
import saveController from '../controllers/saveController.js';
const router = express.Router();



// 获取所有存档 *
router.get('/getAllSaveData', saveController.getAllSaves);

// 获取所有剧情 *
router.get('/getAllDialog',saveController.getAllPlot);

// 获取所有剧情分支 *
router.get('/getJump',saveController.getAllJump)

// 保存存档
router.post('/saveData', saveController.updateSave);

// 复制存档
router.post('/copySaveData',saveController.copySaveData)

// 清除存档
router.post('/clearSaveData',saveController.clearSaveData)

// 将存档1覆盖到存档2上，并清除存档1
router.post('/moveSaveData',saveController.moveSaveData)

// 修改存档备注&评论
router.post('/commentChange',saveController.commentChange)

// 获取游戏起始点
router.get('/config/start', saveController.getStartPlot);

export default router;