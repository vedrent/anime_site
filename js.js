async function register(username, password, email, phone) {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, phone })
    });
    if (response.ok === true) {
        alert('Регистрация успешна');
    } else {
        alert('Ошибка регистрации');
    }
}

async function login(username, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (response.ok === true) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Вход успешен');
    } else {
        alert('Ошибка входа');
    }
}

async function getProducts(category = '') {
    const response = await fetch("/api/products", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const products = await response.json();
        let rows = document.getElementById('ul');
        rows.innerHTML = "";

        products.forEach(product => {
            if (category && product.category !== category) {
                return;
            }

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
    search(val);
    return false;
}

async function search(name) {
    const response = await fetch("/api/search/" + name, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const products = await response.json();
        let rows = document.getElementById('ul');
        rows.innerHTML = ""
        products.forEach(product => {
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

function filterByCategory(category, el) {
    if (el.style.fontWeight === 'bold') {
        el.style.fontWeight = 'normal';
        getProducts('');
    } else {
        let lis = document.querySelectorAll('li > a')
        for (let li of lis){
            li.style.fontWeight = 'normal';
        }

        el.style.fontWeight = 'bold';
        getProducts(category);
    }
}

let themeLink = document.getElementById("colorblind-id");

function colorblindTheme(){
    let currTheme = themeLink.getAttribute("href");
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

async function loadTopic(title) {
    const token = localStorage.getItem('token');
    const response = await fetch("/api/topics/" + title, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": token
        }
    });
    if (response.ok === true) {
        const topic = await response.json();
        let main = document.querySelector('main');
        main.innerHTML = `<div class="topic"><h3>${topic.title}</h3></div><div class="topic">${topic.content}</div>
            <div class="topic-messages" id="messages"></div><div class="topic forms"><textarea id="messageInput"></textarea>
            <button onclick="postMessage('${title}')">Отправить</button></div>`;
        loadMessages(title);
    }
}

async function loadMessages(topicTitle) {
    const token = localStorage.getItem('token');
    const response = await fetch("/api/messages/" + topicTitle, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": token
        }
    });
    if (response.ok === true) {
        const messages = await response.json();
        let messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = "";
        messages.forEach(message => {
            let messageElement = document.createElement('div');
            messageElement.textContent = message.content;
            messagesDiv.appendChild(messageElement);
        });
    }
}

async function postMessage(topicTitle) {
    const token = localStorage.getItem('token');
    const messageInput = document.getElementById('messageInput');
    const messageContent = messageInput.value;
    const message = {
        topic: topicTitle,
        content: messageContent
    };

    const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(message)
    });

    if (response.ok === true) {
        messageInput.value = "";
        loadMessages(topicTitle);
    }
}

async function getUserInfo() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
    } else {
        alert('Ошибка при загрузке информации о пользователе');
    }
}

async function updateUserInfo() {
    const token = localStorage.getItem('token');
    const userInfo = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(userInfo)
    });
    if (response.ok === true) {
        alert('Информация обновлена');
    } else {
        alert('Ошибка при обновлении информации');
    }
}
