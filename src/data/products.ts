export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  detail: string;
  category: string;
  volume?: string;
  alcoholContent?: string;
  shelfLife?: string;
  storage?: string;
  badge?: string;
  rating?: number;
  reviews?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: '朱鹮有机黄酒·经典版',
    price: 168,
    originalPrice: 198,
    image: 'https://picsum.photos/seed/wine1/400/400',
    description: '传统工艺酿造，有机黑米精制',
    detail: '精选秦岭有机黑米，采用传统酿酒工艺，经 180 天自然发酵而成。酒体醇厚，色泽琥珀，带有淡淡的米香和果香，入口柔顺，回味甘甜。富含多种氨基酸和维生素，是养生保健的上佳之选。',
    category: '黄酒',
    volume: '500ml',
    alcoholContent: '12% vol',
    shelfLife: '5 年',
    storage: '阴凉干燥处保存',
    badge: '热销',
    rating: 4.8,
    reviews: 256
  },
  {
    id: 2,
    name: '朱鹮黑米酒·珍藏版',
    price: 288,
    originalPrice: 328,
    image: 'https://picsum.photos/seed/wine2/400/400',
    description: '三年陈酿，口感醇厚',
    detail: '选用三年陈年基酒，融合现代生物发酵技术，酒体更加醇厚丰满。黑色食物富含花青素，具有抗氧化、延缓衰老的功效。适合商务宴请、节日送礼等高端场合。',
    category: '黑米酒',
    volume: '750ml',
    alcoholContent: '14% vol',
    shelfLife: '10 年',
    storage: '恒温 10-15℃保存',
    badge: '新品',
    rating: 4.9,
    reviews: 189
  },
  {
    id: 3,
    name: '朱鹮有机黄酒·礼盒装',
    price: 398,
    originalPrice: 468,
    image: 'https://picsum.photos/seed/gift1/400/400',
    description: '高端礼盒，送礼首选',
    detail: '精美礼盒包装，内含两瓶 500ml 珍藏黄酒及定制酒具一套。礼盒采用环保材料，设计融合朱鹮元素与传统文化，彰显品味与格调。逢年过节、拜访长辈的理想选择。',
    category: '礼盒',
    volume: '500ml×2',
    alcoholContent: '12% vol',
    shelfLife: '5 年',
    storage: '阴凉干燥处保存',
    badge: '礼品',
    rating: 4.9,
    reviews: 342
  },
  {
    id: 4,
    name: '朱鹮糯米酒·清新版',
    price: 98,
    image: 'https://picsum.photos/seed/wine3/400/400',
    description: '低度微甜，女士优选',
    detail: '精选优质糯米，低温发酵 90 天，酒精度低，口感清甜。适合不常饮酒的人群，特别是女性消费者。可冷饮、常温饮用，也可搭配冰淇淋调制特色甜品。',
    category: '糯米酒',
    volume: '350ml',
    alcoholContent: '6% vol',
    shelfLife: '3 年',
    storage: '冷藏风味更佳',
    badge: '低度',
    rating: 4.6,
    reviews: 178
  },
  {
    id: 5,
    name: '朱鹮养生酒· premium',
    price: 588,
    originalPrice: 688,
    image: 'https://picsum.photos/seed/premium1/400/400',
    description: '添加名贵中药材，滋补养生',
    detail: '在传统黄酒基础上，加入人参、枸杞、黄芪等名贵中药材，经特殊工艺浸泡提取。具有补气养血、强身健体的功效。适合中老年人群日常保健饮用，每日一小杯，健康常相伴。',
    category: '养生酒',
    volume: '500ml',
    alcoholContent: '15% vol',
    shelfLife: '8 年',
    storage: '阴凉避光保存',
    badge: '养生',
    rating: 5.0,
    reviews: 96
  },
  {
    id: 6,
    name: '朱鹮年份酒·2018',
    price: 1288,
    image: 'https://picsum.photos/seed/vintage1/400/400',
    description: '五年陈酿，限量发售',
    detail: '2018 年酿造的年份酒，经五年橡木桶陈酿，酒体复杂丰富，层次分明。带有明显的焦糖、干果香气，口感醇厚绵长。全球限量 500 瓶，每一瓶都有独立编号，极具收藏价值。',
    category: '年份酒',
    volume: '750ml',
    alcoholContent: '16% vol',
    shelfLife: '20 年',
    storage: '恒温恒湿酒窖保存',
    badge: '限量',
    rating: 5.0,
    reviews: 42
  }
];

export const categories = ['全部', '黄酒', '黑米酒', '糯米酒', '养生酒', '礼盒', '年份酒'];

const STORAGE_KEY = 'zhuohuan_admin_products';

export function loadProducts(): Product[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  const withStock = products.map(p => ({ ...p, stock: Math.floor(Math.random() * 50 + 50) }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(withStock));
  return withStock;
}
