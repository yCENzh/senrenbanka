import { defineStore } from 'pinia';
import { ref, nextTick } from 'vue';
import eventBus from '/src/components/event-bus.js';


//本来该位置写了一些还没后端连接时的测试数据，后来连上了就删掉了，git回退版本我怕其它的也回退了就这样吧^^
//你可以根据数据库长什么样子自己重写一下。SaveItemsMockData ,DialogItemsMockData, JumpItemsMockData。就这三个。

const mockenv = false;    //是否是测试开发环境（false需要连接后端，true是开发环境使用测试数据mockdata。）


const readLogList = [];
const GlobeTransmitItemsMockData = [             //全局传递数据
  {
    currentPlotId: 0,         //当前剧情ID
    currentBackground: 0,     //当前背景（传的时候方便点，不然反复用plotid在主剧情表里索引开销太大了，存档页最好不要用到主剧情表数据）
    currentChapter: 0,        //同上但是为当前章节
    readLogList: readLogList, //文本回顾界面，读档时清空重置
    currentStoryArc: 0,       //用来标记当前世界线用的，目前没有一直用到这个数据，当不存在吧。
    isInDialog: 0,            //是否在对话剧情页中，在的话存档读档表的返回界面按钮会有变化
    isOpShow: true,           //是否已经播放过了op
    isButtonBarFixed:false,   //对话剧情页按纽栏是否锁定
    volume:100,               //全局音量大小
  }
];

export const useDataStore = defineStore('data', {
  state: () => ({
    SaveItems: ref([]),               //存档页使用
    DialogItems: ref([]),             //主索引剧情
    GlobeTransmitItems: ref(GlobeTransmitItemsMockData),       //全局传递数据使用
    JumpItems: ref([]),       //跳转表使用
    loading: true,
    error: null,
  }),
  actions: {
    // 获取数据（根据环境决定使用mock或真实API）
    async fetchSaveItems() {
      this.loading = true;
      try {
        // 开发环境使用mock数据，生产环境使用真实API
        const data = mockenv ? SaveItemsMockData : await this.fetchFromApi(0);
        this.SaveItems = data;
        return data;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

  

    async fetchDialogItems() {
      this.loading = true;
      try {
        // 开发环境使用mock数据，生产环境使用真实API
        const data = mockenv ? DialogItemsMockData : await this.fetchFromApi(1);
        this.DialogItems = data;
        console.log('开始加载DialogMockData');
        return data;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchJumpItems() {
      this.loading = true;
      try {
        // 开发环境使用mock数据，生产环境使用真实API
        const data = mockenv ? JumpItemsMockData : await this.fetchFromApi(2);
        this.JumpItems = data;
        console.log('开始加载JumpMockData');
        return data;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },



    // 真实API请求（生产环境使用）
    async fetchFromApi(index) {
      let endpoint;
      switch (index) {
        case 0: endpoint = 'getAllSaveData'; break;
        case 1: endpoint = 'getAllDialog'; break;
        case 2: endpoint = 'getJump'; break;
        default: throw new Error(`不支持的index: ${index}`);
      }

      const res = await fetch(`/api/${endpoint}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(`API请求失败: ${res.status} ${err.error || ''}`);
      }
      return res.json();
    }
  }
});


export const postData = async (index, data) => {
  let endpoint;
  switch (index) {
    case 0: endpoint = 'saveData'; break;
    case 1: endpoint = 'copySaveData'; break;
    case 2: endpoint = 'moveSaveData'; break;
    case 3: endpoint = 'commentChange'; break;
    case 4: endpoint = 'clearSaveData'; break;
    default: throw new Error(`不支持的index: ${index}`);
  }

  const res = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`API请求失败: ${res.status} ${err.error || ''}`);
  }
  return res.json();
}




export const useAudioStore = defineStore('audio', () => {
  // 音频引用和状态
  const audio1 = ref(null);
  const audio2 = ref(null);
  const audio3 = ref(null);
  const audio4 = ref(null);
  const sound1 = ref('');
  const sound2 = ref('');
  const voice = ref('');
  const bgm = ref('');
  
  // 定义音量的 getter/setter
  const _currentVolume = ref(1);
  const currentVolume = {
    get value() {
      return _currentVolume.value;
    },
    set value(val) {
      _currentVolume.value = Math.min(1, Math.max(0, val));
    }
  };

  // 定义音量控制函数
  const setAudioVolume = (audioElement, volume) => {
    if (audioElement && audioElement.value) {
      audioElement.value.volume = Math.min(1, Math.max(0, volume));
    }
  };

  // 背景音乐淡出函数
  const fadeOutBGM = () => {
    return new Promise((resolve) => {
      if (!audio4.value || audio4.value.paused) {
        resolve();
        return;
      }

      const fadeOut = setInterval(() => {
        if (audio4.value.volume > 0.1) {
          setAudioVolume(audio4, audio4.value.volume - 0.1);
        } else {
          audio4.value.pause();
          clearInterval(fadeOut);
          resolve();
        }
      }, 50);
    });
  };

  // 背景音乐淡入函数
  const fadeInBGM = async () => {
    if (!audio4.value) return;
    
    setAudioVolume(audio4, 0);
    try {
      await audio4.value.play();
      const fadeIn = setInterval(() => {
        if (audio4.value.volume < currentVolume.value) {
          setAudioVolume(audio4, audio4.value.volume + 0.1);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    } catch (err) {
      console.error('播放失败:', err);
    }
  };

  // 初始化事件监听（store 是单例，直接注册即可）
  eventBus.$on('set-sound1', async (params) => {
    sound1.value = params;
    await nextTick();
    audio1.value?.play().catch(err => {
      console.error('播放失败:', err);
    });
  });

  eventBus.$on('set-sound2', async (params) => {
    sound2.value = params;
    await nextTick();
    audio2.value?.play().catch(err => {
      console.error('播放失败:', err);
    });
  });

  eventBus.$on('set-voice', async (params) => {
    voice.value = params;
    await nextTick();
    audio3.value?.play().catch(err => {
      console.error('播放失败:', err);
    });
  });

  eventBus.$on('set-bgm', async (params) => {
    if(bgm.value===params) return null;
    await fadeOutBGM();
    bgm.value = params;
    await nextTick();
    await fadeInBGM();
  });

  eventBus.$on('set-volume', (volume) => {
    console.log('设置音量:', volume);
    currentVolume.value = volume;
    setAudioVolume(audio1, currentVolume.value);
    setAudioVolume(audio2, currentVolume.value);
    setAudioVolume(audio3, currentVolume.value);
    setAudioVolume(audio4, currentVolume.value);
  });

  return {
    audio1, audio2, audio3, audio4,
    sound1, sound2, voice, bgm,
    currentVolume
  };
});  