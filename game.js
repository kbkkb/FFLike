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
  raise: { name: '复苏', kind: 'revive', power: 0.5, cost: 12, target: 'ally', desc: '复活一名倒下的队友' }
};

const WEAPONS = {
  iron_sword: { name: '铁剑', power: 7, cost: 220, jobs: ['knight'], mag: 0, desc: '剑士的起点武器' },
  mythril_sword: { name: '秘银剑', power: 14, cost: 900, jobs: ['knight'], mag: 0, desc: '锋利的秘银长剑' },
  flame_sword: { name: '烈焰剑', power: 21, cost: 2200, jobs: ['knight'], mag: 0, desc: '缠绕火焰的传说剑' },
  wood_staff: { name: '木杖', power: 4, cost: 90, jobs: ['priest', 'mage'], mag: 4, desc: '普通施法杖' },
  mythril_staff: { name: '秘银杖', power: 8, cost: 800, jobs: ['priest', 'mage'], mag: 9, desc: '强化魔法威力' },
  sage_staff: { name: '贤者之杖', power: 14, cost: 2100, jobs: ['priest', 'mage'], mag: 15, desc: '贤者的高阶法杖' },
  knuckles: { name: '铁拳套', power: 8, cost: 260, jobs: ['monk'], mag: 0, desc: '武僧专用拳套' },
  mythril_knuckles: { name: '秘银拳套', power: 16, cost: 1000, jobs: ['monk'], mag: 0, desc: '轻而致命的拳套' }
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
  star_shard: { name: '星之碎片', desc: '全队复活并回满 HP/MP', cost: 40, currency: 'gem', kind: 'party_heal', power: 0 },
  hourglass: { name: '时之沙漏', desc: '敌方本回合全部跳过', cost: 25, currency: 'gem', kind: 'stun', power: 0 },
  exp_scroll: { name: '经验卷轴', desc: '指定角色获得 500 经验', cost: 30, currency: 'gem', kind: 'exp', power: 500 },
  gold_pouch: { name: '金币袋', desc: '获得 1000 金币', cost: 20, currency: 'gem', kind: 'gold', power: 1000 }
};

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
  village: {
    id: 'village',
    name: '微风村',
    type: 'town',
    level: '安全',
    desc: '出发前的补给点，提供商店、旅店与存档。',
    unlock: () => true
  },
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
  final: { gold: 1500, gems: 150, items: { star_shard: 3 } }
};

const IAP_PACKAGES = [
  { id: 'small', name: '小袋水晶', gems: 60, price: 6, bonus: null },
  { id: 'large', name: '大袋水晶', gems: 300, price: 30, bonus: null },
  { id: 'starter', name: '启程礼包', gems: 120, price: 12, bonus: { star_shard: 2, exp_scroll: 2 } },
  { id: 'weekly', name: '周卡补给包', gems: 300, price: 30, bonus: { star_shard: 5, hi_potion: 10, phoenix: 2 } }
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
let shopTab = 'gold';
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
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
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
  const weapon = WEAPONS[member.weapon] || {};
  const armor = ARMORS[member.armor] || {};
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

function expForNext(level) {
  return Math.floor(80 * Math.pow(1.38, level - 1));
}

function defaultState() {
  const party = [
    { id: 'knight', level: 1, exp: 0, hp: 0, mp: 0, weapon: 'iron_sword', armor: 'cloth', alive: true, buff: null },
    { id: 'priest', level: 1, exp: 0, hp: 0, mp: 0, weapon: 'wood_staff', armor: 'cloth', alive: true, buff: null },
    { id: 'mage', level: 1, exp: 0, hp: 0, mp: 0, weapon: 'wood_staff', armor: 'cloth', alive: true, buff: null },
    { id: 'monk', level: 1, exp: 0, hp: 0, mp: 0, weapon: 'knuckles', armor: 'cloth', alive: true, buff: null }
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
    items: { potion: 3, hi_potion: 0, ether: 1, phoenix: 0, smoke: 1, star_shard: 1, hourglass: 0, exp_scroll: 0, gold_pouch: 0 },
    weapons: ['iron_sword', 'wood_staff', 'wood_staff', 'knuckles'],
    armors: ['cloth', 'cloth', 'cloth', 'cloth'],
    flags: { fire: false, water: false, earth: false, wind: false, final: false },
    tower: { best: 0 },
    party
  };
}

function normalizeState(raw) {
  const base = defaultState();
  if (!raw) return base;
  const merged = {
    ...base,
    ...raw,
    items: { ...base.items, ...(raw.items || {}) },
    flags: { ...base.flags, ...(raw.flags || {}) },
    tower: { ...base.tower, ...(raw.tower || {}) },
    weapons: Array.isArray(raw.weapons) ? raw.weapons : base.weapons,
    armors: Array.isArray(raw.armors) ? raw.armors : base.armors,
    party: Array.isArray(raw.party) ? raw.party.map((member) => ({ ...member, buff: null })) : base.party
  };
  merged.gold = Math.max(0, Math.floor(Number(merged.gold) || 0));
  merged.gems = Math.max(0, Math.floor(Number(merged.gems) || 0));
  Object.keys(merged.items).forEach((id) => {
    if (!Number.isFinite(merged.items[id]) || merged.items[id] < 0) merged.items[id] = 0;
  });
  merged.party = (Array.isArray(raw.party) && raw.party.length === base.party.length
    ? raw.party.map((member, index) => {
        const fallback = base.party[index];
        const cls = CLASSES[member.id] ? CLASSES[member.id] : CLASSES[fallback.id];
        const normalized = { ...fallback, ...member, buff: null };
        normalized.id = cls === CLASSES[member.id] ? member.id : fallback.id;
        normalized.level = Math.max(1, Math.floor(Number(normalized.level) || 1));
        normalized.weapon = merged.weapons.includes(normalized.weapon) ? normalized.weapon : cls.weapon;
        normalized.armor = merged.armors.includes(normalized.armor) ? normalized.armor : cls.armor;
        const stats = statsFor(normalized);
        normalized.hp = Number.isFinite(normalized.hp) ? Math.min(stats.maxHp, Math.max(0, normalized.hp)) : stats.maxHp;
        normalized.mp = Number.isFinite(normalized.mp) ? Math.min(stats.maxMp, Math.max(0, normalized.mp)) : stats.maxMp;
        normalized.alive = !!normalized.alive;
        return normalized;
      })
    : base.party);
  return merged;
}

function addItem(id, count = 1) {
  state.items[id] = (state.items[id] || 0) + count;
}

function addWeapon(id) {
  if (!state.weapons.includes(id)) state.weapons.push(id);
}

function addArmor(id) {
  if (!state.armors.includes(id)) state.armors.push(id);
}

function saveGame(announce = true) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    if (announce) showToast('已存档');
  } catch (err) {
    showToast('存档失败：浏览器未开放本地存储');
  }
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
  $('hudGold').innerHTML = `${icon('coins', 14)}金币 ${fmt(state.gold)}`;
  $('hudGems').innerHTML = `${icon('gem', 14)}水晶 ${fmt(state.gems)}`;
  const location = explore ? AREAS[explore.areaId].name : towerRun ? '永恒回廊' : '微风村';
  $('hudLocation').innerHTML = `${icon('map', 14)}${location}`;
  $('hudFloor').innerHTML = towerRun ? `${icon('tower', 14)}第 ${towerRun.floor} 层` : state.tower.best > 0 ? `${icon('trophy', 14)}回廊 ${state.tower.best} 层` : '';
  $('saveBtn').disabled = !!battle && !battle.over;
  $('saveBtn').innerHTML = `${icon('save', 15)}存档`;
}

function renderObjective() {
  let text = '';
  if (!state.flags.fire) text = '前往烈焰洞窟，取回火焰水晶。先到微风村补给。';
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
        <div class="pc-name">${cls.name}</div>
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
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.innerHTML = button.dataset.tab === 'map'
      ? `${icon('map', 16)}冒险`
      : `${icon('menu', 16)}菜单`;
  });
  renderMapView();
  renderMenuView();
}

function setMainTab(tab) {
  currentTab = tab;
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tab);
    button.innerHTML = button.dataset.tab === 'map'
      ? `${icon('map', 16)}冒险`
      : `${icon('menu', 16)}菜单`;
  });
  $('mapView').classList.toggle('hidden', tab !== 'map');
  $('menuView').classList.toggle('hidden', tab !== 'menu');
  if (tab === 'map') renderMapView();
  else renderMenuView();
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
  if (area.id === 'village') return { label: '安全区', cls: '' };
  if (state.flags[area.id]) return { label: '已讨伐', cls: 'cleared' };
  if (!area.unlock()) return { label: '未解锁', cls: 'locked' };
  return { label: '可探索', cls: '' };
}

function renderAreaList() {
  const html = `<div class="area-list">${Object.values(AREAS).map((area) => {
    const status = areaStatus(area);
    const locked = status.cls === 'locked';
    const cleared = status.cls === 'cleared';
    const areaIcon = area.type === 'town' ? 'home' : area.type === 'tower' ? 'tower' : 'map';
    const statusIcon = locked ? 'lock' : cleared ? 'check' : 'target';
    const actions = area.type === 'town'
      ? `<button data-area-action="shop">${icon('shop', 15)}进入商店</button>
         <button data-area-action="inn">${icon('heart', 15)}旅店住宿 50</button>
         <button data-area-action="save">${icon('save', 15)}存档</button>`
      : area.type === 'tower'
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
}

function continueExplore() {
  explore.index++;
  if (explore.index >= explore.events.length) {
    explore = null;
    renderHeader();
    renderMapView();
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
    weapon: member.weapon,
    armor: member.armor,
    skills: CLASSES[member.id].skills.slice(),
    sprite: member.id
  };
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
    enemyStun: false,
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
    battle.enemyStun = false;
  }
  while (battle.index < battle.order.length) {
    const actor = battle.order[battle.index];
    if (!actor.alive || actor.hp <= 0) {
      battle.index++;
      continue;
    }
    if (battle.enemyStun && actor.side === 'enemy') {
      battle.enemyStun = false;
      addBattleLog(`${actor.name} 被时之沙漏定住，跳过行动。`, 'system');
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
    lines.push(`${actor.name} 攻击 ${target.name}，造成 ${result.damage} 点伤害${result.crit ? '，暴击！' : ''}。`);
  } else if (action.kind === 'skill') {
    const skill = actor.side === 'enemy' ? ENEMY_SKILLS[action.skillId] : SKILLS[action.skillId];
    if (actor.side === 'player' && actor.mp < skill.cost) return ['MP 不足。'];
    if (actor.side === 'player') actor.mp -= skill.cost;
    if (skill.kind === 'attack') {
      const target = targetKey ? findCombatant(targetKey) : battle.enemies.find((e) => e.alive && e.hp > 0);
      if (!target) return ['没有可攻击的目标。'];
      const result = dealDamage(actor, target, skill.power, 'phys', skill.id === 'punch' ? 0.5 : 0);
      lines.push(`${actor.name} 使用 ${skill.name}，对 ${target.name} 造成 ${result.damage} 点伤害${result.crit ? '，暴击！' : ''}。`);
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
  const crit = kind === 'phys' && chance(0.12);
  let damage = Math.max(1, Math.floor((base - resist) * (0.9 + Math.random() * 0.2)));
  if (target.defending) {
    damage = Math.max(1, Math.floor(damage * 0.5));
    target.defending = false;
  }
  if (crit) damage = Math.floor(damage * 1.6);
  target.hp = Math.max(0, target.hp - damage);
  return { damage, crit };
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
  if (item.kind === 'stun') {
    state.items[itemId]--;
    battle.enemyStun = true;
    lines.push('使用时之沙漏，敌方本回合被定住。');
    return lines;
  }
  if (item.kind === 'party_heal') {
    state.items[itemId]--;
    battle.party.forEach((member) => {
      member.alive = true;
      member.hp = member.maxHp;
      member.mp = member.maxMp;
    });
    lines.push('使用星之碎片，全队复活并回满。');
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
      addItem('star_shard', 1);
      lines.push('首领层奖励：20 水晶、星之碎片 ×1。');
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
    const usable = Object.entries(state.items).filter(([id, count]) => count > 0 && ['heal', 'ether', 'revive', 'escape', 'party_heal', 'stun'].includes(ITEMS[id].kind));
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
    </div>
    <div id="menuContent"></div>`;
  if (menuTab === 'party') renderPartyMenu();
  else renderItemsMenu();
}

function renderPartyMenu() {
  const content = $('menuContent');
  content.innerHTML = `<div class="party-menu">${state.party.map((member, index) => {
    const cls = CLASSES[member.id];
    const stats = statsFor(member);
    const weaponOptions = state.weapons.map((id) => {
      const weapon = WEAPONS[id];
      const compatible = weapon.jobs.includes(member.id);
      return `<option value="${id}" ${member.weapon === id ? 'selected' : ''} ${compatible ? '' : 'disabled'}>${weapon.name}${compatible ? '' : '（不可用）'}</option>`;
    }).join('');
    const armorOptions = state.armors.map((id) => `<option value="${id}" ${member.armor === id ? 'selected' : ''}>${ARMORS[id].name}</option>`).join('');
    return `<div class="member-card ${member.alive ? '' : 'dead'}">
      <div class="member-head">
        ${partySprite(member.id)}
        <div><h3>${cls.name}</h3><p>${cls.job} · Lv.${member.level}${member.alive ? '' : ' · 倒下'}</p></div>
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
      <div class="equip-row"><label>武器</label><select data-equip="weapon" data-index="${index}">${weaponOptions}</select></div>
      <div class="equip-row"><label>防具</label><select data-equip="armor" data-index="${index}">${armorOptions}</select></div>
    </div>`;
  }).join('')}</div>`;
}

function renderItemsMenu() {
  const content = $('menuContent');
  const itemIcons = { heal: 'heart', ether: 'zap', revive: 'refresh', escape: 'play', party_heal: 'star', stun: 'target', exp: 'book', gold: 'coins' };
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
  if (item.kind === 'party_heal') {
    state.items[itemId]--;
    state.party.forEach((member) => {
      member.alive = true;
      const stats = statsFor(member);
      member.hp = stats.maxHp;
      member.mp = stats.maxMp;
    });
    renderAll();
    showToast('全队已复活并回满');
    return;
  }
  if (item.kind === 'gold') {
    state.items[itemId]--;
    state.gold += item.power;
    renderAll();
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
    showToast(`已对 ${CLASSES[member.id].name} 使用 ${item.name}`);
  });
}

function openShop(tab = 'gold') {
  shopTab = tab;
  goto('screen-shop');
  renderShop();
}

function renderShop() {
  $('shopGold').innerHTML = `${icon('coins', 14)}金币 ${fmt(state.gold)}`;
  $('shopGems').innerHTML = `${icon('gem', 14)}水晶 ${fmt(state.gems)}`;
  $('shopBackBtn').innerHTML = `${icon('arrow-right', 15)}返回地图`;
  document.querySelectorAll('[data-shop-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.shopTab === shopTab);
    button.innerHTML = button.dataset.shopTab === 'gold'
      ? `${icon('coins', 16)}金币商店`
      : `${icon('gem', 16)}水晶商店`;
  });
  if (shopTab === 'gold') {
    const goldItems = Object.entries(ITEMS).filter(([, item]) => !item.currency);
    const itemIcons = { heal: 'heart', ether: 'zap', revive: 'refresh', escape: 'play', party_heal: 'star', stun: 'target', exp: 'book', gold: 'coins' };
    const weaponCards = Object.values(WEAPONS).map((weapon) => `
      <div class="product-card">
        <div class="product-head">
          <div class="product-icon">${icon('sword', 20)}</div>
          <h3><span>${weapon.name}</span></h3>
          <span class="price">${fmt(weapon.cost)} 金币</span>
        </div>
        <p>${weapon.desc} · 适用 ${weapon.jobs.map((id) => CLASSES[id].job).join('/')}</p>
        <button data-buy="weapon:${Object.keys(WEAPONS).find((id) => WEAPONS[id] === weapon)}" ${state.weapons.includes(Object.keys(WEAPONS).find((id) => WEAPONS[id] === weapon)) ? 'disabled' : ''}>${icon('shop', 15)}购买</button>
      </div>`).join('');
    const armorCards = Object.values(ARMORS).map((armor) => `
      <div class="product-card">
        <div class="product-head">
          <div class="product-icon">${icon('shield', 20)}</div>
          <h3><span>${armor.name}</span></h3>
          <span class="price">${fmt(armor.cost)} 金币</span>
        </div>
        <p>${armor.desc} · 防御 +${armor.def}${armor.mag ? ` · 魔力 +${armor.mag}` : ''}</p>
        <button data-buy="armor:${Object.keys(ARMORS).find((id) => ARMORS[id] === armor)}" ${state.armors.includes(Object.keys(ARMORS).find((id) => ARMORS[id] === armor)) ? 'disabled' : ''}>${icon('shop', 15)}购买</button>
      </div>`).join('');
    $('shopContent').innerHTML = `<h2 class="shop-section-title">消耗品</h2>
      <div class="product-grid">${goldItems.map(([id, item]) => `
        <div class="product-card">
          <div class="product-head">
            <div class="product-icon">${icon(itemIcons[item.kind] || 'package', 20)}</div>
            <h3><span>${item.name}</span></h3>
            <span class="price">${fmt(item.cost)} 金币</span>
          </div>
          <p>${item.desc}</p>
          <button data-buy="item:${id}">${icon('shop', 15)}购买</button>
        </div>`).join('')}
      </div>
      <h2 class="shop-section-title">装备</h2>
      <div class="product-grid">${weaponCards}${armorCards}</div>`;
  } else {
    const packages = IAP_PACKAGES.map((pkg) => `
      <div class="product-card iap-package">
        <div class="product-head">
          <div class="product-icon">${icon('gem', 20)}</div>
          <h3><span>${pkg.name}</span></h3>
          <span class="price">¥${pkg.price}</span>
        </div>
        <p>获得 ${pkg.gems} 水晶${pkg.bonus ? '，并附赠礼包内容。' : ''}</p>
        ${pkg.bonus ? `<div class="iap-bonus">${Object.entries(pkg.bonus).map(([id, count]) => `${ITEMS[id].name} ×${count}`).join('、')}</div>` : ''}
        <button data-buy-iap="${pkg.id}">${icon('gem', 15)}演示购买</button>
      </div>`).join('');
    const gemItems = Object.entries(ITEMS).filter(([, item]) => item.currency);
    $('shopContent').innerHTML = `<h2 class="shop-section-title">水晶礼包</h2>
      <div class="product-grid">${packages}</div>
      <h2 class="shop-section-title">专属道具</h2>
      <div class="product-grid">${gemItems.map(([id, item]) => `
        <div class="product-card">
          <div class="product-head">
            <div class="product-icon">${icon('star', 20)}</div>
            <h3><span>${item.name}</span></h3>
            <span class="price gems">${item.cost} 水晶</span>
          </div>
          <p>${item.desc}</p>
          <button data-buy="item:${id}" ${state.gems < item.cost ? 'disabled' : ''}>${icon('shop', 15)}购买</button>
        </div>`).join('')}
      </div>`;
  }
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
    showToast(`购买了 ${item.name}`);
    return;
  }
  if (key.startsWith('weapon:')) {
    const weaponId = key.slice(7);
    const weapon = WEAPONS[weaponId];
    if (state.weapons.includes(weaponId)) return;
    if (state.gold < weapon.cost) {
      showToast('金币不足');
      return;
    }
    state.gold -= weapon.cost;
    addWeapon(weaponId);
    renderShop();
    renderHeader();
    showToast(`购买了 ${weapon.name}`);
    return;
  }
  if (key.startsWith('armor:')) {
    const armorId = key.slice(6);
    const armor = ARMORS[armorId];
    if (state.armors.includes(armorId)) return;
    if (state.gold < armor.cost) {
      showToast('金币不足');
      return;
    }
    state.gold -= armor.cost;
    addArmor(armorId);
    renderShop();
    renderHeader();
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
        if (pkg.bonus) {
          Object.entries(pkg.bonus).forEach(([id, count]) => addItem(id, count));
        }
        renderShop();
        renderHeader();
        showToast(`演示购买完成：${pkg.name}`);
      }
    },
    { label: '取消' }
  ]);
}

function restAtInn() {
  if (state.gold < 50) {
    showToast('金币不足');
    return;
  }
  state.gold -= 50;
  state.party.forEach((member) => {
    member.alive = true;
    const stats = statsFor(member);
    member.hp = stats.maxHp;
    member.mp = stats.maxMp;
  });
  renderHeader();
  renderPartyList();
  showToast('在旅店休息，队伍已完全回复');
}

function partySprite(job) {
  const color = CLASSES[job].color;
  const hair = job === 'knight' ? '#5b3d2a' : job === 'priest' ? '#e8d9ae' : job === 'mage' ? '#20324a' : '#2e2418';
  const weaponSvg = job === 'knight'
    ? '<path d="M47 15l8 7-22 23-8-7z" fill="#cfd5d2"/><path d="M49 13l9 8" stroke="#8b918e" stroke-width="4"/>'
    : job === 'priest'
      ? '<path d="M47 12l10 44-6 2-10-44z" fill="#c7a45c"/><circle cx="51" cy="13" r="4" fill="#f1d98a"/>'
      : job === 'mage'
        ? '<circle cx="51" cy="14" r="8" fill="#9bd0ee"/><path d="M43 12h18l-8 44h-2z" fill="#3f6da0"/>'
        : '<path d="M42 14h16l-4 46h-8z" fill="#b38145"/>';
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
  if (!loadGame()) {
    state = defaultState();
  }
  goto('screen-main');
  renderAll();
  showToast('从最近存档继续');
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

document.addEventListener('click', (event) => {
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
  if (button.id === 'shopBackBtn') {
    goto('screen-main');
    renderMapView();
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

  const areaAction = button.dataset.areaAction;
  if (areaAction === 'shop') {
    openShop('gold');
    return;
  }
  if (areaAction === 'inn') {
    restAtInn();
    return;
  }
  if (areaAction === 'save') {
    saveGame();
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
      if (['escape', 'party_heal', 'stun'].includes(item.kind)) {
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

document.addEventListener('change', (event) => {
  const select = event.target;
  if (!select.dataset.equip) return;
  const index = Number(select.dataset.index);
  const member = state.party[index];
  if (!member) return;
  member[select.dataset.equip] = select.value;
  renderMenuView();
  renderHeader();
  renderPartyList();
  showToast('装备已更换');
});

renderTitle();
