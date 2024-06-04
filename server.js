const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const url = "mongodb://127.0.0.1:27017/";
const secretKey = 'some_secret_key';
const mongoClient = new MongoClient(url);

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}`));

(async () => {
    try {
        await mongoClient.connect();
        app.locals.product = mongoClient.db("animedb").collection("product");
        app.locals.topics = mongoClient.db("animedb").collection("topics");
        app.locals.messages = mongoClient.db("animedb").collection("messages");
        app.locals.users = mongoClient.db("animedb").collection("users");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }catch(err) {
        return console.log(err);
    }
})();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/api/register', async (req, res) => {
    const collection = req.app.locals.users;
    try {
        const { username, password, email, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword, email, phone };
        const result = await collection.insertOne(newUser);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/api/login', async (req, res) => {
    const collection = req.app.locals.users;
    try {
        const { username, password } = req.body;
        const user = await collection.findOne({ username });
        if (!user) return res.sendStatus(401);

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.sendStatus(401);

        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get('/catalog', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get('/forum', (req, res) => {
    res.sendFile(__dirname + "/forum.html");
});
app.get('/lk', (req, res) => {
    res.sendFile(__dirname + "/lk.html");
});

app.get("/api/products", async(req, res) => {

    const collection = req.app.locals.product;
    try{
        const products = await collection.find({}).toArray();
        res.send(products);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/api/search/:name", async(req, res) => {

    const collection = req.app.locals.product;
    try{
        const name = req.params.name;
        const products = await collection.find({name:{$regex:name, $options: "i"}}).toArray();
        res.send(products);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/api/topics/:title", authenticateToken, async (req, res) => {

    const collection = req.app.locals.topics;
    try {
        const title = req.params.title;
        const topic = await collection.findOne({ title: title });
        res.send(topic);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/api/messages/:topicTitle", authenticateToken, async (req, res) => {

    const collection = req.app.locals.messages;
    try {
        const topicTitle = req.params.topicTitle;
        const messages = await collection.find({ topic: topicTitle }).toArray();
        res.send(messages);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post("/api/messages", authenticateToken, async (req, res) => {

    const collection = req.app.locals.messages;
    try {
        const message = req.body;
        const result = await collection.insertOne(message);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/api/user', authenticateToken, async (req, res) => {

    const collection = req.app.locals.users;
    try {
        const username = req.user.username;
        const user = await collection.findOne({ username }, { projection: { password: 0 } });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.put('/api/user', authenticateToken, async (req, res) => {

    const collection = req.app.locals.users;
    try {
        const username = req.user.username;
        const newUserInfo = req.body;
        const result = await collection.updateOne(
            { username },
            { $set: newUserInfo }
        );
        res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
