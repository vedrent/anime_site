const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

const product = [
    {name: 'Стикер в аниме стилистике', category: 'Аксессуары', description: 'Описание стикера на изображении, бла бла бла, ещё какая-нибудь инфа о нём', price: 1000, img: 'src/anime_logo.svg'},
    {name: 'Стикер в аниме стилистике', category: 'Аксессуары', description: 'Описание стикера на изображении, бла бла бла, ещё какая-нибудь инфа о нём', price: 790, img: 'src/LK_logo.svg'},
    {name: 'Манга "Реинкарнация безработного"', category: 'Манга', description: 'История о приключениях в другом мире', price: 1990, img: 'src/jobless_manga.jpg'},
    {name: 'Миниатюра лупы', category: 'Аксессуары', description: 'Это просто миниатюра лупы', price: 100, img: 'src/magnifier_logo.svg'}];

const topics = [
    {title: 'Косплеи', content: 'Обсуждаем лучшие косплеи.'},
    {title: 'Аниме этого сезона', content: 'Делимся мнениями об аниме этого сезона.'},
    {title: 'Любители манги', content: 'Обсуждаем любимую мангу.'},
    {title: 'Фестивали этого года', content: 'Информация о предстоящих фестивалях.'},
    {title: 'Кто лучшая вайфу?', content: 'Обсуждаем, кто же лучшая вайфу.'}
];

async function run() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("animedb");
        await db.collection("product").drop()
        const collection = db.collection("product");
        const results = await collection.insertMany(product);
        console.log(results);

        await db.collection("topics").drop();
        const topicsCollection = db.collection("topics");
        const topicsResults = await topicsCollection.insertMany(topics);
        console.log(topicsResults);

        await db.collection("messages").drop();
        const messagesCollection = db.collection("messages");
        console.log("Database created.");
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
run().catch(console.error);
