// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    player: cc.Node = null;
    
    private offset_x = null;
    private initial_y = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // console.log("background loading");
    }

    start () {
        let player_pos = this.player.getPosition();
        let current_pos = this.node.getPosition();
        this.offset_x = player_pos.x - current_pos.x;
        this.initial_y = current_pos.y;
        // console.log("bg offset: "+this.offset_x+", "+this.offset_y);
    }

    update (dt) {
        // let player_pos = this.player.getPosition();
        // let target_pos_x = player_pos.x - this.offset_x;
        // target_pos_x = cc.misc.clampf(target_pos_x, 0, Infinity);
        // console.log("target_pos: "+target_pos_x+", "+target_pos_y);
        // this.node.setPosition(cc.v2(target_pos_x, this.initial_y));
    }
}
