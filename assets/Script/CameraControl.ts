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
    liveslabel: cc.Node = null;

    @property(cc.Node)
    lives: cc.Node = null;

    @property(cc.Node)
    scorelabel: cc.Node = null;

    @property(cc.Node)
    score: cc.Node = null;

    @property(cc.Node)
    timer: cc.Node = null;

    @property(cc.Node)
    map: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    background: cc.Node = null;

    private StartTime:number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("camera loading");
        this.StartTime = Date.now();
        console.log(this.StartTime);
    }

    update() {
        console.log((Date.now()-this.StartTime)/1000);
        let player_pos = this.player.getPosition();
        let current_pos = this.node.getPosition();
        let target_pos = player_pos;
        target_pos.x = player_pos.x - this.node.width/2;
        target_pos.y = player_pos.y - this.node.height/2;

        target_pos.x = cc.misc.clampf(target_pos.x, 0, Infinity);
        target_pos.y = cc.misc.clampf(target_pos.y, 0, this.map.height/2);
        current_pos.lerp(target_pos, 0.1, current_pos);
        this.node.setPosition(current_pos);

        //move lives label
        let livesPosition_x = current_pos.x + 150;
        let livesPosition_y = current_pos.y + 550;
        this.lives.setPosition(cc.v2(livesPosition_x,livesPosition_y));

        let livesLabelPosition_x = current_pos.x + 60;
        let livesLabelPosition_y = current_pos.y + 550;
        this.liveslabel.setPosition(cc.v2(livesLabelPosition_x,livesLabelPosition_y));

        let scorePosition_x = current_pos.x + 180;
        let scorePosition_y = current_pos.y + 500;
        this.score.setPosition(cc.v2(scorePosition_x,scorePosition_y));

        let scoreLabelPosition_x = current_pos.x + 60;
        let scoreLabelPosition_y = current_pos.y + 500;
        this.scorelabel.setPosition(cc.v2(scoreLabelPosition_x,scoreLabelPosition_y));

        let timerPosition_x = current_pos.x + 850;
        let timerPosition_y = current_pos.y + 600;
        this.timer.setPosition(cc.v2(timerPosition_x,timerPosition_y));

        let time = (Date.now()-this.StartTime)/1000
        this.timer.getComponent(cc.Label).string = time.toString();

        
        //make background move as 3d
        this.background.x = current_pos.x -200 - current_pos.x*0.1;
    }
}