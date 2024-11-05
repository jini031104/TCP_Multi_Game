class User {
    constructor(socket, id, playerId, latency, coords) {
        this.socket = socket;
        this.id = id;
        this.playerId = playerId;
        this.latency = latency;
        this.x = coords.x;
        this.y = coords.y;
        this.lastUpdateTime = Date.now();
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
        this.lastUpdateTime = Date.now();
    }
}

export default User;
