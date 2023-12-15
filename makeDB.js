// const pg = require('pg')
//
// const config = {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'postgres',
//     database: 'site',
//     port: 5432,
// };
//
// const client = new pg.Client(config);
//
// client.connect(err => {
//     if (err) throw err;
//     else {
//         queryDatabase();
//     }
// });
//
// function queryDatabase() {
//     const query = `
//         DROP TABLE IF EXISTS product;
//         CREATE TABLE product (id serial PRIMARY KEY, name VARCHAR(50), description VARCHAR(200), price INTEGER, img VARCHAR(50));
//         INSERT INTO product (name, description, price, img) VALUES ('Стикер в аниме стилистике', 'Описание стикера на изображении, бла бла бла, ещё какая-нибудь инфа о нём', 1000, 'src/anime_logo.svg');
//         INSERT INTO product (name, description, price, img) VALUES ('Стикер в аниме стилистике', 'Описание стикера на изображении, бла бла бла, ещё какая-нибудь инфа о нём', 790, 'src/LK_logo.svg');
//     `;
//
//     client
//         .query(query)
//         .then(() => {
//             console.log('Table created successfully!');
//             client.end(console.log('Closed client connection'));
//         })
//         .catch(err => console.log(err))
//         .then(() => {
//             console.log('Finished execution, exiting now');
//             process.exit();
//         });
// }

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

const product = [
    {name: 'Стикер в аниме стилистике', description: 'Описание стикера на изображении, бла бла бла, ещё какая-нибудь инфа о нём', price: 1000, img: 'src/anime_logo.svg'},
    {name: 'Стикер в аниме стилистике', description: 'Описание стикера на изображении, бла бла бла, ещё какая-нибудь инфа о нём', price: 790, img: 'src/LK_logo.svg'},
    {name: 'Манга "Реинкарнация безработного"', description: 'История о приключениях в другом мире', price: 1990, img: 'src/jobless_manga.jpg'},
    {name: 'Миниатюра лупы', description: 'Это просто миниатюра лупы', price: 100, img: 'src/magnifier_logo.svg'}];

async function run() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("animedb");
        await db.collection("product").drop()
        const collection = db.collection("product");
        const results = await collection.insertMany(product);
        console.log(results);
        console.log(product);
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
run().catch(console.error);
