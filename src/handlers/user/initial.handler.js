import { getGameSession } from '../../session/game.session.js';
import { addUser } from '../../session/user.session.js';

const initialHandler = ({ socket, userId, payload }) => {
    try {
        const { deviceId, playerId, latency } = payload;
        const user = addUser(socket, deviceId, playerId, latency);
        const gameSession = getGameSession();

        gameSession.addUser(user);
    } catch (error) {
        console.error(error);
    }
};

export default initialHandler;
