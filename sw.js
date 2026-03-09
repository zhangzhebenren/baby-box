// sw.js
const CACHE_NAME = 'baby-box-v1';
const ASSETS = [
  './',
  './index.html',
  // 如果你有录音文件，记得加在这里，例如：'./baba.mp3'
];

// 安装阶段：把资源存入缓存
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', (e) => {
  console.log('Service Worker 激活成功');
});

// 拦截请求：优先从缓存读取（实现离线运行）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});