let fs = require('fs').promises;

let path = require('path');

let startUrl = path.resolve(__dirname, 'a.txt');
// console.log(startUrl);

async function read(){
    let a = await fs.readFile(startUrl,'utf8');
    let b = await fs.readFile(a, 'utf8');
    return b
}

let it = read();
it.then(data => {
    console.log('data', data);
})
