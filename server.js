const http = require("http");
const fs = require('fs');

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

const app = express();
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({extended: false});
app.use(express.static(`${__dirname}`));

(async () => {
    try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("animedb").collection("product");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }catch(err) {
        return console.log(err);
    }
})();

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

    const collection = req.app.locals.collection;
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

    const collection = req.app.locals.collection;
    try{
        const name = req.params.name;
        const products = await collection.find({name:{$regex:name, $options: "i"}}).toArray();
        console.log(products)
        res.send(products);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

// app.get("/catalog",urlencodedParser, async(req, res) => {
//
//     const collection = req.app.locals.collection;
//     try{
//         // const name = new objectId(req.params.productName);
//         const products = await collection.find({name:{$regex:req.body.productName,$options:"i"}}).toArray();
//         res.send(products);
//         // console.log(products);
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// });




