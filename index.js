const pg = require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'site',
    port: 5432,
};

const client = new pg.Client(config);

// client.connect(err => {
//     if (err) throw err;
// });

// const db = {
//     getAll(){
//         let list = ['','','',''];
//         let q = client.query('select (name, description, price, img) from product');
//         list[0] = (client.query('select (name) from product'))
//         list.push(client.query('select (description) from product'))
//         list.push(client.query('select (price) from product'))
//         list.push(client.query('select (img) from product'))
//         console.log(q)
//         return list;
//     }
// };
// db.getAll()

// function queryDatabase() {
//     const query = `
//         SELECT * from product;
//     `;
//
//     client
//         .query(query)
//         .then(() => {
//             console.log('Select successfully!');
//             client.end(console.log('Closed client connection'));
//         })
//         .catch(err => console.log(err))
//         .then(() => {
//             console.log('Finished execution, exiting now');
//             process.exit();
//         });
//     return query;
// }
// console.log(queryDatabase())
// client.query("SELECT * from product").then((data) => console.log(data.rows))

async function run() {
    try {
        await client.connect(err => {
            if (err) throw err;
        });
        const res = getInfo();

    }catch(err) {
        console.log(err);
    } finally {
        // await mongoClient.close();
    }
}

function getInfo(){
    let mass = ['','','',''];
    // let q = client.query('select (name, description, price, img) from product');
    client.query("SELECT name from product").then((data) => {
        mass[0] = data.rows;
    })
    client.query("SELECT description from product").then((data) => {
        mass[1] = data.rows;
    })
    client.query("SELECT price from product").then((data) => {
        mass[2] = data.rows;
    })
    client.query("SELECT img from product").then((data) => {
        mass[3] = data.rows;
        // console.log(mass)
    })
    return mass;
}

// const getDB = {
//     async function getInfo(){
//         let mass = ['','','',''];
//         // let q = client.query('select (name, description, price, img) from product');
//         client.query("SELECT name from product").then((data) => {
//             mass[0] = data.rows;
//         })
//         client.query("SELECT description from product").then((data) => {
//             mass[1] = data.rows;
//         })
//         client.query("SELECT price from product").then((data) => {
//             mass[2] = data.rows;
//         })
//         await client.query("SELECT img from product").then((data) => {
//             mass[3] = data.rows;
//             // console.log(mass)
//         })
//         return mass;
//     }
// }

run().catch(console.error);


// let data = async () => {
//     return await getDB.getInfo();
// }
// console.log(data())
// module.exports = getDB;
// module.exports = db;