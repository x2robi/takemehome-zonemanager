import * as alt from "alt-server";
import "./ZoneManager";

alt.log(`alt:V Server - Started`);

alt.on("playerConnect", (player: alt.Player) => {
    alt.log(`Player #${player.id} connected`)
    player.model = alt.hash("mp_m_freemode_01");
    player.spawn(813, -279, 66, 0);
})