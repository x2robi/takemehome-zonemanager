import alt from "alt-server";

class ZoneManager {
    constructor() {
        alt.onClient("zoneManager:enterZone", this.playerEnter);
        alt.onClient("zoneManager:leaveZone", this.playerLeave);
    }

    playerEnter = (player: alt.Player, zoneId: number): void => {
        alt.log(`Player #${player.id} enter zone #${zoneId}`)
    }

    playerLeave = (player: alt.Player, zoneId: number): void => {
        alt.log(`Player #${player.id} leave zone #${zoneId}`)
    }
}

new ZoneManager();