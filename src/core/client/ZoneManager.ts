import alt from "alt-client";

export default class {
    private _size: number = 50;

    private readonly _END_POS: alt.Vector2;
    private readonly _START_POS: alt.Vector2;

    private readonly _zonesX: number;
    private readonly _zonesY: number;

    public activeZone: number = -1;

    constructor(START_POS: alt.Vector2, END_POS: alt.Vector2) {
        this._START_POS = START_POS;
        this._END_POS = END_POS;

        this._zonesX = (this._END_POS.x - this._START_POS.x) / this._size;
        this._zonesY = (this._END_POS.y - this._START_POS.y) / this._size;

        alt.everyTick(() => this.everyTick());
    }

    update(zoneIndex: number): void {
        if (this.activeZone === zoneIndex) return;

        alt.emitServer("zoneManager:leaveZone", this.activeZone);

        this.activeZone = zoneIndex;

        alt.emitServer("zoneManager:enterZone", this.activeZone);
    }

    everyTick(): void {
        const playerPoint = alt.Player.local.pos;

        const x = (playerPoint.x - this._START_POS.x) / this._size;
        const y = (playerPoint.y - this._START_POS.y) / this._size;

        if ((x > this._zonesX) || (y > this._zonesY)) {
            this.update(-1);
        } else {
            this.update(this._zonesX * (Math.floor(y) - 1) + Math.floor(x));   
        }
    }
}
