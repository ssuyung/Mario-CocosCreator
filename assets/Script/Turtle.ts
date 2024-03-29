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

    private turtleSpeed = 150;
    private shellSpeed = 250;
    // private xLowerBound = 340;
    // private xUpperBound = 700;
    private moveDir = 1;
    private anim = null;
    private state = "Normal";
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.anim = this.node.getComponent(cc.Animation);
    }

    update (dt) {
        // console.log("turtle");
        if(this.state == "Normal"){
            // this.node.x += this.turtleSpeed * this.moveDir * dt;
            let current_speed = this.node.getComponent(cc.RigidBody).linearVelocity
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.turtleSpeed*this.moveDir, current_speed.y);
            this.node.scaleX = (this.moveDir >= 0) ? -2 : 2;

            if(this.node.x <= this.xLowerBound) this.moveDir = 1;
            else if(this.node.x >= this.xUpperBound) this.moveDir = -1;
            
        }
        else if(this.state == "Shell"){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        }
        else if(this.state == "ShellMoving"){
            // this.node.x += this.shellSpeed* this.moveDir * dt;
            let current_speed = this.node.getComponent(cc.RigidBody).linearVelocity
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.shellSpeed*this.moveDir, current_speed.y);
        }
        this.playAnimation();
    }
    playAnimation(){
        if(this.state == "Normal"){
            if(!this.anim.getAnimationState("TurtleMove").isPlaying)
                this.node.getComponent(cc.Animation).play("TurtleMove");
        } else if(this.state == "ShellMoving"){
            if(!this.anim.getAnimationState("TurtleShellMove").isPlaying)
                this.node.getComponent(cc.Animation).play("TurtleShellMove");
        }   
    }

    onBeginContact(contact, self, other){
        // console.log("Turtle hit "+other.node.name);
        let normal = contact.getWorldManifold().normal;
        if(this.state == "Normal"){
            if(other.node.name == "Player"){
                if(normal.y > 0) {
                    other.node.getComponent("Player").addScore(200);

                    // console.log("Turtle hit from above");
                    other.node.getComponent("Player").playerJump("Enemy");
                    this.anim.play("TurtleHit");
                    this.state = "Shell";

                    //change collider shape
                    this.node.getComponent(cc.PhysicsPolygonCollider).enabled = false;
                    this.node.getComponent(cc.PhysicsCircleCollider).enabled = true;
                    // console.log(this.node.getComponent(cc.PhysicsPolygonCollider).enabled,
                    // this.node.getComponent(cc.PhysicsCircleCollider).enabled)

                }
                else{
                    // console.log("Player hurt");
                    other.node.getComponent("Player").hurt();
                }
            }
        } else if(this.state == "Shell"){
            if(other.node.name == "Player"){
                if(normal.y>0){
                    if(normal.x >0){
                        this.moveDir = -1;
                        this.state = "ShellMoving";
                    } else if(normal.x <0){
                        this.moveDir = 1;
                        this.state = "ShellMoving";
                    } else {

                    }
                    other.node.getComponent("Player").addScore(200);
                } 
                else{
                    other.node.getComponent("Player").hurt();
                }
            }
            
        } else if(this.state == "ShellMoving"){
            if(other.node.getComponent(cc.PhysicsCollider).tag == 0){
                // console.log("Hit enemy");
                other.node.destroy();
            } else if(other.node.getComponent(cc.PhysicsCollider).tag == 3){ //wall
                this.moveDir *= -1;
            }
            else if(other.node.name == "Player"){
                if(normal.y <=0)
                other.node.getComponent("Player").hurt();
            }
            // else console.log(other.node.getComponent(cc.PhysicsCollider).tag)
        }
    }
}
