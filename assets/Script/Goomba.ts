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

    @property
    xLowerBound: number = 340;

    @property
    xUpperBound: number = 700;

    private speed:number = 150;
    private moveDir: number =1;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        console.log("goomba start");
    }

    update (dt) {
        console.log(this.node.getPosition());
        let current_speed = this.node.getComponent(cc.RigidBody).linearVelocity;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed*this.moveDir, current_speed.y);
        this.node.scaleX = (this.moveDir >= 0) ? -2 : 2;

        if(this.node.x <= this.xLowerBound) this.moveDir = 1;
        else if(this.node.x >= this.xUpperBound) this.moveDir = -1;
    }

    onBeginContact(contact, self, other){
        // console.log("Goomba hit "+other.node.name);
        let normal = contact.getWorldManifold().normal;
        if(other.node.name == "Player"){
            if(normal.y > 0) {
                // console.log("goomba hit from above");
                // this.die();
                other.node.getComponent("Player").playerJump("Enemy");
                this.node.getComponent(cc.Animation).play("GoombaHit");
                this.schedule(function(){
                    this.node.destroy();
                }, 0.5);
            }
            else{
                // console.log("Player hurt");
                other.node.getComponent("Player").hurt();
            }
        }
    }
}
