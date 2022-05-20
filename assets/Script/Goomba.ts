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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        console.log("goomba start");
    }

    // update (dt) {}

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
