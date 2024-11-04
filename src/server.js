import net from 'net';
import { HOST, PORT } from './constants/env.js';
import { onConnection } from './events/onConnection.js';

const server = net.createServer(onConnection);

server.listen(PORT, HOST, () => {
    console.log(`서버가 실행 중이다: ${HOST}:${PORT}`);
});
