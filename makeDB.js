
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
