const getDB = require('./index');
// import getDB from "./index";


function changeToBold(el) {
    if (el.style.fontWeight === 'bold') {
        el.style.fontWeight = 'normal';
    } else {
        el.style.fontWeight = 'bold';
    }
}
async function f(){
    let rows = await (() => {
        return getDB.getInfo()
    });
    // console.log(rows);
    // rows.forEach((num) => {
    //     let rowCurr = num;
    //     console.log(rowCurr);
    // })
    return rows;
}

// getDB.getInfo().then(data => console.log(data))

f();
// f().then(d => console.log(d))