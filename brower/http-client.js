const net = require('net');
const htmlparser2 = require("htmlparser2");
const HttpParser = require('./http-parser.js');
const css = require('css');


const cssRules = [];
function parserCss(text) {
    const ast = css.parse(text);
    cssRules.push(...ast.stylesheet.rules);
}

class HTTPRequest {
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.headers = options.headers || {};
    }
    send(body) {
        return new Promise((resolve, reject) => {
            body = Object.keys(body).map(key => `${key}=${encodeURIComponent(body[key])}`).join('&');
            if (body) {
                this.headers['content-length'] = body.length;
            }

            const socket = net.createConnection({
                host: this.host,
                port: this.port
            }, () => {
                let rows = [];
                // 请求行
                rows.push(`${this.method} ${this.path} HTTP/1.1`);
                Object.keys(this.headers).map(key => rows.push(`${key}: ${this.headers[key]}`))
                let requestStr = rows.join('\r\n') + '\r\n\r\n' + body;
                socket.write(requestStr);
            })

            const parser = new HttpParser();
            socket.on('data', function (chunk) { // 事件会触发多次
                parser.parse(chunk);
                if (parser.result) {
                    resolve(parser.result)
                }
            })
        })
    }
}

async function request() {
    let request = new HTTPRequest({
        method: 'GET',
        host: '127.0.0.1',
        port: '3000',
        path: '/',
        headers: {
            name: 'kcj',
            age: 18
        }
    });
    let {
        responseLine,
        headers,
        body
    } = await request.send({
        'address': 'shanxi'
    });

    // HTML -> html-parser -> DOMTREE 词法分析
    let stack = [{
        type: 'document',
        children: []
    }];
    const parser = new htmlparser2.Parser({
        onopentag(name, attributes) {
            let parent = stack[stack.length - 1];
            let element = {
                tagName: name,
                type: 'element',
                children: [],
                attributes,
                parent
            };
            parent.children.push(element);
            stack.push(element);
        },
        ontext(text) {
            let parent = stack[stack.length - 1];
            let element = {
                type: 'text',
                text
            };
            parent.children.push(element);
        },
        onclosetag(name) {
            let parent = stack[stack.length - 1];
            if(name === 'style') {
                let styleStr = parent.children[0].text;
                parserCss(styleStr);
            }
            stack.pop();
        }
    })
    parser.end(body)

    // console.dir(stack, {depth: 100});
    console.dir(cssRules, {depth:100});
}


request();