import * as dotenv from 'dotenv';
import * as http from 'http';
dotenv.config();

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || '8080', 10);

const server = http.createServer((req, res) => {

    // Set CORS headers manually
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const env = Object.keys(process.env)
        .filter(k => !k.startsWith('npm_'))
        .reduce((memo, k) => {
            memo[k] = process.env[k];
            return memo;
        }, {});

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World (${new Date().toISOString()})\n${JSON.stringify(env, null, 2)}\n`);
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
