const http = require("http");
const fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if(err) {
            res.writeHead(500, { 'Content-type': 'text/plain' })
            return res.end('500 — Внутренняя ошибка')
        }
        res.writeHead(responseCode, { 'Content-type': contentType })
        res.end(data)
    })
}

// Создаем веб-сервер с обработчиком запросов
const server = http.createServer((req,res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path) {
        case '':
            serveStaticFile(res, '/index.html', 'text/html; charset=UTF-8')
            break
        case '/catalog':
            serveStaticFile(res, '/index.html', 'text/html; charset=UTF-8')
            break
        case '/forum':
            serveStaticFile(res, '/forum.html', 'text/html; charset=UTF-8')
            break
        case '/lk':
            serveStaticFile(res, '/lk.html', 'text/html; charset=UTF-8')
            break
        case '/style.css':
            serveStaticFile(res, '/style.css', 'text/css; charset=UTF-8')
            break
        case '/src/anime_logo.svg':
            serveStaticFile(res, '/anime_logo.svg', 'image/svg+xml')
            break
        case '/src/catalog_logo.svg':
            serveStaticFile(res, '/src/catalog_logo.svg', 'image/svg+xml')
            break
        case '/src/forum_logo.svg':
            serveStaticFile(res, '/src/forum_logo.svg', 'image/svg+xml')
            break
        case '/src/lk_logo.svg':
            serveStaticFile(res, '/src/LK_logo.svg', 'image/svg+xml')
            break
        default:
            res.writeHead(404, { 'Content-Type': "text/plain; charset=UTF-8" })
            res.end('Не найдено')
            break
    }
})

// Запускаем веб-сервер
server.listen(80, "127.0.0.1", () => {
    const info = server.address();
    console.log(`Сервер запущен ${info}`);
});
