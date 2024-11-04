import { HANDELR_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getGameSession } from '../../session/game.session.js';
import { addUser } from '../../session/user.session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const initialHandler = ({ socket, userId, payload }) => {
    try {
        const { deviceId, playerId, latency } = payload;
        const user = addUser(socket, deviceId, playerId, latency);
        const gameSession = getGameSession();

        gameSession.addUser(user);

        const initialResponse = createResponse(HANDELR_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
            userId: deviceId,
        });

        socket.write(initialResponse);
    } catch (error) {
        console.error(error);
    }
};

export default initialHandler;
