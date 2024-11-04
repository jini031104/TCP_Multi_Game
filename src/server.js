import net from 'net';
import { HOST, PORT } from './constants/env.js';

const server = net.createServer();

server.listen(PORT, HOST, () => {
    console.log(`서버가 실행 중이다: ${HOST}:${PORT}`);
});
