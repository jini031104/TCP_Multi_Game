import dbPool from '../db/database.js';
import { addGameSession } from '../session/game.session.js';
import { testDbConnection } from '../utils/db/testDbConnection.js';
import { loadProtos } from './loadProto.js';
import { v4 as uuidv4 } from 'uuid';

const initServer = async () => {
    const gameId = uuidv4();

    try {
        await loadProtos();
        const gameSession = addGameSession(gameId);
        console.log(gameSession);

        await testDbConnection(dbPool);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default initServer;
