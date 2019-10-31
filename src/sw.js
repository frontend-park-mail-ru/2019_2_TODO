// наименование для нашего хранилища кэша
const CACHE_NAME = 'offline';
const {assets} = global.serviceWorkerOption;
// ссылки на кэшируемые файлы
const cacheUrls = [
    '/',
    'assets/AllCards.png',
    'assets/table-removebg-preview.png',
    // 'index.html',
    // 'main.css',
    // 'main.js',
    // 'components/views/OfflineGameView.js',
    // 'components/views/OfflineGameView.js',
    // 'modules/ajax.js',
    ...assets,
];
console.log(assets);
console.log(cacheUrls)
// assets.append(cacheUrls[0])
self.addEventListener('install', event => {
    // задержим обработку события
    // если произойдёт ошибка, serviceWorker не установится
    // console.log('asd');
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME)
            .then(cache => {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    event.respondWith(
    caches.match(request).then(response => {
        if (response) {

            return response
        }

        // Load and cache known assets.
        return fetch(request)
            .then(responseNetwork => {
                if (!responseNetwork || !responseNetwork.ok) {

                    return responseNetwork
                }


                const responseCache = responseNetwork.clone()

                caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        return cache.put(request, responseCache)
                    })
                    .then(() => {
                    })

                return responseNetwork
            })
            .catch(() => {
                // User is landing on our page.
                if (event.request.mode === 'navigate') {
                    return global.caches.match('./')
                }

                return null
            })
    })
    )


});