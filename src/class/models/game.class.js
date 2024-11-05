import { createLocationPacket } from '../../utils/notification/game.notification.js';

class Game {
    constructor(id) {
        this.id = id;
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    getUser(userId) {
        return this.users.find((user) => user.id === userId);
    }

    removeUser(socket) {
        const index = this.users.findIndex((user) => user.socket === socket);
        if (index !== -1) {
            return this.users.splice(index, 1)[0];
        }
    }

    // 나(userId)를 제외한 다른 유저들의 위치값...
    getAllLocation(userId) {
        const locationData = this.users
            .filter((user) => {
                return user.id !== userId;
            })
            .map((user) => {
                return { id: user.id, playerId: user.playerId, x: user.x, y: user.y };
            });
        return createLocationPacket(locationData);
    }
}

export default Game;
