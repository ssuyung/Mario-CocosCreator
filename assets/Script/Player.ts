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
    private fallDown: boolean = false;
    private playerSpeed = 300;
    private playerJumpSpeed = 700;
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
    playerJump(){
        let y_speed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
        console.log("Jump");
        // console.log(this.node.getComponent(cc.RigidBody).linearVelocity.y);
        if(y_speed < 1 && y_speed >=-1){ // Initial contact with ground will have y_speed<0
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.playerJumpSpeed);
        }
    }
    update (dt) {
        this.node.x += this.playerSpeed * this.moveDir * dt;
        this.node.scaleX = (this.moveDir >= 0) ? 2 : -2;
        if(this.node.getComponent(cc.RigidBody).linearVelocity.y == 0) this.fallDown = false;
        else this.fallDown = true;
    }
    onBeginContact(contact, other, self){
        // console.log("contact!");
    }
}
