
export const MOCK_PRODUCTS = [
  // --- SMARTPHONES ---
  {
    _id: 's1',
    name: 'iPhone 15 Pro',
    category: 'smartphones',
    price: 999.00,
    description: 'A titanium masterpiece with the A17 Pro chip and a customizable Action button.',
    stock: 15,
    images: [{ url: 'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg' }]
  },
  {
    _id: 's2',
    name: 'Google Pixel 8',
    category: 'smartphones',
    price: 699.00,
    description: 'The helpful Google phone with an incredible camera and built-in AI features.',
    stock: 0, // Testing Out of Stock
    images: [{ url: 'https://static0.pocketnowimages.com/wordpress/wp-content/uploads/wm/2023/10/pixel-8-pro-official-in-house-2-1.jpeg?q=50&fit=crop&w=1600&h=900&dpr=1.5' }]
  },
  {
    _id: 's3',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'smartphones',
    price: 1299.99,
    description: 'The ultimate Android experience with S-Pen support and 200MP camera.',
    stock: 8,
    images: [{ url: 'https://www.zdnet.com/a/img/2024/02/02/1bfa7d30-112c-4906-83a7-ce12551b7b16/galaxy-s24-ultra.jpg' }]
  },

  // --- LAPTOPS ---
  {
    _id: 'l1',
    name: 'MacBook Air M2',
    category: 'laptops',
    price: 1099.00,
    description: 'Strikingly thin and fast, the MacBook Air features the next-generation M2 chip.',
    stock: 20,
    images: [{ url: 'https://icentralstore.in/wp-content/uploads/2024/07/mba13-m2-midnight-gallery1-202402-scaled.jpg' }]
  },
  {
    _id: 'l2',
    name: 'ASUS ROG Zephyrus G14',
    category: 'laptops',
    price: 1599.00,
    description: 'A powerful gaming laptop in a portable 14-inch form factor with RTX graphics.',
    stock: 4,
    images: [{ url: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80' }]
  },
  {
    _id: 'l3',
    name: 'Razer Blade 15',
    category: 'laptops',
    price: 2499.99,
    description: 'Premium gaming performance meets sleek aluminum design.',
    stock: 3,
    images: [{ url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80' }]
  },

  // --- AUDIO ---
  {
    _id: 'a1',
    name: 'Sony WH-1000XM5',
    category: 'audio',
    price: 398.00,
    description: 'Industry-leading noise cancellation and crystal-clear call quality.',
    stock: 12,
    images: [{ url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80' }]
  },
  {
    _id: 'a2',
    name: 'AirPods Pro (2nd Gen)',
    category: 'audio',
    price: 249.00,
    description: 'Magical listening experience with Active Noise Cancellation and spatial audio.',
    stock: 25,
    images: [{ url: 'https://www.apple.com/v/airpods-pro/r/images/overview/welcome/hero_startframe__bfinf01b59si_large.jpg' }]
  },
  {
    _id: 'a3',
    name: 'Marshall Emberton II',
    category: 'audio',
    price: 169.00,
    description: 'Compact portable speaker with the loud and vibrant Marshall sound.',
    stock: 10,
    images: [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUkm0F7k-H8SG4zIJdqvWBZcKNKOO6CactFQ&s' }]
  },
  {
    _id: 'a4',
    name: 'JBL Flip 6',
    category: 'audio',
    price: 129.95,
    description: 'Waterproof portable Bluetooth speaker with powerful sound.',
    stock: 0, // Testing Out of Stock
    images: [{ url: 'https://m.media-amazon.com/images/I/614f5R8ReXL._AC_UF1000,1000_QL80_.jpg' }]
  },

  // --- ACCESSORIES ---
  {
    _id: 'acc1',
    name: 'Anker 737 Power Bank',
    category: 'accessories',
    price: 149.99,
    description: '24,000mAh portable charger with 140W ultra-powerful fast charging.',
    stock: 30,
    images: [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7s_oufg1NJiFcOP2upRkVhJ30y3uBAp0Dqw&s' }]
  },
  {
    _id: 'acc2',
    name: 'Logitech MX Master 3S',
    category: 'accessories',
    price: 99.00,
    description: 'An iconic quiet mouse with 8K DPI and MagSpeed scrolling.',
    stock: 40,
    images: [{ url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80' }]
  },
  {
    _id: 'acc3',
    name: 'Satechi USB-C Multiport',
    category: 'accessories',
    price: 79.99,
    description: 'Slim adapter with 4K HDMI, pass-through charging, and card slots.',
    stock: 15,
    images: [{ url: 'https://www.bhphotovideo.com/images/fb/satechi_st_tcma2g_type_c_multi_port_adapter_4k_1698110.jpg' }]
  },
  {
    _id: 'acc4',
    name: 'Belkin MagSafe Charger',
    category: 'accessories',
    price: 39.99,
    description: 'Fast wireless charging for iPhone with the power of MagSafe.',
    stock: 50,
     images: [{ url: 'https://monodeck.jp/wp-content/uploads/2025/12/iphone-magsafe-13-1024x683.jpg' }]
  }
];