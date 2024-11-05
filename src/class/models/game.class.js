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
        console.log('userId: ', userId);
        const locationData = this.users
            .filter((user) => {
                console.log('Checking user:', user.id);
                console.log(user.playerId);
                console.log(user.x);
                console.log(user.y);
                return user.id !== userId;
            })
            .map((user) => {
                console.log('Filtered user:', user.id);
                console.log(user.playerId);
                console.log(user.x);
                console.log(user.y);
                return { id: user.id, playerId: user.playerId, x: user.x, y: user.y };
            });
        console.log('========================================================\n');
        return createLocationPacket(locationData);
    }
}

export default Game;
