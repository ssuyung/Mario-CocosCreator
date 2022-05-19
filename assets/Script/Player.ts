// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private moveDir = 0;

    private playerSpeed = 150;
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        console.log("check");
        
    }
      
    start () {

    }
    
    playerMove(moveDir: number)
    {
        this.moveDir = moveDir;
        // this.node.getComponent(cc.RigidBody).linearVelocity
    }
    update (dt) {
        this.node.x += this.playerSpeed * this.moveDir * dt;
        this.node.scaleX = (this.moveDir >= 0) ? 1 : -1;
        // this.node.y = (this.node.y >= this.ceilingPos) ? this.ceilingPos : this.node.y;
        // if(this.getComponent(cc.RigidBody).linearVelocity.y != this.playerStandSpeed)
        //     this.fallDown = true;
        // else
        //     this.fallDown = false;

        // if(this.damageTime > 0)
        //     this.damageTime -= dt;
        // else
        //     this.damageTime = 0;

        // this.playerAnimation();
    }
    onBeginContact(contact, other, self){
        // console.log("contact!");
    }
}
