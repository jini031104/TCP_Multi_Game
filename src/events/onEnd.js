import { getGameSession } from '../session/game.session.js';
import { removeUser } from '../session/user.session.js';

export const onEnd = (socket) => async (err) => {
    console.log(`클라이언트 연결이 종료됐다: ${socket.remoteAddress}:${socket.remotePort}`);

    await removeUser(socket);

    const gameSession = getGameSession();
    gameSession.removeUser(socket);
};
