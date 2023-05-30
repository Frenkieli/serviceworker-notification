// 發送通知文章參考
// https://jonny-huang.github.io/angular/training/21_pwa3/

self.addEventListener('message', (event) => {
  postMessage(event.data, '回傳給主執行緒的訊息');
})


const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};

activateEvent();

self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const action = event.action;
  const link = notification.data.link;
  const link_ok = notification.data.link_ok;
  const link_ng = notification.data.link_ng;
  switch (action) {
    case 'yes':
      if (link_ok) {
        self.clients.openWindow(link_ok);
      }
      break;
    case 'no':
      if (link_ng) {
        self.clients.openWindow(link_ng);
      }
      break;
    case 'close':

      break;
    default:
      if (link) {
        self.clients.openWindow(link);
      }
      break;
  }
  notification.close();
  console.log('notificationclick action is', action);
})

self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  let title = 'Server Push';
  let options = {
    body: 'push TEST',
    icon: './notift.jpg'
  };
  if (event.data) {
    options = event.data.json();
    title = options.title;
  }

  event.waitUntil(self.registration.showNotification(title, options));
});