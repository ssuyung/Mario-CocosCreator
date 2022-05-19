// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property(cc.Node)
    map: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("camera loading");
    }

    update() {
        let player_pos = this.player.getPosition();
        let current_pos = this.node.getPosition();
        let target_pos = player_pos;
        target_pos.x = player_pos.x - this.node.width/2;
        target_pos.y = player_pos.y - this.node.height/2;

        target_pos.x = cc.misc.clampf(target_pos.x, 0, Infinity);
        target_pos.y = cc.misc.clampf(target_pos.y, 0, this.map.height/2);
        current_pos.lerp(target_pos, 0.1, current_pos);
        this.node.setPosition(current_pos);
    }
}