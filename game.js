'use strict';

const $ = (id) => document.getElementById(id);
const SAVE_KEY = 'crystal_saga_save_v1';

const CLASSES = {
  knight: {
    name: '艾德',
    job: '剑士',
    color: '#d96a4e',
    hp: [44, 9],
    mp: [4, 1],
    atk: [10, 3],
    def: [9, 2],
    mag: [3, 1],
    spr: [6, 1],
    spd: [7, 1],
    weapon: 'iron_sword',
    armor: 'cloth',
    skills: ['slash', 'guard'],
    unarmed: 4
  },
  priest: {
    name: '米拉',
    job: '白魔导士',
    color: '#5fbfa9',
    hp: [36, 7],
    mp: [18, 3],
    atk: [6, 1],
    def: [6, 1],
    mag: [10, 3],
    spr: [10, 2],
    spd: [6, 1],
    weapon: 'wood_staff',
    armor: 'cloth',
    skills: ['cure', 'cura', 'raise'],
    unarmed: 2
  },
  mage: {
    name: '洛根',
    job: '黑魔导士',
    color: '#4d86c7',
    hp: [31, 6],
    mp: [20, 4],
    atk: [5, 1],
    def: [5, 1],
    mag: [13, 4],
    spr: [8, 2],
    spd: [8, 1],
    weapon: 'wood_staff',
    armor: 'cloth',
    skills: ['fire', 'blizzard', 'thunder'],
    unarmed: 1
  },
  monk: {
    name: '林',
    job: '武僧',
    color: '#d5a04a',
    hp: [50, 10],
    mp: [6, 1],
    atk: [11, 4],
    def: [7, 1],
    mag: [3, 1],
    spr: [7, 1],
    spd: [10, 2],
    weapon: 'knuckles',
    armor: 'cloth',
    skills: ['punch', 'focus'],
    unarmed: 5
  },
  red_mage: {
    name: '爱萝',
    job: '红魔导士',
    color: '#d23a6e',
    hp: [38, 7],
    mp: [16, 3],
    atk: [9, 2],
    def: [6, 1],
    mag: [11, 2],
    spr: [7, 1],
    spd: [7, 1],
    weapon: 'rapier',
    armor: 'cloth',
    skills: ['fire', 'slash', 'cure'],
    unarmed: 3
  },
  paladin: {
    name: '凯恩',
    job: '圣骑士',
    color: '#7fae8b',
    hp: [52, 10],
    mp: [10, 2],
    atk: [9, 1],
    def: [10, 3],
    mag: [3, 1],
    spr: [9, 2],
    spd: [5, 1],
    weapon: 'holy_mace',
    armor: 'chain',
    skills: ['smite', 'guard', 'cure'],
    unarmed: 4
  },
  ninja: {
    name: '影',
    job: '盗贼忍者',
    color: '#6f7cae',
    hp: [36, 6],
    mp: [14, 2],
    atk: [11, 3],
    def: [4, 1],
    mag: [4, 1],
    spr: [5, 1],
    spd: [12, 2],
    weapon: 'shuriken',
    armor: 'cloth',
    skills: ['double', 'thunder', 'focus'],
    unarmed: 4
  },
  dragoon: {
    name: '希尔',
    job: '龙骑士',
    color: '#3f8fa8',
    hp: [50, 10],
    mp: [8, 1],
    atk: [12, 3],
    def: [8, 1],
    mag: [2, 1],
    spr: [5, 1],
    spd: [9, 1],
    weapon: 'dragon_lance',
    armor: 'leather',
    skills: ['jump', 'guard', 'focus'],
    unarmed: 5
  },
  summoner: {
    name: '菲亚',
    job: '召唤师',
    color: '#a878d8',
    hp: [28, 8],
    mp: [28, 6],
    atk: [4, 1],
    def: [3, 1],
    mag: [16, 5],
    spr: [12, 2],
    spd: [6, 1],
    weapon: 'aether_staff',
    armor: 'robe',
    skills: ['thunderbolt', 'fire', 'cura'],
    unarmed: 1
  },
  bard: {
    name: '路西',
    job: '吟游诗人',
    color: '#e0a763',
    hp: [34, 7],
    mp: [18, 4],
    atk: [6, 1],
    def: [5, 1],
    mag: [9, 2],
    spr: [10, 2],
    spd: [9, 1],
    weapon: 'harp',
    armor: 'cloth',
    skills: ['focus', 'cure', 'arena'],
    unarmed: 2
  },
  geomancer: {
    name: '岩',
    job: '风水术师',
    color: '#7c9a53',
    hp: [46, 9],
    mp: [12, 2],
    atk: [8, 1],
    def: [9, 2],
    mag: [10, 2],
    spr: [9, 2],
    spd: [6, 1],
    weapon: 'earth_rod',
    armor: 'leather',
    skills: ['quake', 'guard', 'cure'],
    unarmed: 3
  },
  alchemist: {
    name: '露琪',
    job: '炼金术士',
    color: '#8fcb7a',
    hp: [36, 7],
    mp: [16, 3],
    atk: [7, 1],
    def: [6, 1],
    mag: [12, 3],
    spr: [9, 2],
    spd: [8, 1],
    weapon: 'spirit_rod',
    armor: 'robe',
    skills: ['chemical', 'fire', 'cure'],
    unarmed: 2
  }
};

const SKILLS = {
  slash: { name: '斩击', kind: 'attack', power: 1.25, cost: 0, target: 'enemy', desc: '强力单体斩击' },
  guard: { name: '守护', kind: 'defend', power: 0.5, cost: 0, target: 'self', desc: '本回合受到伤害减半' },
  punch: { name: '崩拳', kind: 'attack', power: 1.6, cost: 0, target: 'enemy', desc: '无视一半防御' },
  focus: { name: '蓄力', kind: 'buff', power: 1.7, cost: 0, target: 'self', desc: '下一次物理攻击伤害提高' },
  fire: { name: '火焰', kind: 'magic', power: 1.5, cost: 5, target: 'enemy', desc: '火属性单体魔法' },
  blizzard: { name: '冰霜', kind: 'magic', power: 1.5, cost: 5, target: 'enemy', desc: '冰属性单体魔法' },
  thunder: { name: '雷电', kind: 'magic', power: 1.7, cost: 7, target: 'enemy', desc: '雷属性单体魔法' },
  cure: { name: '治疗', kind: 'heal', power: 2.0, cost: 5, target: 'ally', desc: '回复一名队友' },
  cura: { name: '全愈', kind: 'heal', power: 3.2, cost: 14, target: 'all_ally', desc: '回复全体队友' },
raise: { name: '复苏', kind: 'revive', power: 0.5, cost: 12, target: 'ally', desc: '复活一名倒下的队友' },
  smite: { name: '圣光斩', kind: 'attack', power: 1.7, cost: 0, target: 'enemy', desc: '圣骑士的强力单体斩击' },
  double: { name: '影连击', kind: 'attack', power: 1.15, cost: 0, target: 'enemy', desc: '两次快速的忍刀攻击' },
  jump: { name: '跳跃', kind: 'attack', power: 1.9, cost: 0, target: 'enemy', desc: '跃空坠落的强力突刺' },
  thunderbolt: { name: '召唤·雷霆', kind: 'magic', power: 2.3, cost: 12, target: 'enemy', desc: '召来轰雷轰击单体敌人' },
  arena: { name: '鼓舞之声', kind: 'buff', power: 1.6, cost: 0, target: 'ally', desc: '为一名队友增强下一次魔法攻击' },
  quake: { name: '大地震', kind: 'magic', power: 1.8, cost: 8, target: 'enemy', desc: '震荡大地打击敌人' },
  chemical: { name: '腐蚀药剂', kind: 'magic', power: 1.9, cost: 7, target: 'enemy', desc: '洒出腐蚀性药剂' }
};

const WEAPONS = {
  iron_sword: { name: '铁剑', power: 7, cost: 220, jobs: ['knight'], mag: 0, desc: '剑士的起点武器' },
  mythril_sword: { name: '秘银剑', power: 14, cost: 900, jobs: ['knight'], mag: 0, desc: '锋利的秘银长剑' },
  flame_sword: { name: '烈焰剑', power: 21, cost: 2200, jobs: ['knight'], mag: 0, desc: '缠绕火焰的传说剑' },
  wood_staff: { name: '木杖', power: 4, cost: 90, jobs: ['priest', 'mage'], mag: 4, desc: '普通施法杖' },
  mythril_staff: { name: '秘银杖', power: 8, cost: 800, jobs: ['priest', 'mage'], mag: 9, desc: '强化魔法威力' },
  sage_staff: { name: '贤者之杖', power: 14, cost: 2100, jobs: ['priest', 'mage'], mag: 15, desc: '贤者的高阶法杖' },
  knuckles: { name: '铁拳套', power: 8, cost: 260, jobs: ['monk'], mag: 0, desc: '武僧专用拳套' },
  mythril_knuckles: { name: '秘银拳套', power: 16, cost: 1000, jobs: ['monk'], mag: 0, desc: '轻而致命的拳套' },
  rapier: { name: '刺剑', power: 9, cost: 420, jobs: ['red_mage'], mag: 2, desc: '红魔导士的轻盈长剑' },
  mythril_rapier: { name: '秘银刺剑', power: 16, cost: 1500, jobs: ['red_mage'], mag: 4, desc: '集物理与魔法于一身' },
  holy_mace: { name: '圣光权杖', power: 8, cost: 400, jobs: ['paladin'], mag: 0, desc: '圣骑士的沉重权杖' },
  mythril_mace: { name: '秘银权杖', power: 15, cost: 1400, jobs: ['paladin'], mag: 0, desc: '沉重有力的秘银锤' },
  shuriken: { name: '手里剑', power: 6, cost: 300, jobs: ['ninja'], mag: 0, ranged: true, desc: '飞掷的暗刃，快速消耗' },
  mythril_shuriken: { name: '秘银手里剑', power: 13, cost: 1100, jobs: ['ninja'], mag: 0, ranged: true, desc: '淬炼的暗器' },
  dragon_lance: { name: '龙枪', power: 12, cost: 700, jobs: ['dragoon'], mag: 0, desc: '龙骑士的长枪' },
  mythril_lance: { name: '秘银龙枪', power: 20, cost: 1800, jobs: ['dragoon'], mag: 0, desc: '足以贯穿龙鳞' },
  aether_staff: { name: '以太魔杖', power: 6, cost: 750, jobs: ['summoner'], mag: 12, desc: '引导强大召唤的魔杖' },
  void_staff: { name: '虚空之杖', power: 10, cost: 2400, jobs: ['summoner'], mag: 20, desc: '召唤高阶存在的魔杖' },
  harp: { name: '竖琴', power: 5, cost: 360, jobs: ['bard'], mag: 2, desc: '吟游诗人的旋律之琴' },
  golden_harp: { name: '黄金竖琴', power: 8, cost: 1200, jobs: ['bard'], mag: 5, desc: '金弦振动的圣音' },
  earth_rod: { name: '地脉棒', power: 6, cost: 450, jobs: ['geomancer'], mag: 5, desc: '沟通大地之力的棒杖' },
  geomancer_staff: { name: '源灵杖', power: 9, cost: 1600, jobs: ['geomancer'], mag: 10, desc: '蕴含大地的生命脉动' },
  spirit_rod: { name: '炼魂杖', power: 6, cost: 420, jobs: ['alchemist'], mag: 6, desc: '调和药剂的符杖' },
  mythril_rod: { name: '秘银炼金棒', power: 10, cost: 1500, jobs: ['alchemist'], mag: 12, desc: '高级炼金器材' }
};

const ARMORS = {
  cloth: { name: '布衣', def: 2, cost: 60, desc: '最普通的防护' },
  leather: { name: '皮甲', def: 5, cost: 180, desc: '轻便的皮甲' },
  chain: { name: '锁子甲', def: 9, cost: 520, desc: '可靠的链甲' },
  plate: { name: '板甲', def: 14, cost: 1400, desc: '厚重板甲' },
  robe: { name: '术士长袍', def: 4, cost: 300, mag: 4, desc: '提升魔法威力的长袍' },
  sage_robe: { name: '贤者长袍', def: 8, cost: 1500, mag: 8, desc: '贤者留下的长袍' },
  mythril_plate: { name: '秘银战甲', def: 18, cost: 1900, desc: '秘银锻造的战甲' }
};

const ITEMS = {
  potion: { name: '药水', desc: '回复 80 HP', cost: 50, kind: 'heal', power: 80 },
  hi_potion: { name: '高级药水', desc: '回复 220 HP', cost: 240, kind: 'heal', power: 220 },
  ether: { name: '以太', desc: '回复 50 MP', cost: 140, kind: 'ether', power: 50 },
  phoenix: { name: '不死鸟之尾', desc: '复活并回复 50% HP', cost: 500, kind: 'revive', power: 0.5 },
  smoke: { name: '烟雾弹', desc: '必定脱离战斗', cost: 120, kind: 'escape', power: 0 },
  exp_scroll: { name: '经验卷轴', desc: '指定角色获得 500 经验', cost: 30, currency: 'gem', kind: 'exp', power: 500 },
  gold_pouch: { name: '金币袋', desc: '获得 1000 金币', cost: 20, currency: 'gem', kind: 'gold', power: 1000 }
};

// 可在旅店用金币招募的扩展职业（对应 CLASSES 中的 id，按推荐获取顺序排列）
const RECRUITABLE = ['red_mage', 'alchemist', 'bard', 'geomancer', 'ninja', 'paladin', 'dragoon', 'summoner'];

// 各扩展职业的招募费用（金币，直接购买力，非抽卡）
const RECRUIT_COSTS = {
  red_mage: 800,
  alchemist: 900,
  bard: 950,
  geomancer: 1000,
  ninja: 1200,
  paladin: 1400,
  dragoon: 1600,
  summoner: 2000
};

// 旅店休息费用：当前持有金币的 1%，下限 1、上限 200
const INN_REST_COST_RATE = 0.01;
const INN_REST_COST_MIN = 1;
const INN_REST_COST_MAX = 200;

function innRestCost() {
  const raw = Math.floor(state.gold * INN_REST_COST_RATE);
  return Math.max(INN_REST_COST_MIN, Math.min(INN_REST_COST_MAX, raw));
}

function hasClass(id) {
  return state.party.some((m) => m.id === id) || state.roster.some((m) => m.id === id);
}

const ENEMY_SKILLS = {
  strike: { name: '冲撞', kind: 'attack', power: 1.0 },
  ember: { name: '火弹', kind: 'magic', power: 1.35 },
  smash: { name: '重击', kind: 'attack', power: 1.55 },
  inferno: { name: '狱炎', kind: 'magic', power: 1.9 },
  bite: { name: '撕咬', kind: 'attack', power: 1.2 },
  bubble: { name: '泡沫', kind: 'magic', power: 1.2 },
  tidal: { name: '巨浪', kind: 'magic', power: 1.8 },
  quake: { name: '崩土', kind: 'magic', power: 1.5 },
  curse: { name: '诅咒', kind: 'magic', power: 1.3 },
  gale: { name: '烈风', kind: 'magic', power: 1.45 },
  cleave: { name: '横扫', kind: 'attack', power: 1.4 },
  dark: { name: '暗影', kind: 'magic', power: 1.75 },
  void: { name: '虚无', kind: 'magic', power: 2.2 },
  chrono: { name: '时空炮', kind: 'magic', power: 2.0 }
};

const ENEMIES = {
  cinder: { name: '烬火软泥', hp: 70, mp: 8, atk: 13, def: 4, spr: 5, spd: 10, exp: 38, gold: 26, sprite: 'blob', skills: ['strike'] },
  fire_imp: { name: '火精', hp: 62, mp: 16, atk: 12, def: 3, spr: 7, spd: 13, exp: 46, gold: 32, sprite: 'imp', skills: ['strike', 'ember'] },
  lava_golem: { name: '熔岩魔像', hp: 128, mp: 0, atk: 18, def: 11, spr: 6, spd: 5, exp: 76, gold: 56, sprite: 'golem', skills: ['smash'] },
  ifrit: { name: '伊弗利特', hp: 430, mp: 50, atk: 25, def: 12, spr: 14, spd: 15, exp: 650, gold: 520, sprite: 'dragon', skills: ['smash', 'inferno'] },
  river_serpent: { name: '河蛇', hp: 76, mp: 10, atk: 15, def: 5, spr: 5, spd: 11, exp: 52, gold: 38, sprite: 'serpent', skills: ['bite', 'bubble'] },
  bubble_eye: { name: '泡眼兽', hp: 60, mp: 18, atk: 11, def: 3, spr: 9, spd: 9, exp: 48, gold: 34, sprite: 'blob', skills: ['bubble'] },
  sea_mage: { name: '海术士', hp: 72, mp: 34, atk: 10, def: 4, spr: 12, spd: 12, exp: 66, gold: 48, sprite: 'wraith', skills: ['bubble', 'tidal'] },
  leviathan: { name: '利维坦', hp: 500, mp: 60, atk: 27, def: 13, spr: 16, spd: 14, exp: 820, gold: 680, sprite: 'dragon', skills: ['bite', 'tidal'] },
  stone_beetle: { name: '石甲虫', hp: 110, mp: 0, atk: 14, def: 14, spr: 5, spd: 6, exp: 64, gold: 46, sprite: 'beetle', skills: ['smash'] },
  mud_ogre: { name: '泥巨人', hp: 150, mp: 0, atk: 20, def: 8, spr: 5, spd: 7, exp: 82, gold: 62, sprite: 'ogre', skills: ['smash', 'quake'] },
  sand_wraith: { name: '沙影', hp: 84, mp: 30, atk: 14, def: 5, spr: 13, spd: 14, exp: 74, gold: 54, sprite: 'wraith', skills: ['curse', 'quake'] },
  titan: { name: '泰坦', hp: 620, mp: 40, atk: 30, def: 20, spr: 14, spd: 10, exp: 980, gold: 820, sprite: 'golem', skills: ['smash', 'quake'] },
  harpy: { name: '哈比', hp: 82, mp: 12, atk: 17, def: 5, spr: 7, spd: 17, exp: 72, gold: 50, sprite: 'harpy', skills: ['strike', 'gale'] },
  storm_wisp: { name: '风暴灵', hp: 64, mp: 30, atk: 12, def: 4, spr: 13, spd: 18, exp: 68, gold: 44, sprite: 'wisp', skills: ['gale'] },
  wind_warrior: { name: '风铠兵', hp: 128, mp: 10, atk: 21, def: 10, spr: 8, spd: 13, exp: 88, gold: 66, sprite: 'knight', skills: ['strike', 'cleave'] },
  garuda: { name: '迦楼罗', hp: 560, mp: 50, atk: 29, def: 12, spr: 15, spd: 20, exp: 1050, gold: 880, sprite: 'harpy', skills: ['gale', 'cleave'] },
  demon_knight: { name: '恶魔骑士', hp: 180, mp: 24, atk: 27, def: 15, spr: 12, spd: 15, exp: 160, gold: 120, sprite: 'knight', skills: ['strike', 'cleave'] },
  nightmare: { name: '梦魇', hp: 150, mp: 50, atk: 22, def: 9, spr: 17, spd: 17, exp: 175, gold: 130, sprite: 'skull', skills: ['curse', 'dark'] },
  arch_demon: { name: '大恶魔', hp: 230, mp: 60, atk: 30, def: 13, spr: 18, spd: 16, exp: 230, gold: 180, sprite: 'arch', skills: ['dark', 'void'] },
  dark_lord: { name: '暗影君主', hp: 1500, mp: 120, atk: 40, def: 20, spr: 22, spd: 19, exp: 2600, gold: 2200, sprite: 'dragon', skills: ['dark', 'void', 'inferno'] },
  omega_eye: { name: '回廊之眼', hp: 260, mp: 40, atk: 32, def: 15, spr: 16, spd: 16, exp: 260, gold: 190, sprite: 'wisp', skills: ['dark', 'chrono'] },
  chrono_metal: { name: '时空机兵', hp: 360, mp: 30, atk: 38, def: 20, spr: 15, spd: 13, exp: 340, gold: 250, sprite: 'golem', skills: ['smash', 'chrono'] },
  omega: { name: '欧米伽', hp: 2400, mp: 100, atk: 50, def: 26, spr: 24, spd: 22, exp: 5000, gold: 3800, sprite: 'omega', skills: ['chrono', 'void', 'cleave'] }
};

const AREA_POOLS = {
  fire: ['cinder', 'fire_imp', 'cinder', 'lava_golem'],
  water: ['river_serpent', 'bubble_eye', 'sea_mage', 'river_serpent'],
  earth: ['stone_beetle', 'mud_ogre', 'sand_wraith', 'stone_beetle'],
  wind: ['harpy', 'storm_wisp', 'wind_warrior', 'harpy'],
  final: ['demon_knight', 'nightmare', 'arch_demon', 'demon_knight'],
  tower: ['omega_eye', 'chrono_metal', 'omega_eye']
};

const AREAS = {
  fire: {
    id: 'fire',
    name: '烈焰洞窟',
    type: 'dungeon',
    level: 3,
    steps: 4,
    boss: 'ifrit',
    pool: 'fire',
    desc: '火焰水晶被腐化的洞窟，首领是伊弗利特。',
    unlock: () => true
  },
  water: {
    id: 'water',
    name: '碧水神殿',
    type: 'dungeon',
    level: 6,
    steps: 5,
    boss: 'leviathan',
    pool: 'water',
    desc: '淹没在潮汐中的神殿，首领是利维坦。',
    unlock: () => state.flags.fire
  },
  earth: {
    id: 'earth',
    name: '黄土遗迹',
    type: 'dungeon',
    level: 10,
    steps: 5,
    boss: 'titan',
    pool: 'earth',
    desc: '沉睡大地之力的遗迹，首领是泰坦。',
    unlock: () => state.flags.water
  },
  wind: {
    id: 'wind',
    name: '疾风之塔',
    type: 'dungeon',
    level: 14,
    steps: 5,
    boss: 'garuda',
    pool: 'wind',
    desc: '高耸入云的风之塔，首领是迦楼罗。',
    unlock: () => state.flags.earth
  },
  final: {
    id: 'final',
    name: '暗之王座',
    type: 'dungeon',
    level: 20,
    steps: 6,
    boss: 'dark_lord',
    pool: 'final',
    desc: '主线终点，击败暗影君主并净化水晶。',
    unlock: () => state.flags.fire && state.flags.water && state.flags.earth && state.flags.wind
  },
  tower: {
    id: 'tower',
    name: '永恒回廊',
    type: 'tower',
    level: '∞',
    desc: '终盘无尽挑战，敌人随层数强化，每 5 层出现欧米伽。',
    unlock: () => state.flags.final
  }
};

const BOSS_REWARDS = {
  fire: { gold: 600, gems: 50, weapon: 'flame_sword' },
  water: { gold: 700, gems: 60, armor: 'sage_robe' },
  earth: { gold: 800, gems: 70, weapon: 'sage_staff' },
  wind: { gold: 900, gems: 80, armor: 'mythril_plate' },
  final: { gold: 1500, gems: 150 }
};

const IAP_PACKAGES = [
  { id: 'small', name: '小袋水晶', gems: 60, price: 6 },
  { id: 'large', name: '大袋水晶', gems: 300, price: 30 },
  { id: 'starter', name: '启程水晶包', gems: 120, price: 12 },
  { id: 'weekly', name: '周卡水晶包', gems: 300, price: 30 }
];

let state = null;
let explore = null;
let towerRun = null;
let battle = null;
let battleAction = null;
let battleMenu = 'command';
let battleTimer = null;
let currentTab = 'map';
let menuTab = 'party';
let shopTab = 'equip';
let toastTimer = null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function fmt(value) {
  return Math.floor(value).toLocaleString('en-US');
}

const ICONS = {
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  menu: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>',
  sword: '<path d="M14.5 3.5 20 9l-9 9-5.5-5.5z"/><path d="M6.5 13.5 3 17l4 4 3.5-3.5"/><path d="M14 4l2-2 6 6-2 2"/>',
  sparkles: '<path d="M12 3l1.9 5.7L19.6 10l-5.7 1.9L12 17.6l-1.9-5.7L4.4 10l5.7-1.9z"/><path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  backpack: '<path d="M6 7h12v14H6z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/><path d="M8 13h8M8 17h6"/>',
  gem: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21 8 9l4-6 4 6-4 12"/>',
  coins: '<circle cx="9" cy="9" r="6"/><path d="M18.4 7.6a6 6 0 1 1-8.8 8.8"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/>',
  shop: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
  'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  scroll: '<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h5"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>',
  tower: '<rect x="4" y="3" width="16" height="18"/><path d="M9 3v18M15 3v18M4 9h16M4 15h16"/>',
  flask: '<path d="M10 2v6L4 18a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L14 8V2"/><path d="M8 2h8"/>',
  bed: '<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18h18"/><path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/><path d="M6 10h12"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  package: '<path d="M16.5 9.4 7.5 4.2M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/>',
  star: '<polygon points="12 2 15.1 8.6 22 9.3 17 14 18.2 21 12 17.3 5.8 21 7 14 2 9.3 8.9 8.6 12 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><polyline points="21 3 21 8 16 8"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  down: '<polyline points="6 9 12 15 18 9"/>',
  up: '<polyline points="18 15 12 9 6 15"/>',
  'arrow-front': '<polyline points="15 18 21 12 15 6"/><line x1="3" y1="12" x2="21" y2="12"/>',
  'arrow-back': '<polyline points="9 18 3 12 9 6"/><line x1="21" y1="12" x2="3" y2="12"/>'
};

function icon(name, size = 18) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

function rnd(max) {
  return Math.floor(Math.random() * max);
}

function chance(rate) {
  return Math.random() < rate;
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function statsFor(member) {
  const cls = CLASSES[member.id];
  const lv = member.level - 1;
  const weapon = WEAPONS[weaponTypeOf(member)] || {};
  const armor = ARMORS[armorTypeOf(member)] || {};
  return {
    maxHp: cls.hp[0] + cls.hp[1] * lv,
    maxMp: cls.mp[0] + cls.mp[1] * lv,
    atk: cls.atk[0] + cls.atk[1] * lv + (weapon.power || cls.unarmed || 0),
    def: cls.def[0] + cls.def[1] * lv + (armor.def || 0),
    mag: cls.mag[0] + cls.mag[1] * lv + (weapon.mag || 0) + (armor.mag || 0),
    spr: cls.spr[0] + cls.spr[1] * lv,
    spd: cls.spd[0] + cls.spd[1] * lv
  };
}

// --------------------------------------------------------------------------
// 装备实例模型：每件武器/防具是唯一实例（uid），同一时刻只能被一名角色装备
// （1:1 关系）。state.weapons / state.armors 存 {uid, type} 列表，角色的
// member.weapon / member.armor 存对应实例 uid。
// --------------------------------------------------------------------------
function weaponTypeOf(member) {
  const inst = state && (state.weapons || []).find((w) => w.uid === member.weapon);
  return inst ? inst.type : CLASSES[member.id].weapon;
}

function armorTypeOf(member) {
  const inst = state && (state.armors || []).find((a) => a.uid === member.armor);
  return inst ? inst.type : CLASSES[member.id].armor;
}

function nextEquipUid(slot) {
  state.eid = (state.eid || 0) + 1;
  return `${slot === 'weapon' ? 'w' : 'a'}${state.eid}`;
}

function addWeaponInstance(type) {
  const inst = { uid: nextEquipUid('weapon'), type };
  state.weapons.push(inst);
  return inst;
}

function addArmorInstance(type) {
  const inst = { uid: nextEquipUid('armor'), type };
  state.armors.push(inst);
  return inst;
}

// 某个装备实例当前被谁装备（无则 null）
function equipOwner(slot, uid) {
  const all = [...state.party, ...state.roster];
  return all.find((m) => m[slot] === uid) || null;
}

// 给目标角色换装：新装备先由原主人卸下，再交给新主人（1:1 置换）
function assignEquip(member, slot, uid) {
  const all = [...state.party, ...state.roster];
  const prevOwner = all.find((m) => m !== member && m[slot] === uid);
  if (prevOwner) prevOwner[slot] = null;
  member[slot] = uid;
}

// 角色卸下装备后，为它找一个本职业默认装备的空闲实例；找不到则留空（用裸装属性）
function freeDefaultEquip(member, slot) {
  const list = slot === 'weapon' ? state.weapons : state.armors;
  const cls = CLASSES[member.id];
  const all = [...state.party, ...state.roster];
  const taken = new Set(all.map((m) => m[slot]));
  const defaultType = cls[slot];
  const inst = list.find((x) => x.type === defaultType && !taken.has(x.uid));
  member[slot] = inst ? inst.uid : null;
}


function expForNext(level) {
  return Math.floor(80 * Math.pow(1.38, level - 1));
}

function defaultState() {
  const weapons = [
    { uid: 'w1', type: 'iron_sword' },
    { uid: 'w2', type: 'wood_staff' },
    { uid: 'w3', type: 'wood_staff' },
    { uid: 'w4', type: 'knuckles' }
  ];
  const armors = [
    { uid: 'a1', type: 'cloth' },
    { uid: 'a2', type: 'cloth' },
    { uid: 'a3', type: 'cloth' },
    { uid: 'a4', type: 'cloth' }
  ];
  const party = [
    { id: 'knight', level: 1, exp: 0, hp: 0, mp: 0, weapon: 'w1', armor: 'a1', alive: true, buff: null, row: 'front' },
    { id: 'priest', level: 1, exp: 0, hp: 0, mp: 0, weapon: 'w2', armor: 'a2', alive: true, buff: null, row: 'front' },
    { id: 'mage', level: 1, exp: 0, hp: 0, mp: 0, weapon: 'w3', armor: 'a3', alive: true, buff: null, row: 'front' },
    { id: 'monk', level: 1, exp: 0, hp: 0, mp: 0, weapon: 'w4', armor: 'a4', alive: true, buff: null, row: 'front' }
  ];
  party.forEach((member) => {
    const stats = statsFor(member);
    member.hp = stats.maxHp;
    member.mp = stats.maxMp;
  });
  return {
    chapter: 1,
    gold: 150,
    gems: 120,
    eid: 4,
    items: { potion: 3, hi_potion: 0, ether: 1, phoenix: 0, smoke: 1, exp_scroll: 0, gold_pouch: 0 },
    weapons,
    armors,
    flags: { fire: false, water: false, earth: false, wind: false, final: false },
    tower: { best: 0 },
    party,
    roster: []
  };
}

// 迁移/规范化装备实例列表：旧存档 weapons/armors 是类型 id 字符串数组，统一转成 {uid,type} 实例
function normalizeEquipInstances(rawList, slot, baseList, eidRef) {
  const out = [];
  let maxSeq = 0;
  if (Array.isArray(rawList)) {
    rawList.forEach((entry, index) => {
      let inst;
      if (typeof entry === 'string') {
        inst = { uid: `${slot === 'weapon' ? 'w' : 'a'}${index + 1}`, type: entry };
      } else if (entry && typeof entry === 'object' && entry.type) {
        inst = { uid: entry.uid || `${slot === 'weapon' ? 'w' : 'a'}${index + 1}`, type: entry.type };
      }
      if (inst) {
        const seq = Number(String(inst.uid).replace(/[wa]/g, '')) || 0;
        if (seq > maxSeq) maxSeq = seq;
        out.push(inst);
      }
    });
  }
  if (out.length === 0) {
    baseList.forEach((inst, index) => out.push({ uid: inst.uid, type: inst.type }));
  }
  if (eidRef !== undefined && eidRef !== null) {
    const candidate = maxSeq + 1;
    if (Number(eidRef) <= candidate) eidRef = candidate;
  }
  return { list: out, eid: eidRef };
}

// 规范化某角色装备：weapon/armor 指向实例 uid；若还是旧的类型 id（字符串），
// 则找一件该类型且当前无人装备的空闲实例；找不到就新建一件（保证 1:1）
function normalizeMemberEquip(member, weapons, armors, takenW, takenA) {
  const pick = (list, uidOrType, taken, slot) => {
    if (uidOrType && list.some((x) => x.uid === uidOrType)) {
      taken.add(uidOrType);
      return uidOrType;
    }
    const type = typeof uidOrType === 'string' && (WEAPONS[uidOrType] || ARMORS[uidOrType])
      ? uidOrType
      : CLASSES[member.id][slot];
    const free = list.find((x) => x.type === type && !taken.has(x.uid));
    if (free) {
      taken.add(free.uid);
      return free.uid;
    }
    const inst = { uid: `${slot === 'weapon' ? 'w' : 'a'}${list.length + 1}`, type };
    list.push(inst);
    taken.add(inst.uid);
    return inst.uid;
  };
  member.weapon = pick(weapons, member.weapon, takenW, 'weapon');
  member.armor = pick(armors, member.armor, takenA, 'armor');
}

function normalizeState(raw) {
  const base = defaultState();
  if (!raw) return base;
  const weaponsNorm = normalizeEquipInstances(raw.weapons, 'weapon', base.weapons, raw.eid || 0);
  const armorsNorm = normalizeEquipInstances(raw.armors, 'armor', base.armors, weaponsNorm.eid);
  const weapons = weaponsNorm.list;
  const armors = armorsNorm.list;
  const merged = {
    ...base,
    ...raw,
    eid: armorsNorm.eid,
    items: { ...base.items, ...(raw.items || {}) },
    flags: { ...base.flags, ...(raw.flags || {}) },
    tower: { ...base.tower, ...(raw.tower || {}) },
    weapons,
    armors,
    party: Array.isArray(raw.party) ? raw.party.map((member) => ({ ...member, buff: null })) : base.party
  };
  merged.gold = Math.max(0, Math.floor(Number(merged.gold) || 0));
  merged.gems = Math.max(0, Math.floor(Number(merged.gems) || 0));
  Object.keys(merged.items).forEach((id) => {
    if (!Number.isFinite(merged.items[id]) || merged.items[id] < 0) merged.items[id] = 0;
  });
  const takenW = new Set();
  const takenA = new Set();
  const normalizePartyMember = (member, index) => {
    const fallback = base.party[index];
    const cls = CLASSES[member.id] ? CLASSES[member.id] : CLASSES[fallback.id];
    const normalized = { ...fallback, ...member, buff: null };
    normalized.id = cls === CLASSES[member.id] ? member.id : fallback.id;
    normalized.level = Math.max(1, Math.floor(Number(normalized.level) || 1));
    normalizeMemberEquip(normalized, weapons, armors, takenW, takenA);
    return normalized;
  };
  merged.party = (Array.isArray(raw.party) && raw.party.length === base.party.length
    ? raw.party.map(normalizePartyMember)
    : base.party);
  merged.roster = Array.isArray(raw.roster)
    ? raw.roster.slice(0, RECRUITABLE.length).map((member) => {
        const cls = CLASSES[member.id];
        const fallback = cls ? { id: member.id, level: 1, exp: 0, hp: 0, mp: 0, weapon: cls.weapon, armor: cls.armor, alive: true, buff: null, row: 'front' } : null;
        if (!fallback) return null;
        const normalized = { ...fallback, ...member, buff: null };
        normalizeMemberEquip(normalized, weapons, armors, takenW, takenA);
        return normalized;
      }).filter(Boolean)
    : [];
  const clamp = (member, index) => {
    const stats = statsFor(member);
    member.hp = Number.isFinite(member.hp) ? Math.min(stats.maxHp, Math.max(0, member.hp)) : stats.maxHp;
    member.mp = Number.isFinite(member.mp) ? Math.min(stats.maxMp, Math.max(0, member.mp)) : stats.maxMp;
    member.alive = !!member.alive;
    member.row = member.row === 'back' ? 'back' : 'front';
    return member;
  };
  merged.party = merged.party.map(clamp);
  merged.roster = merged.roster.map(clamp);
  return merged;
}

function addItem(id, count = 1) {
  state.items[id] = (state.items[id] || 0) + count;
}

function hasWeaponType(type) {
  return (state.weapons || []).some((w) => w.type === type);
}

function hasArmorType(type) {
  return (state.armors || []).some((a) => a.type === type);
}

function addWeapon(type) {
  if (!hasWeaponType(type)) addWeaponInstance(type);
}

function addArmor(type) {
  if (!hasArmorType(type)) addArmorInstance(type);
}

function saveGame(announce = true) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    if (announce) showToast('已存档');
  } catch (err) {
    showToast('存档失败：浏览器未开放本地存储');
  }
}

// 商业手游：任何状态变动后实时静默存档，避免意外损失进度
function autosave() {
  saveGame(false);
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    state = normalizeState(JSON.parse(raw));
    return true;
  } catch (err) {
    return false;
  }
}

function hasSave() {
  try {
    return !!localStorage.getItem(SAVE_KEY);
  } catch (err) {
    return false;
  }
}

function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function goto(screenId) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.remove('active');
    screen.classList.add('hidden');
  });
  $(screenId).classList.remove('hidden');
  $(screenId).classList.add('active');
}

function openModal(title, bodyHtml, buttons) {
  const root = $('modalRoot');
  root.innerHTML = `<div class="modal">
    <h3>${title}</h3>
    ${bodyHtml}
    <div class="modal-actions">
      ${buttons.map((button, index) => `<button data-modal-btn="${index}">${button.label}</button>`).join('')}
    </div>
  </div>`;
  root.classList.remove('hidden');
  buttons.forEach((button, index) => {
    root.querySelector(`[data-modal-btn="${index}"]`).addEventListener('click', () => {
      const keepOpen = button.onClick ? button.onClick() === false : false;
      if (!keepOpen) closeModal();
    });
  });
}

function closeModal() {
  const root = $('modalRoot');
  root.classList.add('hidden');
  root.innerHTML = '';
}

function openTargetPicker(title, targets, onPick) {
  const body = `<p>选择一个目标。</p><div class="target-grid">${targets.map((target, index) => `
    <button class="target-card ${target.dead ? 'dead' : ''}" data-target-index="${index}">
      <b>${target.name}</b><br><span>${target.detail}</span>
    </button>`).join('')}
  </div>`;
  openModal(title, body, [{ label: '取消' }]);
  $('modalRoot').querySelectorAll('.target-card').forEach((card) => {
    card.addEventListener('click', () => {
      closeModal();
      onPick(Number(card.dataset.targetIndex));
    });
  });
}

function renderHeader() {
  $('hudGold').textContent = fmt(state.gold);
  $('hudGems').textContent = fmt(state.gems);
}

function renderObjective() {
  let text = '';
  if (!state.flags.fire) text = '前往烈焰洞窟，取回火焰水晶。';
  else if (!state.flags.water) text = '火焰水晶已点亮。前往碧水神殿恢复水之平衡。';
  else if (!state.flags.earth) text = '水之守护已解放。前往黄土遗迹唤醒大地之力。';
  else if (!state.flags.wind) text = '大地意志苏醒。前往疾风之塔平定风暴。';
  else if (!state.flags.final) text = '四元素已归位。前往暗之王座击败暗影君主。';
  else text = '主线已通关。挑战永恒回廊，刷新终盘纪录。';
  $('objectiveText').textContent = text;
}

function renderPartyList() {
  $('partyList').innerHTML = `<div class="party-list">${state.party.map((member) => {
    const cls = CLASSES[member.id];
    const stats = statsFor(member);
    const hpPct = Math.max(0, Math.min(100, member.hp / stats.maxHp * 100));
    const mpPct = Math.max(0, Math.min(100, member.mp / stats.maxMp * 100));
    return `<div class="party-card ${member.alive ? '' : 'dead'}">
      ${partySprite(member.id)}
      <div>
        <div class="pc-name"><span class="mini-row ${member.row}">${member.row === 'front' ? '前' : '后'}</span>${cls.name}</div>
        <div class="pc-job">${cls.job}</div>
        <div class="pc-level">Lv.${member.level}</div>
        <div class="mini-bar"><i style="width:${hpPct}%"></i></div>
        <div class="mini-bar mp"><i style="width:${mpPct}%"></i></div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function renderAll() {
  renderHeader();
  renderObjective();
  renderPartyList();
  renderMapView();
  renderMenuView();
}

function setMainTab(tab) {
  currentTab = tab;
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tab);
  });
  const views = ['map', 'menu', 'shop', 'inn'];
  views.forEach((view) => {
    $(`${view}View`).classList.toggle('hidden', tab !== view);
  });
  if (tab === 'map') renderMapView();
  else if (tab === 'menu') renderMenuView();
  else if (tab === 'shop') renderShopView();
  else if (tab === 'inn') renderInnView();
}

function renderMapView() {
  if (explore) {
    renderExploration();
  } else if (towerRun) {
    renderTowerRun();
  } else {
    renderAreaList();
  }
}

function areaStatus(area) {
  if (state.flags[area.id]) return { label: '已讨伐', cls: 'cleared' };
  if (!area.unlock()) return { label: '未解锁', cls: 'locked' };
  return { label: '可探索', cls: '' };
}

function renderAreaList() {
  const html = `<div class="area-list">${Object.values(AREAS).map((area) => {
    const status = areaStatus(area);
    const locked = status.cls === 'locked';
    const cleared = status.cls === 'cleared';
    const areaIcon = area.type === 'tower' ? 'tower' : 'map';
    const statusIcon = locked ? 'lock' : cleared ? 'check' : 'target';
    const actions = area.type === 'tower'
      ? `<button data-area-action="tower" ${locked ? 'disabled' : ''}>${icon(locked ? 'lock' : 'tower', 15)}${locked ? '未解锁' : '进入回廊'}</button>`
      : `<button data-area-action="explore" data-area="${area.id}" ${locked ? 'disabled' : ''}>${icon(locked ? 'lock' : cleared ? 'refresh' : 'play', 15)}${locked ? '未解锁' : cleared ? '再探索' : '开始探索'}</button>`;
    return `<div class="area-card ${status.cls}">
      <div class="area-card-top">
        <div class="area-icon">${icon(areaIcon, 22)}</div>
        <span class="status-tag ${status.cls}">${icon(statusIcon, 13)}${status.label}</span>
      </div>
      <h3>${area.name}</h3>
      <p class="area-desc">${area.desc}</p>
      <div class="area-meta"><span>${icon('trophy', 13)}等级 ${area.level}</span></div>
      <div class="area-actions">${actions}</div>
    </div>`;
  }).join('')}</div>`;
  $('mapView').innerHTML = html;
}

function randomGroup(poolId) {
  const pool = AREA_POOLS[poolId];
  const count = 1 + rnd(Math.min(2, pool.length));
  return shuffle(pool).slice(0, count).map((id) => ({ id, scale: 1, boss: false }));
}

function randomTreasure() {
  if (chance(0.45)) return { kind: 'gold', amount: 80 + rnd(141) };
  if (chance(0.55)) return { kind: 'item', id: 'potion', amount: 1 + rnd(2) };
  if (chance(0.5)) return { kind: 'item', id: 'ether', amount: 1 };
  return { kind: 'gold', amount: 120 + rnd(121) };
}

function startExploration(areaId) {
  const area = AREAS[areaId];
  if (area.type === 'tower') {
    startTowerRun();
    return;
  }
  const events = [];
  for (let i = 0; i < area.steps; i++) {
    const roll = Math.random();
    if (roll < 0.58) events.push({ type: 'battle', group: randomGroup(area.pool) });
    else if (roll < 0.86) events.push({ type: 'treasure', reward: randomTreasure(), resolved: false });
    else events.push({ type: 'rest', resolved: false });
  }
  events.push({ type: 'boss', boss: area.boss, areaId });
  explore = { areaId, events, index: 0 };
  renderHeader();
  renderMapView();
}

function renderExploration() {
  const area = AREAS[explore.areaId];
  const event = explore.events[explore.index];
  const nodes = explore.events.map((item, index) => {
    const cls = index < explore.index ? 'done' : index === explore.index ? 'current' : '';
    return `<span class="node ${cls}"></span>`;
  }).join('');
  let card = '';
  if (event.type === 'battle') {
    card = `<div class="event-card">
      <h3>遭遇战</h3>
      <p>前方传来敌意，队伍已进入战斗准备。</p>
      <div class="event-actions"><button data-explore-action="battle">${icon('sword', 16)}迎战</button></div>
    </div>`;
  } else if (event.type === 'boss') {
    card = `<div class="event-card">
      <h3>首领战</h3>
      <p>${ENEMIES[event.boss].name} 守在深处，击败它即可净化这个区域。</p>
      <div class="event-actions"><button data-explore-action="battle">${icon('trophy', 16)}挑战首领</button></div>
    </div>`;
  } else if (event.type === 'treasure') {
    const label = event.resolved ? '继续前进' : '拾取';
    const text = event.resolved
      ? event.reward.kind === 'gold' ? `获得 ${event.reward.amount} 金币。` : `获得 ${ITEMS[event.reward.id].name} ×${event.reward.amount}。`
      : '发现一个宝箱。';
    card = `<div class="event-card">
      <h3>宝箱</h3>
      <p>${text}</p>
      <div class="event-actions"><button data-explore-action="${event.resolved ? 'continue' : 'resolve'}">${event.resolved ? icon('arrow-right') : icon('check')}${label}</button></div>
    </div>`;
  } else {
    const text = event.resolved ? '队伍在营火边休息，HP 与 MP 已回复。' : '发现一处安全营火。';
    card = `<div class="event-card">
      <h3>营火</h3>
      <p>${text}</p>
      <div class="event-actions"><button data-explore-action="${event.resolved ? 'continue' : 'resolve'}">${event.resolved ? icon('arrow-right') : icon('heart')}${event.resolved ? '继续前进' : '扎营休息'}</button></div>
    </div>`;
  }
  $('mapView').innerHTML = `<div class="explore-panel">
    <div class="explore-head">
      <div><h2>${area.name}</h2><p style="margin:4px 0 0;color:var(--muted)">探索进度 ${explore.index + 1}/${explore.events.length}</p></div>
      <div class="node-track">${nodes}</div>
      <button data-explore-action="leave">${icon('x', 15)}离开区域</button>
    </div>
    ${card}
  </div>`;
}

function resolveExploreEvent() {
  const event = explore.events[explore.index];
  if (event.type === 'treasure' && !event.resolved) {
    if (event.reward.kind === 'gold') state.gold += event.reward.amount;
    else addItem(event.reward.id, event.reward.amount);
    event.resolved = true;
  } else if (event.type === 'rest' && !event.resolved) {
    state.party.forEach((member) => {
      const stats = statsFor(member);
      member.hp = stats.maxHp;
      member.mp = stats.maxMp;
    });
    event.resolved = true;
  }
  renderHeader();
  renderMapView();
  autosave();
}

function continueExplore() {
  explore.index++;
  if (explore.index >= explore.events.length) {
    explore = null;
    renderHeader();
    renderMapView();
    autosave();
    showToast('区域探索完成');
  } else {
    renderMapView();
  }
}

function startExploreBattle() {
  const event = explore.events[explore.index];
  if (event.type === 'boss') {
    startBattle([{ id: event.boss, scale: 1, boss: true }], {
      areaName: `${AREAS[explore.areaId].name} · 首领战`,
      boss: true,
      areaId: explore.areaId
    });
  } else {
    startBattle(event.group, { areaName: AREAS[explore.areaId].name });
  }
}

function startTowerRun() {
  towerRun = { floor: 1 };
  renderHeader();
  renderMapView();
}

function renderTowerRun() {
  const floor = towerRun.floor;
  const bossFloor = floor % 5 === 0;
  $('mapView').innerHTML = `<div class="tower-panel">
    <div class="tower-head">
      <div><h2>永恒回廊</h2><p style="margin:4px 0 0;color:var(--muted)">最高纪录 ${state.tower.best} 层</p></div>
      <div class="battle-turn">第 ${floor} 层</div>
    </div>
    <div class="event-card">
      <h3>${bossFloor ? '首领层' : '普通层'}</h3>
      <p>${bossFloor ? '欧米伽 正在这一层等候。' : `敌人强度会随层数成长，击败后可以选择继续或离开。`}</p>
      <div class="event-actions">
        <button data-tower-action="battle">${icon('play', 15)}挑战第 ${floor} 层</button>
        <button data-tower-action="leave">${icon('x', 15)}离开回廊</button>
      </div>
    </div>
  </div>`;
}

function scaledEnemy(id, floor, boss = false) {
  return { id, scale: 1 + floor * 0.38 + (boss ? floor * 0.18 : 0), boss };
}

function startTowerBattle() {
  const floor = towerRun.floor;
  const bossFloor = floor % 5 === 0;
  const enemies = bossFloor
    ? [scaledEnemy('omega', floor, true)]
    : shuffle(AREA_POOLS.tower).slice(0, 2 + rnd(2)).map((id) => scaledEnemy(id, floor));
  startBattle(enemies, {
    areaName: `永恒回廊 · ${floor} 层`,
    tower: true,
    towerFloor: floor,
    towerBoss: bossFloor
  });
}

function makePartyCombatant(member, index) {
  const stats = statsFor(member);
  return {
    key: `p${index}`,
    side: 'player',
    index,
    name: CLASSES[member.id].name,
    job: member.id,
    hp: member.hp,
    maxHp: stats.maxHp,
    mp: member.mp,
    maxMp: stats.maxMp,
    atk: stats.atk,
    def: stats.def,
    mag: stats.mag,
    spr: stats.spr,
    spd: stats.spd,
    alive: member.alive,
    defending: false,
    buff: null,
    weapon: weaponTypeOf(member),
    armor: armorTypeOf(member),
    skills: CLASSES[member.id].skills.slice(),
    sprite: member.id,
    row: member.row === 'back' ? 'back' : 'front'
  };
}

function isRanged(job, weaponId) {
  const weapon = WEAPONS[weaponId];
  return !!(weapon && weapon.ranged);
}

function makeEnemyCombatant(enemyId, index, scale, boss = false) {
  const def = ENEMIES[enemyId];
  return {
    key: `e${index}`,
    side: 'enemy',
    index,
    name: def.name,
    hp: Math.floor(def.hp * scale),
    maxHp: Math.floor(def.hp * scale),
    mp: Math.floor(def.mp * scale),
    maxMp: Math.floor(def.mp * scale),
    atk: Math.floor(def.atk * scale),
    def: Math.floor(def.def * scale),
    mag: Math.floor((def.mag || def.atk * 0.8) * scale),
    spr: Math.floor(def.spr * scale),
    spd: Math.floor(def.spd * scale),
    alive: true,
    defending: false,
    buff: null,
    skills: def.skills.slice(),
    sprite: def.sprite,
    exp: Math.floor(def.exp * scale),
    gold: Math.floor(def.gold * scale),
    boss
  };
}

function startBattle(enemyList, options = {}) {
  clearTimeout(battleTimer);
  battle = {
    areaName: options.areaName || '遭遇战',
    turn: 1,
    index: 0,
    order: [],
    log: [],
    over: false,
    waiting: false,
    current: null,
    victory: null,
    tower: !!options.tower,
    towerFloor: options.towerFloor || null,
    towerBoss: !!options.towerBoss,
    boss: !!options.boss,
    areaId: options.areaId || null,
    party: state.party.map((member, index) => makePartyCombatant(member, index)),
    enemies: enemyList.map((entry, index) => makeEnemyCombatant(entry.id, index, entry.scale || 1, !!entry.boss))
  };
  battleAction = null;
  battleMenu = 'command';
  battle.order = buildOrder();
  addBattleLog(`${battle.areaName} 开始！`, 'system');
  goto('screen-battle');
  renderBattle();
  advanceBattle();
}

function buildOrder() {
  return [...battle.party, ...battle.enemies]
    .filter((actor) => actor.alive && actor.hp > 0)
    .sort((a, b) => b.spd - a.spd || (a.side === 'player' ? -1 : 1));
}

function advanceBattle() {
  if (!battle || battle.over) return;
  if (battle.index >= battle.order.length) {
    battle.turn++;
    battle.index = 0;
    battle.order = buildOrder();
  }
  while (battle.index < battle.order.length) {
    const actor = battle.order[battle.index];
    if (!actor.alive || actor.hp <= 0) {
      battle.index++;
      continue;
    }
    if (actor.side === 'player') {
      battle.current = actor;
      battle.waiting = true;
      battleAction = null;
      battleMenu = 'command';
      renderBattle();
      renderBattleCommand();
      return;
    }
    battle.waiting = false;
    renderBattle();
    const enemyActor = actor;
    battleTimer = setTimeout(() => enemyTurn(enemyActor), 480 + Math.random() * 320);
    return;
  }
  if (!battle.over) advanceBattle();
}

function enemyTurn(actor) {
  if (!battle || battle.over || !actor.alive || actor.hp <= 0) return;
  const skillId = actor.skills[rnd(actor.skills.length)];
  const skill = ENEMY_SKILLS[skillId];
  const target = skill.kind === 'magic'
    ? battle.party.filter((p) => p.alive && p.hp > 0).sort((a, b) => a.hp - b.hp)[0]
    : battle.party.filter((p) => p.alive && p.hp > 0)[rnd(battle.party.filter((p) => p.alive && p.hp > 0).length)];
  if (!target) return;
  const lines = resolveActorAction(actor, { kind: 'skill', skillId }, target.key);
  lines.forEach((line, index) => addBattleLog(line, index === 0 ? 'damage' : classifyLog(line)));
  finishActorTurn();
}

function finishActorTurn() {
  if (!battle || battle.over) return;
  battle.index++;
  battle.waiting = false;
  battle.current = null;
  checkBattleEnd();
  if (battle.over) return;
  renderBattle();
  advanceBattle();
}

function playerChooseTarget(targetKey) {
  if (!battle || !battle.current || !battleAction) return;
  const actor = battle.current;
  const action = battleAction;
  battleAction = null;
  battle.waiting = false;
  const lines = resolveActorAction(actor, action, targetKey);
  lines.forEach((line) => addBattleLog(line, classifyLog(line)));
  finishActorTurn();
}

function resolveActorAction(actor, action, targetKey) {
  const lines = [];
  if (action.kind === 'attack') {
    const target = targetKey ? findCombatant(targetKey) : battle.enemies.find((e) => e.alive && e.hp > 0);
    if (!target) return ['没有可攻击的目标。'];
    const result = dealDamage(actor, target, 1.0, 'phys');
    lines.push(`${actor.name} 攻击 ${target.name}，造成 ${result.damage} 点伤害${result.crit ? '，暴击！' : ''}${result.note || ''}。`);
  } else if (action.kind === 'skill') {
    const skill = actor.side === 'enemy' ? ENEMY_SKILLS[action.skillId] : SKILLS[action.skillId];
    if (actor.side === 'player' && actor.mp < skill.cost) return ['MP 不足。'];
    if (actor.side === 'player') actor.mp -= skill.cost;
    if (skill.kind === 'attack') {
      const target = targetKey ? findCombatant(targetKey) : battle.enemies.find((e) => e.alive && e.hp > 0);
      if (!target) return ['没有可攻击的目标。'];
      const result = dealDamage(actor, target, skill.power, 'phys', skill.id === 'punch' ? 0.5 : 0);
      lines.push(`${actor.name} 使用 ${skill.name}，对 ${target.name} 造成 ${result.damage} 点伤害${result.crit ? '，暴击！' : ''}${result.note || ''}。`);
    } else if (skill.kind === 'magic') {
      const target = targetKey ? findCombatant(targetKey) : battle.enemies.find((e) => e.alive && e.hp > 0);
      if (!target) return ['没有可攻击的目标。'];
      const result = dealDamage(actor, target, skill.power, 'magic');
      lines.push(`${actor.name} 咏唱 ${skill.name}，对 ${target.name} 造成 ${result.damage} 点魔法伤害。`);
    } else if (skill.kind === 'heal') {
      const targets = skill.target === 'all_ally' ? battle.party.filter((p) => p.alive) : [findCombatant(targetKey)];
      targets.forEach((target) => {
        if (!target.alive) return;
        const amount = Math.floor(actor.mag * skill.power);
        target.hp = Math.min(target.maxHp, target.hp + amount);
        lines.push(`${actor.name} 使用 ${skill.name}，为 ${target.name} 回复 ${amount} HP。`);
      });
    } else if (skill.kind === 'revive') {
      const target = findCombatant(targetKey);
      if (target.alive) return [`${target.name} 仍然存活。`];
      target.alive = true;
      target.hp = Math.max(1, Math.floor(target.maxHp * skill.power));
      lines.push(`${actor.name} 使用 ${skill.name}，复活了 ${target.name}。`);
    } else if (skill.kind === 'defend') {
      actor.defending = true;
      lines.push(`${actor.name} 摆出防御架势。`);
    } else if (skill.kind === 'buff') {
      actor.buff = { kind: 'focus', power: skill.power };
      lines.push(`${actor.name} 集中精神，下一次物理攻击将大幅提升。`);
    }
  } else if (action.kind === 'item') {
    const itemLines = resolveItem(actor, action.itemId, targetKey);
    lines.push(...itemLines);
  } else if (action.kind === 'defend') {
    actor.defending = true;
    lines.push(`${actor.name} 摆出防御架势。`);
  } else if (action.kind === 'flee') {
    const escapeChance = 0.45 + battle.party.reduce((sum, p) => sum + p.spd, 0) / 240;
    if (chance(escapeChance)) {
      battle.over = true;
      battle.victory = { title: '脱离战斗', lines: ['队伍成功脱离战斗。'], next: [{ label: '返回', action: 'continue' }] };
      lines.push('队伍成功脱离战斗。');
      renderBattle();
      return lines;
    }
    lines.push('逃跑失败！');
    const attacker = battle.enemies.find((e) => e.alive && e.hp > 0);
    if (attacker) {
      const alive = battle.party.filter((p) => p.alive && p.hp > 0);
      if (alive.length) {
        const target = alive[rnd(alive.length)];
        const result = dealDamage(attacker, target, 0.9, 'phys');
        lines.push(`${attacker.name} 追击 ${target.name}，造成 ${result.damage} 点伤害。`);
      }
    }
  }
  return lines;
}

function dealDamage(actor, target, power, kind, ignoreDef = 0) {
  let base = kind === 'magic' ? actor.mag * power : actor.atk * power;
  let resist = kind === 'magic' ? target.spr * 0.35 : target.def * (0.5 - ignoreDef);
  if (actor.buff && actor.buff.kind === 'focus' && kind === 'phys') {
    base *= actor.buff.power;
    actor.buff = null;
  }
  let rowNote = '';
  if (kind !== 'magic') {
    // 后排物理攻击惩罚（远程武器除外）
    if (actor.row === 'back' && !isRanged(actor.job, actor.weapon)) {
      base *= 0.6;
      rowNote = '（后排近战出力受限）';
    }
    // 后排物理减伤
    if (target.row === 'back') {
      base *= 0.7;
      if (!rowNote) rowNote = '（后排减伤）';
    }
  }
  const crit = kind === 'phys' && chance(0.12);
  let damage = Math.max(1, Math.floor((base - resist) * (0.9 + Math.random() * 0.2)));
  if (target.defending) {
    damage = Math.max(1, Math.floor(damage * 0.5));
    target.defending = false;
  }
  if (crit) damage = Math.floor(damage * 1.6);
  target.hp = Math.max(0, target.hp - damage);
  return { damage, crit, note: rowNote };
}

function findCombatant(key) {
  return [...battle.party, ...battle.enemies].find((actor) => actor.key === key);
}

function resolveItem(actor, itemId, targetKey) {
  const item = ITEMS[itemId];
  if (!state.items[itemId]) return ['道具数量不足。'];
  const lines = [];
  if (item.kind === 'escape') {
    state.items[itemId]--;
    battle.over = true;
    battle.victory = { title: '脱离战斗', lines: ['使用烟雾弹成功脱离战斗。'], next: [{ label: '返回', action: 'continue' }] };
    lines.push('使用烟雾弹成功脱离战斗。');
    renderBattle();
    return lines;
  }
  const target = findCombatant(targetKey);
  if (!target) return ['没有可用目标。'];
  if (item.kind === 'heal' && (!target.alive || target.hp >= target.maxHp)) return ['该目标不需要回复。'];
  if (item.kind === 'ether' && (!target.alive || target.mp >= target.maxMp)) return ['该目标不需要回复 MP。'];
  if (item.kind === 'revive' && target.alive) return ['该目标仍然存活。'];
  state.items[itemId]--;
  if (item.kind === 'heal') {
    target.hp = Math.min(target.maxHp, target.hp + item.power);
    lines.push(`${actor.name} 对 ${target.name} 使用 ${item.name}，回复 ${item.power} HP。`);
  } else if (item.kind === 'ether') {
    target.mp = Math.min(target.maxMp, target.mp + item.power);
    lines.push(`${actor.name} 对 ${target.name} 使用 ${item.name}，回复 ${item.power} MP。`);
  } else if (item.kind === 'revive') {
    target.alive = true;
    target.hp = Math.max(1, Math.floor(target.maxHp * item.power));
    lines.push(`${actor.name} 使用 ${item.name}，复活了 ${target.name}。`);
  }
  return lines;
}

function checkBattleEnd() {
  if (!battle || battle.over) return;
  const enemyAlive = battle.enemies.some((e) => e.alive && e.hp > 0);
  const partyAlive = battle.party.some((p) => p.alive && p.hp > 0);
  if (!enemyAlive) {
    battle.over = true;
    finishVictory();
  } else if (!partyAlive) {
    battle.over = true;
    finishDefeat();
  }
}

function syncPartyFromBattle() {
  battle.party.forEach((combatant, index) => {
    const member = state.party[index];
    member.hp = combatant.hp;
    member.mp = combatant.mp;
    member.alive = combatant.alive;
  });
}

function gainExp(amount) {
  const lines = [];
  state.party.forEach((member) => {
    if (!member.alive) return;
    member.exp += amount;
    while (member.exp >= expForNext(member.level)) {
      member.exp -= expForNext(member.level);
      member.level++;
      const stats = statsFor(member);
      member.hp = stats.maxHp;
      member.mp = stats.maxMp;
      lines.push(`${CLASSES[member.id].name} 升到 ${member.level} 级！`);
    }
  });
  return lines;
}

function gainExpForMember(member, amount) {
  const lines = [];
  if (!member.alive) return lines;
  member.exp += amount;
  while (member.exp >= expForNext(member.level)) {
    member.exp -= expForNext(member.level);
    member.level++;
    const stats = statsFor(member);
    member.hp = stats.maxHp;
    member.mp = stats.maxMp;
    lines.push(`${CLASSES[member.id].name} 升到 ${member.level} 级！`);
  }
  return lines;
}

function completeBoss(areaId) {
  const lines = [];
  if (state.flags[areaId]) return lines;
  state.flags[areaId] = true;
  const reward = BOSS_REWARDS[areaId];
  if (reward.gold) {
    state.gold += reward.gold;
    lines.push(`讨伐报酬：${fmt(reward.gold)} 金币。`);
  }
  if (reward.gems) {
    state.gems += reward.gems;
    lines.push(`获得 ${reward.gems} 水晶。`);
  }
  if (reward.weapon) {
    addWeapon(reward.weapon);
    lines.push(`获得 ${WEAPONS[reward.weapon].name}。`);
  }
  if (reward.armor) {
    addArmor(reward.armor);
    lines.push(`获得 ${ARMORS[reward.armor].name}。`);
  }
  if (reward.items) {
    Object.entries(reward.items).forEach(([id, count]) => {
      addItem(id, count);
      lines.push(`获得 ${ITEMS[id].name} ×${count}。`);
    });
  }
  if (areaId === 'final') lines.push('暗之王座已净化，永恒回廊解锁。');
  saveGame(false);
  return lines;
}

function finishVictory() {
  syncPartyFromBattle();
  const exp = battle.enemies.reduce((sum, e) => sum + e.exp, 0);
  const gold = battle.enemies.reduce((sum, e) => sum + e.gold, 0);
  const lines = [`获得 ${fmt(exp)} 经验、${fmt(gold)} 金币。`];
  state.gold += gold;
  lines.push(...gainExp(exp));
  if (chance(0.22)) {
    addItem('potion', 1);
    lines.push('拾取到 1 瓶药水。');
  }
  if (battle.boss && battle.areaId) {
    lines.push(...completeBoss(battle.areaId));
  }
  if (battle.tower) {
    state.tower.best = Math.max(state.tower.best, battle.towerFloor);
    lines.push(`永恒回廊最高纪录更新至 ${state.tower.best} 层。`);
    if (battle.towerBoss) {
      state.gems += 20;
      lines.push('首领层奖励：20 水晶。');
    }
  }
  const next = battle.tower
    ? [{ label: '下一层', action: 'tower-next' }, { label: '离开回廊', action: 'tower-leave' }]
    : [{ label: '继续', action: 'continue' }];
  battle.victory = { title: battle.tower && battle.towerBoss ? '首领击破' : '胜利', lines, next };
  renderHeader();
  renderBattle();
}

function finishDefeat() {
  syncPartyFromBattle();
  autosave();
  battle.victory = { title: '全灭', lines: ['队伍全灭，冒险中断。'], next: [] };
  goto('screen-gameover');
}

function addBattleLog(text, cls = '') {
  if (!battle) return;
  battle.log.push({ text, cls });
  if (battle.log.length > 80) battle.log.shift();
  renderBattleLog();
}

function classifyLog(text) {
  if (text.includes('伤害') || text.includes('追击')) return 'damage';
  if (text.includes('回复') || text.includes('复活')) return 'heal';
  if (text.includes('获得') || text.includes('升到') || text.includes('开始') || text.includes('脱离') || text.includes('纪录')) return 'system';
  return '';
}

function renderBattle() {
  if (!battle) return;
  $('battleTitle').textContent = battle.areaName;
  $('battleTurn').textContent = `第 ${battle.turn} 回合`;
  const targetableEnemy = battleAction && battleAction.targetType === 'enemy';
  const allowReviveTarget = battleAction && battleAction.itemKind === 'revive';
  const targetableParty = battleAction && (battleAction.targetType === 'ally' || battleAction.targetType === 'all_ally');
  const enemyHtml = battle.enemies.map((enemy) => `
    <div class="combatant enemy ${enemy.alive && enemy.hp > 0 ? '' : 'dead'} ${targetableEnemy && enemy.alive && enemy.hp > 0 ? 'targetable' : ''}" data-battle-target="${enemy.key}">
      ${enemySprite(enemy.sprite)}
      <div class="combatant-name">${enemy.name}</div>
      <div class="combatant-hp">HP ${enemy.hp}/${enemy.maxHp}</div>
      <div class="hpbar"><i style="width:${Math.max(0, enemy.hp / enemy.maxHp * 100)}%"></i></div>
    </div>`).join('');
  const partyHtml = battle.party.map((member) => {
    const activeTurn = battle.current && battle.current.side === 'player' && battle.current.key === member.key;
    return `<div class="combatant player ${member.alive && member.hp > 0 ? '' : 'dead'} ${activeTurn ? 'active-turn' : ''} ${targetableParty && (member.alive || allowReviveTarget) ? 'targetable' : ''}" data-battle-target="${member.key}">
      ${partySprite(member.job)}
      ${activeTurn ? `<div class="turn-badge">${icon('zap', 13)}行动中</div>` : ''}
      <div class="combatant-name">${member.name}</div>
      <div class="combatant-hp">HP ${member.hp}/${member.maxHp} · MP ${member.mp}/${member.maxMp}</div>
      <div class="hpbar"><i style="width:${Math.max(0, member.hp / member.maxHp * 100)}%"></i></div>
      <div class="mpbar"><i style="width:${Math.max(0, member.mp / member.maxMp * 100)}%"></i></div>
    </div>`;
  }).join('');
  $('battleStage').innerHTML = `<div class="combat-group enemies">${enemyHtml}</div><div class="combat-group">${partyHtml}</div>`;
  renderBattleLog();
  if (battle.victory) {
    renderBattleResult();
  } else if (battle.waiting && battle.current) {
    renderBattleCommand();
  } else {
    $('battleCommand').innerHTML = '';
  }
}

function renderBattleLog() {
  if (!battle) return;
  $('battleLog').innerHTML = battle.log.slice(-6).map((entry) => `<p class="log-${entry.cls}">${entry.text}</p>`).join('');
  $('battleLog').scrollTop = $('battleLog').scrollHeight;
}

function renderBattleResult() {
  const victory = battle.victory;
  $('battleCommand').innerHTML = `<div class="battle-result">
    <h3>${victory.title}</h3>
    ${victory.lines.map((line) => `<p>${line}</p>`).join('')}
    <div class="event-actions">${victory.next.map((button) => `<button data-battle-result="${button.action}">${icon(button.action === 'tower-next' ? 'arrow-right' : button.action === 'tower-leave' ? 'x' : 'check', 15)}${button.label}</button>`).join('')}</div>
  </div>`;
}

function renderBattleCommand() {
  const actor = battle.current;
  if (!actor) return;
  if (battleAction) {
    const label = battleAction.targetType === 'enemy' ? '选择敌方目标' : '选择队友目标';
    $('battleCommand').innerHTML = `<p class="command-label">${icon('target', 15)}${label}</p><button data-battle-action="cancel">${icon('x', 15)}取消</button>`;
    return;
  }
  if (battleMenu === 'skill') {
    const skillIds = actor.skills.slice();
    $('battleCommand').innerHTML = `<p class="command-label">${actor.name} · 选择技能</p>
      <div class="skill-grid">${skillIds.map((id) => {
        const skill = SKILLS[id];
        return `<button data-battle-action="skill" data-skill-id="${id}" ${skill.cost > actor.mp ? 'disabled' : ''}>
          ${icon('zap', 16)}<span>${skill.name}</span><span class="skill-cost">${skill.cost > 0 ? `MP ${skill.cost}` : '无消耗'} · ${skill.desc}</span>
        </button>`;
      }).join('')}
      </div>
      <div class="event-actions" style="margin-top:10px"><button data-battle-action="back">${icon('arrow-right', 15)}返回</button></div>`;
    return;
  }
  if (battleMenu === 'item') {
    const usable = Object.entries(state.items).filter(([id, count]) => count > 0 && ['heal', 'ether', 'revive', 'escape'].includes(ITEMS[id].kind));
    $('battleCommand').innerHTML = `<p class="command-label">${icon('backpack', 15)}${actor.name} · 选择道具</p>
      <div class="skill-grid">${usable.map(([id, count]) => `<button data-battle-action="item" data-item-id="${id}">${icon('package', 16)}<span>${ITEMS[id].name}</span><span class="skill-cost">持有 ${count} · ${ITEMS[id].desc}</span></button>`).join('')}
      </div>
      <div class="event-actions" style="margin-top:10px"><button data-battle-action="back">${icon('arrow-right', 15)}返回</button></div>`;
    return;
  }
  $('battleCommand').innerHTML = `<p class="command-label">${actor.name} · 选择行动</p>
    <div class="command-grid">
      <button data-battle-action="attack">${icon('sword', 17)}攻击</button>
      <button data-battle-action="open-skill">${icon('zap', 17)}技能</button>
      <button data-battle-action="open-item">${icon('backpack', 17)}道具</button>
      <button data-battle-action="defend">${icon('shield', 17)}防御</button>
      <button data-battle-action="flee">${icon('play', 17)}逃跑</button>
</div>`;
  }

function setBattleAction(action) {
  battleAction = action;
  renderBattle();
}

function cancelBattleAction() {
  battleAction = null;
  battleMenu = 'command';
  renderBattle();
}

function handleBattleResult(action) {
  const wasTower = battle.tower;
  battle = null;
  battleAction = null;
  battleMenu = 'command';
  $('battleCommand').innerHTML = '';
  $('battleStage').innerHTML = '';
  goto('screen-main');
  if (action === 'tower-next' && wasTower && towerRun) {
    towerRun.floor++;
    renderHeader();
    renderMapView();
    showToast(`进入永恒回廊 ${towerRun.floor} 层`);
    return;
  }
  if (action === 'tower-leave') {
    towerRun = null;
    renderHeader();
    renderMapView();
    showToast('已离开永恒回廊');
    return;
  }
  if (explore) {
    continueExplore();
  } else {
    renderHeader();
    renderMapView();
  }
}

function renderMenuView() {
  $('menuView').innerHTML = `<div class="menu-subtabs">
      <button class="tab ${menuTab === 'party' ? 'active' : ''}" data-menu-tab="party">${icon('users', 16)}队伍</button>
      <button class="tab ${menuTab === 'items' ? 'active' : ''}" data-menu-tab="items">${icon('backpack', 16)}道具</button>
      <button class="tab ${menuTab === 'equip' ? 'active' : ''}" data-menu-tab="equip">${icon('sword', 16)}装备</button>
    </div>
    <div id="menuContent"></div>`;
  if (menuTab === 'party') renderPartyMenu();
  else if (menuTab === 'items') renderItemsMenu();
  else renderEquipmentMenu();
}

function renderPartyMenu() {
  const content = $('menuContent');
  const MAX_PARTY = 4;
  const hint = `<p class="formation-hint">${icon('target', 13)}出战上限 ${MAX_PARTY} 人。前排近战正常输出；后排近战伤害与所受物理伤害降低，远程武器与魔法不受后排影响。</p>`;
  const partyHtml = state.party.length
    ? `<h4 class="formation-title">${icon('users', 14)}出战阵容</h4><div class="party-menu">${state.party.map((member, index) => memberCard(member, index, 'party')).join('')}</div>`
    : '';
  const rosterHtml = state.roster.length
    ? `<h4 class="formation-title">${icon('backpack', 14)}后备阵容</h4><div class="party-menu">${state.roster.map((member, index) => memberCard(member, index, 'roster')).join('')}</div>`
    : '';
  content.innerHTML = `${hint}${partyHtml}${rosterHtml}`;
}

function memberCard(member, index, pool) {
  const cls = CLASSES[member.id];
  const stats = statsFor(member);
  const deployed = pool === 'party';
  const rowBadge = deployed
    ? `<span class="row-badge ${member.row}">${member.row === 'front' ? '前排' : '后排'}</span>`
    : `<span class="row-badge bench">后备</span>`;
  const rowActions = deployed
    ? `<button data-formation="row" data-pool="${pool}" data-index="${index}" data-row="${member.row === 'front' ? 'back' : 'front'}" class="mini-btn">${icon(member.row === 'front' ? 'arrow-back' : 'arrow-front', 13)}${member.row === 'front' ? '转到后排' : '转至前排'}</button>`
    : '';
  const weaponType = weaponTypeOf(member);
  const armorType = armorTypeOf(member);
  const weaponName = WEAPONS[weaponType] ? WEAPONS[weaponType].name : '未装备';
  const armorName = ARMORS[armorType] ? ARMORS[armorType].name : '未装备';
  const weaponInfo = WEAPONS[weaponType] ? `攻击+${WEAPONS[weaponType].power}${WEAPONS[weaponType].mag ? ` · 魔力+${WEAPONS[weaponType].mag}` : ''}` : '';
  const armorInfo = ARMORS[armorType] ? `防御+${ARMORS[armorType].def}${ARMORS[armorType].mag ? ` · 魔力+${ARMORS[armorType].mag}` : ''}` : '';
  return `<div class="member-card ${member.alive ? '' : 'dead'}">
      <div class="member-head">
        ${partySprite(member.id)}
        <div>
          <div class="member-name-row"><h3>${cls.name}</h3>${rowBadge}</div>
          <p>${cls.job} · Lv.${member.level}${member.alive ? '' : ' · 倒下'}</p>
        </div>
      </div>
      <div class="stat-grid">
        <div class="stat-box">HP<b>${member.hp}/${stats.maxHp}</b></div>
        <div class="stat-box">MP<b>${member.mp}/${stats.maxMp}</b></div>
        <div class="stat-box">EXP<b>${fmt(member.exp)}/${fmt(expForNext(member.level))}</b></div>
        <div class="stat-box">攻击<b>${stats.atk}</b></div>
        <div class="stat-box">防御<b>${stats.def}</b></div>
        <div class="stat-box">速度<b>${stats.spd}</b></div>
        <div class="stat-box">魔力<b>${stats.mag}</b></div>
        <div class="stat-box">精神<b>${stats.spr}</b></div>
        <div class="stat-box">技能<b>${cls.skills.map((id) => SKILLS[id].name).join('/')}</b></div>
      </div>
      <div class="formation-actions">
        ${rowActions}
        <button data-formation="${deployed ? 'bench' : 'deploy'}" data-pool="${pool}" data-index="${index}" class="mini-btn ${deployed ? 'danger' : ''}">${icon(deployed ? 'down' : 'up', 13)}${deployed ? '下阵' : '上阵'}</button>
      </div>
      <div class="equip-rows">
        <button class="equip-btn" data-open-equip="weapon" data-pool="${pool}" data-index="${index}">
          <span class="equip-label">${icon('sword', 13)}武器</span>
          <span class="equip-value">${weaponName}</span>
          <span class="equip-info">${weaponInfo}</span>
          <span class="equip-change">更换</span>
        </button>
        <button class="equip-btn" data-open-equip="armor" data-pool="${pool}" data-index="${index}">
          <span class="equip-label">${icon('shield', 13)}防具</span>
          <span class="equip-value">${armorName}</span>
          <span class="equip-info">${armorInfo}</span>
          <span class="equip-change">更换</span>
        </button>
      </div>
    </div>`;
}

// 装备换装弹窗：商业手游风格——网格卡片展示所有实例，每件标注当前持有者/状态。
// 点击某张卡即给当前角色换装（若该件正被其他人装备，则自动置换，保持 1:1）。
function openEquipModal(pool, slot, index) {
  const members = pool === 'roster' ? state.roster : state.party;
  const member = members[index];
  if (!member) return;
  const cls = CLASSES[member.id];
  const isWeapon = slot === 'weapon';
  const instances = isWeapon ? state.weapons : state.armors;
  const table = isWeapon ? WEAPONS : ARMORS;
  const list = instances.map((inst) => {
    const item = table[inst.type];
    if (!item) return null;
    const compatible = !isWeapon || item.jobs.includes(member.id);
    const equipped = member[slot] === inst.uid;
    const owner = equipOwner(slot, inst.uid);
    const ownerLabel = equipped ? '当前装备' : owner ? `由 ${CLASSES[owner.id].name} 装备` : '未装备';
    const info = isWeapon
      ? `攻击+${item.power}${item.mag ? ` · 魔力+${item.mag}` : ''}${item.ranged ? ' · 远程' : ''}`
      : `防御+${item.def}${item.mag ? ` · 魔力+${item.mag}` : ''}`;
    const locked = !compatible;
    return `<button class="equip-option ${equipped ? 'equipped' : ''} ${locked ? 'locked' : ''}" data-equip-option="${slot}" data-pool="${pool}" data-index="${index}" data-uid="${inst.uid}" ${locked ? 'disabled' : ''}>
      <span class="eq-name">${item.name}${equipped ? ' ' + icon('check', 13) : ''}</span>
      <span class="eq-info">${info}</span>
      <span class="eq-state ${equipped ? 'on' : owner ? 'other' : 'free'}">${ownerLabel}</span>
    </button>`;
  }).filter(Boolean).join('');
  const currentName = isWeapon
    ? (WEAPONS[weaponTypeOf(member)] ? WEAPONS[weaponTypeOf(member)].name : '未装备')
    : (ARMORS[armorTypeOf(member)] ? ARMORS[armorTypeOf(member)].name : '未装备');
  const body = `<p class="equip-modal-hint">${cls.name} · 当前${isWeapon ? '武器' : '防具'}：${currentName}。点击卡片换装（一件装备同一时刻只能给一名角色使用）。</p>
    <div class="equip-option-grid">${list || '<p class="dim-empty">还没有可用的装备，去商店购买吧。</p>'}</div>`;
  openModal(isWeapon ? '更换武器' : '更换防具', body, [{ label: '取消' }]);
}

function equipOptionListener(event) {
  const btn = event.target.closest('[data-equip-option]');
  if (!btn || btn.disabled) return;
  const pool = btn.dataset.pool === 'roster' ? state.roster : state.party;
  const member = pool[Number(btn.dataset.index)];
  if (!member) return;
  assignEquip(member, btn.dataset.equipOption, btn.dataset.uid);
  closeModal();
  renderMenuView();
  renderHeader();
  renderPartyList();
  autosave();
  showToast('装备已更换');
}

function renderItemsMenu() {
  const content = $('menuContent');
  const itemIcons = { heal: 'heart', ether: 'zap', revive: 'refresh', escape: 'play', exp: 'book', gold: 'coins' };
  content.innerHTML = `<div class="item-list">${Object.entries(ITEMS).map(([id, item]) => {
    const count = state.items[id] || 0;
    return `<div class="item-card">
      <div class="item-card-head">
        <div class="item-icon">${icon(itemIcons[item.kind] || 'package', 18)}</div>
        <h3><span>${item.name}</span><span class="count">×${count}</span></h3>
      </div>
      <p>${item.desc}</p>
      <button data-use-item="${id}" ${count > 0 ? '' : 'disabled'}>${icon('check', 15)}使用</button>
    </div>`;
  }).join('')}</div>`;
}

// 装备分页：展示所有已持有的装备实例（每件 1:1 标注持有者），点击某件可给队员换装
function renderEquipmentMenu() {
  const content = $('menuContent');
  const allMembers = [...state.party, ...state.roster];
  const renderCard = (inst, slot) => {
    const table = slot === 'weapon' ? WEAPONS : ARMORS;
    const item = table[inst.type];
    if (!item) return '';
    const owner = equipOwner(slot, inst.uid);
    const ownerLabel = owner ? `由 ${CLASSES[owner.id].name} 装备` : '未装备';
    const info = slot === 'weapon'
      ? `攻击+${item.power}${item.mag ? ` · 魔力+${item.mag}` : ''}${item.ranged ? ' · 远程' : ''}`
      : `防御+${item.def}${item.mag ? ` · 魔力+${item.mag}` : ''}`;
    const jobLabel = slot === 'weapon' ? item.jobs.map((jid) => CLASSES[jid].job).join('/') : '全体职业';
    return `<div class="equip-card ${owner ? '' : 'free'}">
      <div class="equip-card-head">
        <div class="product-icon">${icon(slot === 'weapon' ? 'sword' : 'shield', 18)}</div>
        <h3><span>${item.name}</span><span class="count ${owner ? '' : 'free-count'}">${ownerLabel}</span></h3>
      </div>
      <p>${info} · 适用 ${jobLabel}</p>
      <button data-equip-target="${slot}:${inst.uid}">${icon('sword', 15)}换装</button>
    </div>`;
  };
  const weaponsHtml = state.weapons.length ? `<h4 class="formation-title">${icon('sword', 14)}武器</h4><div class="product-grid">${state.weapons.map((inst) => renderCard(inst, 'weapon')).join('')}</div>` : '';
  const armorsHtml = state.armors.length ? `<h4 class="formation-title">${icon('shield', 14)}防具</h4><div class="product-grid">${state.armors.map((inst) => renderCard(inst, 'armor')).join('')}</div>` : '';
  content.innerHTML = `<p class="formation-hint">${icon('sword', 13)}已持有的装备一览（每件装备同一时刻只能给一名角色使用）。点击「换装」选择要装备它的队员。</p>${weaponsHtml}${armorsHtml}`;
}

function equipTargetPicker(slot, uid) {
  const table = slot === 'weapon' ? WEAPONS : ARMORS;
  const inst = (slot === 'weapon' ? state.weapons : state.armors).find((x) => x.uid === uid);
  if (!inst) return;
  const item = table[inst.type];
  const candidates = [...state.party.map((m, i) => ({ m, i, pool: 'party' })), ...state.roster.map((m, i) => ({ m, i, pool: 'roster' }))]
    .filter(({ m }) => slot === 'armor' || item.jobs.includes(m.id));
  if (!candidates.length) {
    showToast('当前没有可装备该装备的队员');
    return;
  }
  openModal(`换装 · ${item.name}`, `<p>选择要装备该${slot === 'weapon' ? '武器' : '防具'}的队员。</p><div class="target-grid">${candidates.map(({ m, i, pool }, idx) => `
    <button class="target-card ${m.alive ? '' : 'dead'}" data-equip-target-index="${idx}">
      <b>${CLASSES[m.id].name}</b><br><span>${CLASSES[m.id].job} · ${pool === 'party' ? (m.row === 'front' ? '前排' : '后排') : '后备'}${m[slot] === uid ? ' · 已装备' : ''}</span>
    </button>`).join('')}
  </div>`, [{ label: '取消' }]);
  $('modalRoot').querySelectorAll('[data-equip-target-index]').forEach((card) => {
    card.addEventListener('click', () => {
      const { m } = candidates[Number(card.dataset.equipTargetIndex)];
      assignEquip(m, slot, uid);
      closeModal();
      renderMenuView();
      renderHeader();
      renderPartyList();
      autosave();
      showToast(`${CLASSES[m.id].name} 已装备 ${item.name}`);
    });
  });
}

function validMenuTarget(member, item) {
  if (item.kind === 'revive') return !member.alive;
  const stats = statsFor(member);
  if (item.kind === 'heal') return member.alive && member.hp < stats.maxHp;
  if (item.kind === 'ether') return member.alive && member.mp < stats.maxMp;
  return member.alive;
}

function useItemInMenu(itemId) {
  const item = ITEMS[itemId];
  if (state.items[itemId] <= 0) return;
  if (item.kind === 'gold') {
    state.items[itemId]--;
    state.gold += item.power;
    renderAll();
    autosave();
    showToast(`获得 ${item.power} 金币`);
    return;
  }
  if (item.kind === 'exp') {
    openTargetPicker(item.name, state.party.map((member) => ({
      name: CLASSES[member.id].name,
      detail: `Lv.${member.level} · ${member.alive ? '存活' : '倒下'}`,
      dead: !member.alive
    })), (index) => {
      if (!state.party[index].alive) {
        showToast('倒下角色无法获得经验');
        return;
      }
      state.items[itemId]--;
      const member = state.party[index];
      const lines = gainExpForMember(member, item.power);
      lines.forEach((line) => showToast(line));
      renderAll();
      autosave();
      showToast(`${CLASSES[member.id].name} 获得 ${item.power} 经验`);
    });
    return;
  }
  const targets = state.party.map((member, index) => ({
    name: CLASSES[member.id].name,
    detail: validMenuTarget(member, item) ? (item.kind === 'revive' ? '可复活' : `HP ${member.hp}/${statsFor(member).maxHp}`) : '无法使用',
    dead: !validMenuTarget(member, item)
  }));
  if (!targets.some((target) => !target.dead)) {
    showToast('没有可用目标');
    return;
  }
  openTargetPicker(item.name, targets, (index) => {
    const member = state.party[index];
    if (!validMenuTarget(member, item)) {
      showToast('该目标无法使用此道具');
      return;
    }
    state.items[itemId]--;
    if (item.kind === 'heal') member.hp = Math.min(statsFor(member).maxHp, member.hp + item.power);
    else if (item.kind === 'ether') member.mp = Math.min(statsFor(member).maxMp, member.mp + item.power);
    else if (item.kind === 'revive') {
      member.alive = true;
      member.hp = Math.max(1, Math.floor(statsFor(member).maxHp * item.power));
    }
    renderAll();
    autosave();
    showToast(`已对 ${CLASSES[member.id].name} 使用 ${item.name}`);
  });
}

function openShop(tab = 'equip') {
  shopTab = tab;
  currentTab = 'shop';
  renderShopView();
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === 'shop');
  });
}

function renderShopView() {
  $('shopView').innerHTML = `
    <div class="shop-tabs">
      <button class="tab" data-shop-tab="equip">${icon('sword', 14)}装备商店</button>
      <button class="tab" data-shop-tab="item">${icon('backpack', 14)}道具商店</button>
      <button class="tab" data-shop-tab="crystal">${icon('gem', 14)}水晶商店</button>
      <button class="tab" data-shop-tab="iap">${icon('star', 14)}内购商店</button>
    </div>
    <div id="shopBody"></div>`;
  renderShop();
}

function renderShop() {
  document.querySelectorAll('[data-shop-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.shopTab === shopTab);
  });
  const body = $('shopBody');
  if (!body) return;
  body.innerHTML = '';
  const itemIcons = { heal: 'heart', ether: 'zap', revive: 'refresh', escape: 'play', exp: 'book', gold: 'coins' };
  const section = (title, cards) => `<h2 class="shop-section-title">${title}</h2><div class="product-grid">${cards}</div>`;
  const weaponId = (weapon) => Object.keys(WEAPONS).find((id) => WEAPONS[id] === weapon);
  const armorId = (armor) => Object.keys(ARMORS).find((id) => ARMORS[id] === armor);

  if (shopTab === 'equip') {
    const weaponCards = Object.values(WEAPONS).map((weapon) => `
      <div class="product-card">
        <div class="product-head">
          <div class="product-icon">${icon('sword', 20)}</div>
          <h3><span>${weapon.name}</span></h3>
          <span class="price">${fmt(weapon.cost)} 金币</span>
        </div>
        <p>${weapon.desc} · 适用 ${weapon.jobs.map((id) => CLASSES[id].job).join('/')}</p>
        <button data-buy="weapon:${weaponId(weapon)}" ${hasWeaponType(weaponId(weapon)) ? 'disabled' : ''}>${icon('shop', 15)}${hasWeaponType(weaponId(weapon)) ? '已拥有' : '购买'}</button>
      </div>`).join('');
    const armorCards = Object.values(ARMORS).map((armor) => `
      <div class="product-card">
        <div class="product-head">
          <div class="product-icon">${icon('shield', 20)}</div>
          <h3><span>${armor.name}</span></h3>
          <span class="price">${fmt(armor.cost)} 金币</span>
        </div>
        <p>${armor.desc} · 防御 +${armor.def}${armor.mag ? ` · 魔力 +${armor.mag}` : ''}</p>
        <button data-buy="armor:${armorId(armor)}" ${hasArmorType(armorId(armor)) ? 'disabled' : ''}>${icon('shop', 15)}${hasArmorType(armorId(armor)) ? '已拥有' : '购买'}</button>
      </div>`).join('');
    body.innerHTML = `<p class="formation-hint">${icon('sword', 13)}每件装备购买后是唯一实例，同一时刻只能被一名角色装备，可在「队伍 → 装备」页自由换装。</p>${section('武器', weaponCards)}${section('防具', armorCards)}`;
    return;
  }

  if (shopTab === 'item') {
    const goldItems = Object.entries(ITEMS).filter(([, item]) => !item.currency);
    const cards = goldItems.map(([id, item]) => `
      <div class="product-card">
        <div class="product-head">
          <div class="product-icon">${icon(itemIcons[item.kind] || 'package', 20)}</div>
          <h3><span>${item.name}</span></h3>
          <span class="price">${fmt(item.cost)} 金币</span>
        </div>
        <p>${item.desc}</p>
        <button data-buy="item:${id}">${icon('shop', 15)}购买</button>
      </div>`).join('');
    body.innerHTML = `<p class="formation-hint">${icon('backpack', 13)}消耗品与恢复道具，购买后计入背包，可在「队伍 → 道具」或战斗中直接使用。</p>${section('恢复与战术道具', cards)}`;
    return;
  }

  if (shopTab === 'crystal') {
    const gemItems = Object.entries(ITEMS).filter(([, item]) => item.currency);
    const cards = gemItems.map(([id, item]) => `
      <div class="product-card">
        <div class="product-head">
          <div class="product-icon">${icon('star', 20)}</div>
          <h3><span>${item.name}</span></h3>
          <span class="price gems">${item.cost} 水晶</span>
        </div>
        <p>${item.desc}</p>
        <button data-buy="item:${id}" ${state.gems < item.cost ? 'disabled' : ''}>${icon('shop', 15)}购买</button>
      </div>`).join('');
    body.innerHTML = `<p class="formation-hint">${icon('gem', 13)}使用水晶购买专属道具，可在「队伍 → 道具」查看并使用。</p>${section('水晶专属道具', cards)}`;
    return;
  }

  // 内购商店
  const packages = IAP_PACKAGES.map((pkg) => `
    <div class="product-card iap-package">
      <div class="product-head">
        <div class="product-icon">${icon('gem', 20)}</div>
        <h3><span>${pkg.name}</span></h3>
        <span class="price">¥${pkg.price}</span>
      </div>
      <p>获得 ${pkg.gems} 水晶</p>
      <button data-buy-iap="${pkg.id}">${icon('gem', 15)}演示购买</button>
    </div>`).join('');
  body.innerHTML = `<p class="formation-hint">${icon('star', 13)}本原型为演示用途，不会产生真实扣款，购买结果直接写入当前存档。</p>${section('水晶礼包', packages)}`;
}

function buyProduct(key) {
  if (key.startsWith('item:')) {
    const itemId = key.slice(5);
    const item = ITEMS[itemId];
    if (item.currency) {
      if (state.gems < item.cost) return;
      state.gems -= item.cost;
    } else {
      if (state.gold < item.cost) {
        showToast('金币不足');
        return;
      }
      state.gold -= item.cost;
    }
    addItem(itemId, 1);
    renderShop();
    renderHeader();
    autosave();
    showToast(`购买了 ${item.name}`);
    return;
  }
  if (key.startsWith('weapon:')) {
    const weaponId = key.slice(7);
    const weapon = WEAPONS[weaponId];
    if (hasWeaponType(weaponId)) return;
    if (state.gold < weapon.cost) {
      showToast('金币不足');
      return;
    }
    state.gold -= weapon.cost;
    addWeapon(weaponId);
    renderShop();
    renderHeader();
    autosave();
    showToast(`购买了 ${weapon.name}`);
    return;
  }
  if (key.startsWith('armor:')) {
    const armorId = key.slice(6);
    const armor = ARMORS[armorId];
    if (hasArmorType(armorId)) return;
    if (state.gold < armor.cost) {
      showToast('金币不足');
      return;
    }
    state.gold -= armor.cost;
    addArmor(armorId);
    renderShop();
    renderHeader();
    autosave();
    showToast(`购买了 ${armor.name}`);
  }
}

function buyIap(packageId) {
  const pkg = IAP_PACKAGES.find((item) => item.id === packageId);
  if (!pkg) return;
  openModal('演示内购', `<p>确认模拟购买「${pkg.name}」？</p><p>本原型不会产生真实扣款，购买结果直接写入当前存档。</p>`, [
    {
      label: '确认购买',
      onClick: () => {
        state.gems += pkg.gems;
        renderShop();
        renderHeader();
        autosave();
        showToast(`演示购买完成：${pkg.name}`);
      }
    },
    { label: '取消' }
  ]);
}

function openInn() {
  currentTab = 'inn';
  renderInnView();
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === 'inn');
  });
}

function renderInnView() {
  const restCost = innRestCost();
  const restCard = `
    <section class="inn-section">
      <h2 class="shop-section-title">${icon('heart', 15)}旅馆休息</h2>
      <div class="inn-rest">
        <div class="inn-rest-info">
          <div class="inn-rest-icon">${icon('bed', 22)}</div>
          <div>
            <h3>钟点房</h3>
            <p>全队复活并回复满 HP / MP。费用为当前持有金币的 1%（下限 1，上限 200）。</p>
          </div>
        </div>
        <div class="inn-rest-action">
          <span class="price-big">${fmt(restCost)} 金币</span>
          <button data-inn-action="rest" ${state.gold < restCost ? 'disabled' : ''}>${icon('heart', 15)}入住休息</button>
        </div>
      </div>
    </section>`;

  // 招募区：8 个扩展职业直接金币购买
  const recruitCards = RECRUITABLE.map((id) => {
    const cls = CLASSES[id];
    const cost = RECRUIT_COSTS[id];
    const owned = hasClass(id);
    const afford = state.gold >= cost;
    return `
      <div class="product-card ${owned ? 'owned' : ''}">
        <div class="product-head">
          <div class="recruit-sprite">${partySprite(id)}</div>
          <h3><span>${cls.job}</span></h3>
          <span class="price" style="${owned ? 'color:var(--teal)' : ''}">${owned ? '已招募' : `${fmt(cost)} 金币`}</span>
        </div>
        <p>${cls.name} · ${skillNames(cls)}</p>
        <button data-inn-action="recruit" data-recruit="${id}" ${owned ? 'disabled' : afford ? '' : 'disabled'}>${icon(owned ? 'check' : 'users', 15)}${owned ? '已在队伍中' : afford ? '招募组队' : '金币不足'}</button>
      </div>`;
  }).join('');

  $('innView').innerHTML = `
    ${restCard}
    <section class="inn-section">
      <h2 class="shop-section-title">${icon('users', 15)}招募新队友</h2>
      <p class="inn-hint">扩展职业统一使用金币直接招募（非抽卡）。更多冒险角色已加入，可在后续「队伍」界面自由组建出战阵容。</p>
      <div class="product-grid">${recruitCards}</div>
    </section>`;
}

function skillNames(cls) {
  return cls.skills.map((id) => SKILLS[id] ? SKILLS[id].name : id).join(' / ');
}

function recruitClass(id) {
  if (hasClass(id)) {
    showToast('该职业已在队伍中');
    return;
  }
  const cls = CLASSES[id];
  const cost = RECRUIT_COSTS[id];
  if (state.gold < cost) {
    showToast('金币不足');
    return;
  }
  openModal('确认招募', `<p>花费 <b>${fmt(cost)} 金币</b> 招募「${cls.job}」${cls.name}？</p><p>招募后将加入你的待命队伍，可在后续「队伍」界面编入出战阵容。</p>`, [
    {
      label: '确认招募',
      onClick: () => {
        state.gold -= cost;
        const stats = statsFor({ id, level: 1 });
        const weaponInst = addWeaponInstance(cls.weapon);
        const armorInst = addArmorInstance(cls.armor);
        state.roster.push({ id, level: 1, exp: 0, hp: stats.maxHp, mp: stats.maxMp, weapon: weaponInst.uid, armor: armorInst.uid, alive: true, buff: null, row: 'front' });
        renderInnView();
        renderHeader();
        autosave();
        showToast(`${cls.name}（${cls.job}）加入！`);
      }
    },
    { label: '取消' }
  ]);
}

function restAtInn() {
  const cost = innRestCost();
  if (state.gold < cost) {
    showToast('金币不足');
    return;
  }
  state.gold -= cost;
  state.party.forEach((member) => {
    member.alive = true;
    const stats = statsFor(member);
    member.hp = stats.maxHp;
    member.mp = stats.maxMp;
  });
  renderHeader();
  renderPartyList();
  autosave();
  showToast('在旅店休息，队伍已完全回复');
}

function partySprite(job) {
  const color = CLASSES[job].color;
  const hairByJob = {
    knight: '#5b3d2a', priest: '#e8d9ae', mage: '#20324a', monk: '#2e2418',
    red_mage: '#7a1f3d', paladin: '#e8d9ae', ninja: '#1d2438', dragoon: '#3a3f52',
    summoner: '#7a4fa8', bard: '#5b4a2a', geomancer: '#3d4f26', alchemist: '#2e5a2a'
  };
  const hair = hairByJob[job] || '#2e2418';
  let weaponSvg = '';
  if (job === 'knight' || job === 'paladin') {
    weaponSvg = '<path d="M47 15l8 7-22 23-8-7z" fill="#cfd5d2"/><path d="M49 13l9 8" stroke="#8b918e" stroke-width="4"/>';
  } else if (job === 'priest') {
    weaponSvg = '<path d="M47 12l10 44-6 2-10-44z" fill="#c7a45c"/><circle cx="51" cy="13" r="4" fill="#f1d98a"/>';
  } else if (job === 'mage') {
    weaponSvg = '<circle cx="51" cy="14" r="8" fill="#9bd0ee"/><path d="M43 12h18l-8 44h-2z" fill="#3f6da0"/>';
  } else if (job === 'monk') {
    weaponSvg = '<path d="M42 14h16l-4 46h-8z" fill="#b38145"/>';
  } else if (job === 'red_mage' || job === 'dragoon') {
    weaponSvg = '<path d="M46 10l9 8-16 24-9-8z" fill="#c9d1d8"/><line x1="50" y1="12" x2="58" y2="20" stroke="#8b918e" stroke-width="3"/>';
  } else if (job === 'ninja') {
    weaponSvg = '<path d="M42 18h18l-4 42h-10z" fill="#4c5a76"/><path d="M42 22h18" stroke="#1d2430" stroke-width="2"/>';
  } else if (job === 'summoner') {
    weaponSvg = '<path d="M47 14l10 40-6 2-10-40z" fill="#7a4fa8"/><circle cx="51" cy="13" r="5" fill="#d8a7ff"/>';
  } else if (job === 'bard') {
    weaponSvg = '<circle cx="50" cy="30" r="9" fill="none" stroke="#e8c56a" stroke-width="2"/><line x1="58" y1="31" x2="58" y2="16" stroke="#e8c56a" stroke-width="2"/>';
  } else if (job === 'geomancer') {
    weaponSvg = '<path d="M47 12l9 42-5 2-9-42z" fill="#7c9a53"/><circle cx="52" cy="13" r="4" fill="#a8c47a"/>';
  } else if (job === 'alchemist') {
    weaponSvg = '<path d="M45 14a7 7 0 0 1 12 0l-7 18z" fill="#8fcb7a"/><circle cx="51" cy="18" r="3" fill="#f0f7e8"/>';
  }
  return `<svg class="sprite" viewBox="0 0 64 64" role="img" aria-label="${CLASSES[job].job}">
    <rect x="22" y="20" width="20" height="18" rx="6" fill="${hair}"/>
    <rect x="17" y="20" width="30" height="7" fill="${color}"/>
    <rect x="19" y="37" width="26" height="20" fill="${color}"/>
    <rect x="21" y="38" width="22" height="6" fill="rgba(0,0,0,.18)"/>
    <rect x="30" y="43" width="4" height="14" fill="#24313a"/>
    <rect x="22" y="43" width="6" height="14" fill="#24313a"/>
    <rect x="36" y="43" width="6" height="14" fill="#24313a"/>
    ${weaponSvg}
  </svg>`;
}

function enemySprite(type) {
  const common = `<svg class="sprite" viewBox="0 0 64 64" role="img" aria-label="敌人">`;
  if (type === 'blob') {
    return `${common}<ellipse cx="32" cy="39" rx="22" ry="17" fill="#58a36c"/><ellipse cx="24" cy="34" rx="4" ry="5" fill="#102018"/><ellipse cx="40" cy="34" rx="4" ry="5" fill="#102018"/><ellipse cx="32" cy="45" rx="7" ry="4" fill="#2e5c3b"/></svg>`;
  }
  if (type === 'imp') {
    return `${common}<path d="M12 48L32 14l20 34z" fill="#c56b45"/><path d="M20 22l-2-10 8 4zM44 22l2-10-8 4z" fill="#8e3f2b"/><circle cx="26" cy="34" r="3" fill="#1b0d08"/><circle cx="38" cy="34" r="3" fill="#1b0d08"/><path d="M27 43h10l-5 6z" fill="#f2d7a1"/></svg>`;
  }
  if (type === 'golem') {
    return `${common}<rect x="12" y="20" width="40" height="36" fill="#7c6b53"/><rect x="18" y="28" width="8" height="7" fill="#d8a854"/><rect x="38" y="28" width="8" height="7" fill="#d8a854"/><rect x="14" y="42" width="36" height="7" fill="#4b4235"/><path d="M22 52l4 8h12l4-8z" fill="#52483a"/></svg>`;
  }
  if (type === 'serpent') {
    return `${common}<path d="M6 43c8-10 18-10 24-3s14 6 26-4" fill="none" stroke="#3e8f86" stroke-width="9"/><path d="M8 41c8-10 18-10 24-3s14 6 26-4" fill="none" stroke="#67c3ae" stroke-width="4"/><circle cx="12" cy="39" r="4" fill="#d8e6a5"/></svg>`;
  }
  if (type === 'wraith') {
    return `${common}<path d="M20 18v34c0 5 8 8 12 8s12-3 12-8V18z" fill="#9ab7bd"/><path d="M22 26c3-5 6-5 9 0s6-5 9 0" fill="none" stroke="#24343b" stroke-width="3"/><circle cx="27" cy="32" r="3" fill="#24343b"/><circle cx="37" cy="32" r="3" fill="#24343b"/></svg>`;
  }
  if (type === 'beetle') {
    return `${common}<ellipse cx="32" cy="40" rx="22" ry="15" fill="#6d7d52"/><path d="M14 30c8-8 16-10 18-4s0 14-18 14z" fill="#4c5a3b"/><path d="M18 32c3 8 8 11 13 4" fill="none" stroke="#d7c67c" stroke-width="2"/><circle cx="24" cy="35" r="3" fill="#16211a"/><circle cx="40" cy="35" r="3" fill="#16211a"/></svg>`;
  }
  if (type === 'ogre') {
    return `${common}<path d="M14 50c-2-16 8-28 18-28s20 12 18 28z" fill="#8a6a4d"/><circle cx="25" cy="31" r="5" fill="#d7b985"/><circle cx="39" cy="31" r="5" fill="#d7b985"/><circle cx="27" cy="33" r="2" fill="#21150f"/><circle cx="37" cy="33" r="2" fill="#21150f"/><path d="M29 42h6l-3 5z" fill="#4a3325"/></svg>`;
  }
  if (type === 'harpy') {
    return `${common}<path d="M32 12l12 30-24 0z" fill="#6f8fae"/><path d="M10 18c8 4 14 8 18 18M54 18c-8 4-14 8-18 18" fill="none" stroke="#8fb0c9" stroke-width="6"/><circle cx="25" cy="27" r="3" fill="#17242e"/><circle cx="39" cy="27" r="3" fill="#17242e"/><path d="M27 39h10l-5 7z" fill="#e0b866"/></svg>`;
  }
  if (type === 'wisp') {
    return `${common}<circle cx="32" cy="34" r="16" fill="#9fc7e8"/><circle cx="32" cy="34" r="9" fill="#f3e8b0"/><circle cx="27" cy="30" r="2" fill="#20344a"/><circle cx="37" cy="30" r="2" fill="#20344a"/></svg>`;
  }
  if (type === 'knight') {
    return `${common}<rect x="17" y="18" width="30" height="36" fill="#3f4a58"/><rect x="20" y="12" width="24" height="12" fill="#5b6675"/><rect x="25" y="23" width="14" height="6" fill="#222b35"/><rect x="12" y="30" width="40" height="7" fill="#5b6675"/><path d="M42 18l8 4-8 8z" fill="#8fa0b0"/><rect x="20" y="44" width="8" height="12" fill="#2e3640"/><rect x="36" y="44" width="8" height="12" fill="#2e3640"/></svg>`;
  }
  if (type === 'skull') {
    return `${common}<path d="M20 20h24v22c0 7-5 12-12 12s-12-5-12-12z" fill="#d9d2c4"/><circle cx="27" cy="31" r="4" fill="#1a1711"/><circle cx="37" cy="31" r="4" fill="#1a1711"/><path d="M28 47h8v6h-8z" fill="#151310"/></svg>`;
  }
  if (type === 'arch') {
    return `${common}<path d="M16 50c-2-18 4-32 16-32s18 14 16 32z" fill="#53304d"/><path d="M8 20c10 4 14 10 16 18M56 20c-10 4-14 10-16 18" fill="none" stroke="#7c4a72" stroke-width="6"/><circle cx="25" cy="31" r="4" fill="#eec75f"/><circle cx="39" cy="31" r="4" fill="#eec75f"/><path d="M28 43l4 6 4-6z" fill="#d8d4c8"/></svg>`;
  }
  if (type === 'dragon') {
    return `${common}<path d="M14 44c-2-14 8-26 18-26s20 12 18 26z" fill="#b5483c"/><path d="M8 20c8 2 14 8 16 16M56 20c-8 2-14 8-16 16" fill="none" stroke="#d9775c" stroke-width="6"/><path d="M16 18l6-8 4 8zM48 18l-6-8-4 8z" fill="#8e302b"/><circle cx="25" cy="32" r="4" fill="#f2d76b"/><circle cx="39" cy="32" r="4" fill="#f2d76b"/><path d="M28 43h8l-4 8z" fill="#8e302b"/></svg>`;
  }
  if (type === 'omega') {
    return `${common}<circle cx="32" cy="34" r="24" fill="#7d929e"/><circle cx="32" cy="34" r="16" fill="#263744"/><circle cx="32" cy="34" r="7" fill="#e85d4f"/><circle cx="22" cy="24" r="3" fill="#b8c7cd"/><circle cx="42" cy="24" r="3" fill="#b8c7cd"/><circle cx="22" cy="44" r="3" fill="#b8c7cd"/><circle cx="42" cy="44" r="3" fill="#b8c7cd"/></svg>`;
  }
  return `${common}<ellipse cx="32" cy="38" rx="20" ry="14" fill="#7b6655"/><circle cx="26" cy="34" r="3" fill="#151012"/><circle cx="38" cy="34" r="3" fill="#151012"/></svg>`;
}

function startNewGame() {
  state = defaultState();
  saveGame(false);
  explore = null;
  towerRun = null;
  battle = null;
  currentTab = 'map';
  menuTab = 'party';
  goto('screen-main');
  renderAll();
}

function continueGame() {
  if (!loadGame()) {
    showToast('没有找到存档');
    return;
  }
  explore = null;
  towerRun = null;
  battle = null;
  currentTab = 'map';
  menuTab = 'party';
  goto('screen-main');
  renderAll();
  showToast('已读取存档');
}

function gameOverToTitle() {
  battle = null;
  explore = null;
  towerRun = null;
  goto('screen-title');
  renderTitle();
}

function gameOverContinue() {
  battle = null;
  explore = null;
  towerRun = null;
  // 失败后不读档：保留当前（全灭/存档前）状态，回到主菜单由玩家自理（旅店/道具复活）
  goto('screen-main');
  renderAll();
  showToast('已返回主菜单，可前往旅店恢复');
}

function renderTitle() {
  $('continueGameBtn').disabled = !hasSave();
  $('deleteSaveBtn').disabled = !hasSave();
  $('newGameBtn').innerHTML = `${icon('play', 16)}新的冒险`;
  $('continueGameBtn').innerHTML = `${icon('refresh', 16)}继续冒险`;
  $('deleteSaveBtn').innerHTML = `${icon('trash', 16)}删除存档`;
}

function deleteSave() {
  if (!hasSave()) {
    showToast('没有存档可删除');
    return;
  }
  openModal('删除存档', '<p>确认删除当前存档？此操作不可恢复。</p>', [
    {
      label: '确认删除',
      onClick: () => {
        try {
          localStorage.removeItem(SAVE_KEY);
          renderTitle();
          showToast('存档已删除');
        } catch (err) {
          showToast('删除存档失败');
        }
      }
    },
    { label: '取消' }
  ]);
}

// ==========================================================================
// 界面帮助说明：给每个界面挂一个提示按钮，点击后介绍其交互逻辑、核心功能、
// 设计准则与 UI 布局，方便后续开发者快速理解本作的设计意图。
// 结构：[标题, [小节标题, 小节正文HTML][]]
// ==========================================================================
const HELP_GUIDES = {
  title: [
    '标题画面',
    [
      ['交互逻辑', '点击「新的冒险」开新档（覆盖旧档）；「继续冒险」读取本地存档；「删除存档」需二次确认。右上角「?」可随时查看本界面说明。'],
      ['核心功能', '游戏入口。本作是横屏商业手游范式演示：顶栏资源栏 + 底部 dock 导航 + 主视区多页签。'],
      ['设计准则', '商业手游启动页惯例：大 Logo + 突出主 CTA（新冒险/继续），次要操作弱化为幽灵按钮；全屏背景用四元素光效营造奇幻氛围。'],
      ['UI 布局', '居中 Logo（霓虹标题 + 英文副标）→ 操作按钮竖排 → 底部一句项目定位说明。']
    ]
  ],
  map: [
    '冒险页（主视区）',
    [
      ['交互逻辑', '底部 dock「冒险」进入。点击地图上的地区卡开始探索；回廊（塔）为无尽挑战模式。'],
      ['核心功能', '主线推进：烈焰洞窟 → 碧水神殿 → 黄土遗迹 → 疾风之塔 → 暗之王座。地区有「可探索 / 已讨伐 / 未解锁」状态。'],
      ['设计准则', '商业手游大地图惯例：地区卡呈现图标 + 状态标签 + 等级信息，主 CTA（开始探索/再探索）置于卡片底部；未解锁地区置灰加锁。'],
      ['UI 布局', '卡片流式排布（自适应网格）。左上贴边浮窗常驻显示「使命」进度与「队伍」出战状态。']
    ]
  ],
  party: [
    '队伍页（出战/后备）',
    [
      ['交互逻辑', '底部 dock「队伍」进入。出战阵容最多 4 人，可上阵/下阵/调整前后排；点击成员卡上的武器/防具行会弹出换装弹窗，可查看所有已持有装备并一键替换；「道具」「装备」子页分别使用道具与全局换装。'],
      ['核心功能', 'FF3 式前后排：后排近战物理输出 ×0.6、所受物理伤害 ×0.7，远程武器与魔法不受后排影响。后备角色不参与战斗。'],
      ['设计准则', '卡片化成员信息（HP/MP/EXP/攻防速魔精 + 技能 + 装备），前后排与后备用彩色徽章区分；危险操作（下阵）用红色按钮提示。装备不用下拉框，改用弹窗式选择，便于移植到 Unity 后用独立装备面板实现。'],
      ['UI 布局', '顶部子页签（队伍/道具/装备）→ 说明条 → 出战阵容卡片组 → 后备阵容卡片组。左上贴边队伍栏同步显示每人的前后排位置。']
    ]
  ],
  items: [
    '道具页',
    [
      ['交互逻辑', '队伍页内切到「道具」子页。点击「使用」选择作用对象；对倒下队员只能使用复活道具；全体类道具（回满/金币/经验）直接生效。'],
      ['核心功能', '包含恢复（HP/MP）、复活、全体回满、逃跑加成、眩晕、经验/金币等道具，是探索中的主要补给手段。'],
      ['设计准则', '道具卡展示图标 + 名称 + 数量 + 说明；数量为 0 时禁用按钮，保持「拿得到就用得上」的直观反馈。'],
      ['UI 布局', '单列卡片列表，图标居左、使用按钮居右，信息一屏可扫。']
    ]
  ],
  equip: [
    '装备页',
    [
      ['交互逻辑', '队伍页内切到「装备」子页。展示所有已持有的武器/防具，点击「换装」选择装备该装备的队员（上阵或后备均可），选完立即生效。'],
      ['核心功能', '全局装备管理：武器按职业过滤适用队员，防具全职业通用；每件装备标注当前装备人数。'],
      ['设计准则', '与道具页同款卡片复用；无适用队员的武器禁用并提示；避免在下拉框里做装备，改用弹窗/面板选择，贴近 Unity 常见装备 UI。'],
      ['UI 布局', '说明条 → 武器区 → 防具区；每张卡含图标、属性、适用职业、装备人数与换装按钮。']
    ]
  ],
  shop: [
    '商店页（金币/水晶）',
    [
      ['交互逻辑', '底部 dock「商店」进入，含「金币商店」与「水晶商店」两个子页签。购买按钮即时扣资源并静默存档。'],
      ['核心功能', '金币商店卖消耗品与武器防具（已购装备自动点亮）；水晶商店演示内购礼包（水晶充值）。'],
      ['设计准则', '商业手游商店惯例：商品卡含图标/名称/描述/价格，已拥有装备禁用并高亮；水晶为付费货币，礼包卡用金色描边区分。'],
      ['UI 布局', '顶部子页签固定 → 消耗品 → 装备分区；卡片自适应网格。']
    ]
  ],
  inn: [
    '旅店页（休息/招募）',
    [
      ['交互逻辑', '底部 dock「旅店」进入。入住休息需金币（持有金币的 1%，下限 1 上限 200），全队复活并回满；金币足够时可直接招募扩展职业。'],
      ['核心功能', '休息补给 + 招募 8 个扩展职业（金币直购、非抽卡）。招募后进入后备阵容，可在「队伍」页上阵。'],
      ['设计准则', '休息与招募分区展示；招募沿用商品卡样式，已招募职业禁用并显示「已在队伍中」。'],
      ['UI 布局', '休息卡（图标 + 说明 + 费用 + CTA）→ 招募区标题 + 说明条 + 职业卡片网格。']
    ]
  ],
  battle: [
    '战斗界面',
    [
      ['交互逻辑', '回合制：玩家行动 → 敌方行动 → 下一回合。点击左下指令盘选择攻击/技能/道具/逃跑；选择技能后需点选目标（敌方或队友），可取消重选。'],
      ['核心功能', '前后排机制生效（后排近战输出/受击削弱）；技能消耗 MP；击破敌人获得经验与金币；全灭进入游戏结束画面。'],
      ['设计准则', '敌人居右、我方居左，当前行动单位高亮描边；HP/MP 条形化展示；下方日志记录每回合经过，结算面板总结战果。'],
      ['UI 布局', '顶部（标题 + 回合 + 说明按钮）→ 战斗舞台（敌我双方卡牌）→ 底部控制台（日志 + 指令/目标选择）。']
    ]
  ],
  gameover: [
    '游戏结束画面',
    [
      ['交互逻辑', '队伍全灭后出现。可「从最近存档继续」或「返回标题」；右上角「?」可查看本界面说明。'],
      ['核心功能', '失败兜底：不自动回档，回主菜单后靠旅店/道具自救，体现「存档在手」的设计。'],
      ['设计准则', '全灭用醒目红色大字 + 简短文案，两个逃生口操作并列，避免玩家卡死。'],
      ['UI 布局', '居中大标题 → 说明文案 → 操作按钮组。']
    ]
  ]
};

function currentHelpKey() {
  if (!$('screen-main').classList.contains('hidden')) {
    if (currentTab === 'menu') return menuTab;
    return currentTab;
  }
  if (!$('screen-battle').classList.contains('hidden')) return 'battle';
  if (!$('screen-gameover').classList.contains('hidden')) return 'gameover';
  return 'title';
}

function openHelp(key) {
  const guide = HELP_GUIDES[key] || HELP_GUIDES[currentTab] || HELP_GUIDES.title;
  $('helpTitle').textContent = guide[0];
  $('helpBody').innerHTML = guide[1].map(([head, body]) => `<section class="help-section"><h3>${head}</h3><p>${body}</p></section>`).join('');
  $('helpOverlay').classList.remove('hidden');
}

function closeHelp() {
  $('helpOverlay').classList.add('hidden');
}

document.addEventListener('click', (event) => {
  if (!$('helpOverlay').classList.contains('hidden') && event.target.closest('#helpOverlay') && !event.target.closest('.help-panel')) {
    closeHelp();
  }
  const button = event.target.closest('button');
  const targetCard = event.target.closest('[data-battle-target]');
  if (targetCard && battleAction) {
    playerChooseTarget(targetCard.dataset.battleTarget);
    return;
  }
  if (!button) return;

  if (button.id === 'newGameBtn') {
    startNewGame();
    return;
  }
  if (button.id === 'continueGameBtn') {
    continueGame();
    return;
  }
  if (button.id === 'deleteSaveBtn') {
    deleteSave();
    return;
  }
  if (button.id === 'saveBtn') {
    saveGame();
    return;
  }
  if (button.id === 'gameoverContinueBtn') {
    gameOverContinue();
    return;
  }
  if (button.id === 'gameoverTitleBtn') {
    gameOverToTitle();
    return;
  }
  if (button.id === 'titleHelpBtn') {
    openHelp('title');
    return;
  }
  if (button.id === 'mainHelpBtn') {
    openHelp(currentHelpKey());
    return;
  }
  if (button.id === 'battleHelpBtn') {
    openHelp('battle');
    return;
  }
  if (button.id === 'gameoverHelpBtn') {
    openHelp('gameover');
    return;
  }
  if (button.id === 'helpCloseBtn' || button.closest('#helpOverlay')) {
    closeHelp();
    return;
  }
  const openEquip = button.dataset.openEquip;
  if (openEquip) {
    openEquipModal(button.dataset.pool, openEquip, Number(button.dataset.index));
    return;
  }
  const equipOption = button.dataset.equipOption;
  if (equipOption) {
    equipOptionListener(event);
    return;
  }
  const equipTarget = button.dataset.equipTarget;
  if (equipTarget) {
    const [slot, id] = equipTarget.split(':');
    equipTargetPicker(slot, id);
    return;
  }

  const tab = button.dataset.tab;
  if (tab) {
    setMainTab(tab);
    return;
  }
  const shopTabBtn = button.dataset.shopTab;
  if (shopTabBtn) {
    shopTab = shopTabBtn;
    renderShop();
    return;
  }
  const menuTabBtn = button.dataset.menuTab;
  if (menuTabBtn) {
    menuTab = menuTabBtn;
    renderMenuView();
    return;
  }
  const formation = button.dataset.formation;
  if (formation) {
    const pool = button.dataset.pool === 'roster' ? state.roster : state.party;
    const index = Number(button.dataset.index);
    const member = pool[index];
    if (formation === 'deploy') {
      if (state.party.length >= 4) {
        showToast('出战阵容已满 4 人');
        return;
      }
      const [moved] = state.roster.splice(index, 1);
      moved.row = 'front';
      state.party.push(moved);
      autosave();
      showToast(`${CLASSES[moved.id].name} 已上阵（前排）`);
    } else if (formation === 'bench') {
      const [moved] = state.party.splice(index, 1);
      if (moved.row !== 'back') moved.row = 'back';
      state.roster.push(moved);
      autosave();
      showToast(`${CLASSES[moved.id].name} 已转入后备`);
    } else if (formation === 'row') {
      member.row = button.dataset.row === 'back' ? 'back' : 'front';
      autosave();
      showToast(member.row === 'front' ? `${CLASSES[member.id].name} 已移至前排` : `${CLASSES[member.id].name} 已移至后排`);
    }
    renderMenuView();
    renderHeader();
    renderPartyList();
    return;
  }

  const areaAction = button.dataset.areaAction;

  const innAction = button.dataset.innAction;
  if (innAction === 'rest') {
    restAtInn();
    renderInnView();
    renderHeader();
    return;
  }
  if (innAction === 'recruit') {
    recruitClass(button.dataset.recruit);
    return;
  }
  if (areaAction === 'tower') {
    startTowerRun();
    return;
  }
  if (areaAction === 'explore') {
    startExploration(button.dataset.area);
    return;
  }

  const exploreAction = button.dataset.exploreAction;
  if (exploreAction === 'battle') {
    startExploreBattle();
    return;
  }
  if (exploreAction === 'continue') {
    continueExplore();
    return;
  }
  if (exploreAction === 'resolve') {
    resolveExploreEvent();
    return;
  }
  if (exploreAction === 'leave') {
    explore = null;
    renderHeader();
    renderMapView();
    return;
  }

  const towerAction = button.dataset.towerAction;
  if (towerAction === 'battle') {
    startTowerBattle();
    return;
  }
  if (towerAction === 'leave') {
    towerRun = null;
    renderHeader();
    renderMapView();
    return;
  }

  if (button.dataset.buyIap) {
    buyIap(button.dataset.buyIap);
    return;
  }
  if (button.dataset.buy) {
    buyProduct(button.dataset.buy);
    return;
  }
  if (button.dataset.useItem) {
    useItemInMenu(button.dataset.useItem);
    return;
  }

  const battleActionName = button.dataset.battleAction;
  if (battleActionName && battle) {
    const actor = battle.current;
    if (battleActionName === 'attack') {
      setBattleAction({ kind: 'attack', targetType: 'enemy' });
    } else if (battleActionName === 'open-skill') {
      battleMenu = 'skill';
      renderBattleCommand();
    } else if (battleActionName === 'open-item') {
      battleMenu = 'item';
      renderBattleCommand();
    } else if (battleActionName === 'defend') {
      const lines = resolveActorAction(actor, { kind: 'defend' }, null);
      lines.forEach((line) => addBattleLog(line, classifyLog(line)));
      finishActorTurn();
    } else if (battleActionName === 'flee') {
      const lines = resolveActorAction(actor, { kind: 'flee' }, null);
      lines.forEach((line) => addBattleLog(line, classifyLog(line)));
      finishActorTurn();
    } else if (battleActionName === 'skill') {
      const skill = SKILLS[button.dataset.skillId];
      if (skill.target === 'self' || skill.kind === 'defend') {
        const lines = resolveActorAction(actor, { kind: 'skill', skillId: button.dataset.skillId }, null);
        lines.forEach((line) => addBattleLog(line, classifyLog(line)));
        finishActorTurn();
      } else if (skill.target === 'all_ally') {
        const lines = resolveActorAction(actor, { kind: 'skill', skillId: button.dataset.skillId }, null);
        lines.forEach((line) => addBattleLog(line, classifyLog(line)));
        finishActorTurn();
      } else {
        setBattleAction({
          kind: 'skill',
          skillId: button.dataset.skillId,
          targetType: skill.target
        });
      }
    } else if (battleActionName === 'item') {
      const item = ITEMS[button.dataset.itemId];
      if (['escape'].includes(item.kind)) {
        const lines = resolveActorAction(actor, { kind: 'item', itemId: button.dataset.itemId }, null);
        lines.forEach((line) => addBattleLog(line, classifyLog(line)));
        finishActorTurn();
      } else {
        const targetType = item.kind === 'revive' || item.kind === 'heal' || item.kind === 'ether' ? 'ally' : 'enemy';
        setBattleAction({ kind: 'item', itemId: button.dataset.itemId, targetType, itemKind: item.kind });
      }
    } else if (battleActionName === 'back') {
      battleMenu = 'command';
      renderBattleCommand();
    } else if (battleActionName === 'cancel') {
      cancelBattleAction();
    }
    return;
  }
  const resultAction = button.dataset.battleResult;
  if (resultAction) {
    handleBattleResult(resultAction);
  }
});

renderTitle();
