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
    liveslabel: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    lives: number = 3;

    private moveDir = 0;
    private fallDown: boolean = false;
    private playerSpeed = 300;
    private playerJumpSpeed = 500;
    private playerHitJumpSpeed = 300; //jump speed after hitting enemy
    private idleFrame = null;
    private anim = null;
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        console.log("check");
        
    }
      
    start () {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim  = this.getComponent(cc.Animation);
        this.liveslabel.string = this.lives.toString();
    }
    
    playerMove(moveDir: number)
    {
        this.moveDir = moveDir;
        // this.node.getComponent(cc.RigidBody).linearVelocity
    }
    playerJump(type: string){
        // console.log("Jump");
        if(type == "Normal"){
            if(!this.fallDown){ // Initial contact with ground will have y_speed<0
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.playerJumpSpeed);
            }
        } else if(type == "Enemy"){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.playerHitJumpSpeed);
        }
    }
    update (dt) {
        this.node.x += this.playerSpeed * this.moveDir * dt;
        this.node.scaleX = (this.moveDir >= 0) ? 2 : -2;

        let y_speed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
        if(y_speed < 1 && y_speed >=-1) this.fallDown = false;
        else this.fallDown = true;

        this.playerAnimation();


    }
    playerAnimation(){
        if(this.moveDir == 0)
        {
            this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
            this.anim.stop();
        }    
        else if(!this.anim.getAnimationState("Player_Move").isPlaying)
            this.anim.play("Player_Move");
        
    }
    hurt(){
        console.log("player hurt");
        this.lives--;
        this.liveslabel.string = this.lives.toString();
    }
    onBeginContact(contact, other, self){
        // console.log("contact!");
    }
}