function changeToBold(el) {
    if (el.style.fontWeight === 'bold') {
        el.style.fontWeight = 'normal';
    } else {
        el.style.fontWeight = 'bold';
    }
}

async function getProducts() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/products", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const products = await response.json();
        let rows = document.getElementById('ul');

        products.forEach(product => {

            // console.log(product);
            let li = document.createElement('li');
                li.innerHTML = "<a>\n" +
        "                    <div class=\"product\">\n" +
        `                        <img src=\"${product.img}\">\n` +
        "                        <div class=\"product-info\">\n" +
        `                            <p>${product.name}</p>\n` +
        "                            <div>\n" +
        `                                <p class=\"description\">${product.description}</p>\n` +
        `                                <div class=\"price\"><p>Цена </p><p>${product.price}р</p></div>\n` +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </a>";
            rows.append(li);
        });
    }
}
getProducts();

function getForm(){
    let form = document.getElementById('form');
    let val = form.productName.value;
    // alert(val);
    search(val);
    return false;

}

async function search(name) {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/search/" + name, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const products = await response.json();
        // alert(products[0].name);
        let rows = document.getElementById('ul');
        rows.innerHTML = ""
        products.forEach(product => {
            // console.log(product);
            let li = document.createElement('li');
            li.innerHTML = "<a>\n" +
                "                    <div class=\"product\">\n" +
                `                        <img src=\"${product.img}\">\n` +
                "                        <div class=\"product-info\">\n" +
                `                            <p>${product.name}</p>\n` +
                "                            <div>\n" +
                `                                <p class=\"description\">${product.description}</p>\n` +
                `                                <div class=\"price\"><p>Цена </p><p>${product.price}р</p></div>\n` +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </a>";

            // alert(1)
            rows.append(li);
        });
    }
}


let themeLink = document.getElementById("colorblind-id");

function colorblindTheme(){
    let currTheme = themeLink.getAttribute("href");
    let theme = ""
    switch (currTheme){
        case "":
            currTheme = "colorblind.css";
            break;
        case "colorblind.css":
            currTheme = "";
            break;
        default:
            break;
    }
    themeLink.setAttribute("href", currTheme);
}

