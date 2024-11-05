import User from '../../class/models/user.class.js';
import { HANDELR_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createUser, findUserByDeviceID, updateUserLogin } from '../../db/user/user.db.js';
import { getGameSession } from '../../session/game.session.js';
import { addUser } from '../../session/user.session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const initialHandler = async ({ socket, userId, payload }) => {
    try {
        const { deviceId, playerId, latency } = payload;
        let user = await findUserByDeviceID(deviceId);
        const coords = { x: 0, y: 0 };

        if (!user) {
            await createUser(deviceId);
        } else {
            await updateUserLogin(deviceId);
            coords.x = user.xCoord;
            coords.y = user.yCoord;
        }

        user = new User(socket, deviceId, playerId, latency, coords);
        addUser(user);
        const gameSession = getGameSession();

        gameSession.addUser(user);

        const initialResponse = createResponse(HANDELR_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
            userId: deviceId,
            x: user.x,
            y: user.y,
        });

        socket.write(initialResponse);
    } catch (error) {
        console.error(error);
    }
};

export default initialHandler;
