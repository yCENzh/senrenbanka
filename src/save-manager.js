import { plot, main, jump } from './game-data.js';

// Default empty save slot
const EMPTY_SAVE = {
  plot_id: -1,
  timestamp: null,
  comment: null,
  stroyArc: null,
};

export class SaveManager {
  constructor(state, env) {
    this.state = state;
    this.storage = state.storage;
    this.initPromise = null;
  }

  async ensureInit() {
    if (this.initPromise) return this.initPromise;
    this.initPromise = this._doInit();
    return this.initPromise;
  }

  async _doInit() {
    const existing = await this.storage.get('game:plot');
    if (existing) return; // already initialized

    // Store game content
    await this.storage.put({
      'game:plot': plot,
      'game:main': main,
      'game:jump': jump,
      'game:config': { start: 0 },
    });

    // Initialize 128 empty save slots
    const batch = {};
    for (let i = 1; i <= 128; i++) {
      batch[`save:${i}`] = { ...EMPTY_SAVE };
    }
    await this.storage.put(batch);
  }

  async fetch(request) {
    await this.ensureInit();

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // GET endpoints
      if (request.method === 'GET') {
        if (path === '/api/getAllSaveData') return await this.getAllSaves();
        if (path === '/api/getAllDialog') return await this.getAllDialog();
        if (path === '/api/getJump') return await this.getJump();
        if (path === '/api/config/start') return await this.getStartPlot();
      }

      // POST endpoints
      if (request.method === 'POST') {
        const body = await request.json();
        if (path === '/api/saveData') return await this.updateSave(body);
        if (path === '/api/copySaveData') return await this.copySave(body);
        if (path === '/api/moveSaveData') return await this.moveSave(body);
        if (path === '/api/clearSaveData') return await this.clearSave(body);
        if (path === '/api/commentChange') return await this.commentChange(body);
      }

      return Response.json({ error: 'Not found' }, { status: 404 });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

  // --- GET handlers ---

  async getAllSaves() {
    const keys = Array.from({ length: 128 }, (_, i) => `save:${i + 1}`);
    const entries = await this.storage.get(keys);
    const saves = [];
    for (const key of keys) {
      saves.push(entries.get(key) || { ...EMPTY_SAVE });
    }
    return Response.json(saves);
  }

  async getAllDialog() {
    const gamePlot = await this.storage.get('game:plot');
    const gameMain = await this.storage.get('game:main');

    const mainMap = new Map();
    for (const m of gameMain) {
      mainMap.set(m.plot_id, m);
    }

    const merged = gamePlot.map((p) => {
      const m = mainMap.get(p.plot_id);
      return {
        ...p,
        background: m ? m.background : '',
        chapter: m ? m.chapter : '1-1',
      };
    });

    return Response.json(merged);
  }

  async getJump() {
    const gameJump = await this.storage.get('game:jump');
    return Response.json(gameJump);
  }

  async getStartPlot() {
    const config = await this.storage.get('game:config');
    return Response.json({ startPlotId: config.start });
  }

  // --- POST handlers ---

  async updateSave(body) {
    const { Did, plot_id, timestamp, comment, stroyArc } = body;
    await this.storage.put(`save:${Did}`, {
      plot_id,
      timestamp,
      comment,
      stroyArc,
    });
    return Response.json({ message: '保存成功' });
  }

  async copySave(body) {
    const { Did1, Did2, timestamp } = body;
    if (Did1 === Did2) {
      return Response.json({ error: 'Cannot copy to the same save' }, { status: 400 });
    }
    const save1 = await this.storage.get(`save:${Did1}`);
    if (!save1) {
      return Response.json({ error: 'Source save not found' }, { status: 404 });
    }
    await this.storage.put(`save:${Did2}`, {
      plot_id: save1.plot_id,
      timestamp,
      comment: save1.comment,
      stroyArc: save1.stroyArc,
    });
    return Response.json({ message: '存档覆盖成功' });
  }

  async moveSave(body) {
    const { Did1, Did2, timestamp } = body;
    if (Did1 === Did2) {
      return Response.json({ error: 'Cannot move to the same save' }, { status: 400 });
    }
    const save1 = await this.storage.get(`save:${Did1}`);
    if (!save1) {
      return Response.json({ error: 'Source save not found' }, { status: 404 });
    }
    await this.storage.put(`save:${Did2}`, {
      plot_id: save1.plot_id,
      timestamp,
      comment: save1.comment,
      stroyArc: save1.stroyArc,
    });
    // Clear source
    await this.storage.put(`save:${Did1}`, { ...EMPTY_SAVE });
    return Response.json({ message: '移动成功' });
  }

  async clearSave(body) {
    const { Did } = body;
    await this.storage.put(`save:${Did}`, { ...EMPTY_SAVE });
    return Response.json({ message: '清除成功' });
  }

  async commentChange(body) {
    const { Did, comment, timestamp } = body;
    const save = await this.storage.get(`save:${Did}`);
    if (!save) {
      return Response.json({ error: 'Save not found' }, { status: 404 });
    }
    save.comment = comment;
    save.timestamp = timestamp;
    await this.storage.put(`save:${Did}`, save);
    return Response.json({ message: '修改评论成功' });
  }
}
