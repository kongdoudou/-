const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
    let content = fs.readFileSync(path.resolve(__dirname, '1.html'));
    res.end(content)
})


server.listen(3000, function(){
    console.log('server is running at 3000')
})