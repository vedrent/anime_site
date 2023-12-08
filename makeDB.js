const pg = require('pg')

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'site',
    port: 5432,
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
    else {
        queryDatabase();
    }
});

function queryDatabase() {
    const query = `
        DROP TABLE IF EXISTS product;
        CREATE TABLE product (id serial PRIMARY KEY, name VARCHAR(50), description VARCHAR(200), price INTEGER, img VARCHAR(50));
        INSERT INTO product (name, description, price, img) VALUES ('Стикер в аниме стилистике', 'Описание стикера на изображении, бла бла бла, ещё какая-нибудь инфа о нём', 1000, 'src/anime_logo.svg');
        INSERT INTO product (name, description, price, img) VALUES ('Стикер в аниме стилистике', 'Описание стикера на изображении, бла бла бла, ещё какая-нибудь инфа о нём', 790, 'src/LK_logo.svg');
    `;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}