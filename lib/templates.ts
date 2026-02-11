// 模板配置（纯数据，服务端可用）

export const TEMPLATES_CONFIG = [
  {
    id: 'birthday',
    name: '生日祝福',
    description: '温馨的生日祝福视频，适合送给朋友和家人',
    thumbnail: '/templates/birthday.jpg',
    duration: 150,
    fps: 30,
    width: 1080,
    height: 1920,
    defaultProps: {
      name: '小明',
      age: 25,
      message: '祝你生日快乐，天天开心！',
      primaryColor: '#FF6B6B',
      secondaryColor: '#FFE66D',
    },
    price: 2.99,
  },
  {
    id: 'product-showcase',
    name: '产品展示',
    description: '专业的产品宣传视频，适合电商和营销',
    thumbnail: '/templates/product.jpg',
    duration: 180,
    fps: 30,
    width: 1920,
    height: 1080,
    defaultProps: {
      productName: '超级产品',
      tagline: '改变你的生活',
      price: '¥99',
      features: ['高品质', '易使用', '超值'],
      primaryColor: '#4ECDC4',
      imageUrl: '',
    },
    price: 4.99,
  },
  {
    id: 'data-report',
    name: '数据报告',
    description: '动态数据可视化视频，让数据更生动',
    thumbnail: '/templates/data.jpg',
    duration: 200,
    fps: 30,
    width: 1080,
    height: 1080,
    defaultProps: {
      title: '2024年度报告',
      subtitle: '公司业绩增长情况',
      dataPoints: [
        { label: '营收', value: 85, color: '#FF6B6B' },
        { label: '用户', value: 120, color: '#4ECDC4' },
        { label: '利润', value: 65, color: '#FFE66D' },
      ],
      primaryColor: '#667eea',
    },
    price: 3.99,
  },
  {
    id: 'social-promo',
    name: '社交推广',
    description: '吸睛的社交媒体推广视频',
    thumbnail: '/templates/social.jpg',
    duration: 120,
    fps: 30,
    width: 1080,
    height: 1350,
    defaultProps: {
      headline: '限时优惠！',
      discount: '50% OFF',
      cta: '立即抢购',
      bgImage: '',
      primaryColor: '#FF006E',
    },
    price: 1.99,
  },
];

// 导出兼容旧代码
export const TEMPLATES = TEMPLATES_CONFIG;
