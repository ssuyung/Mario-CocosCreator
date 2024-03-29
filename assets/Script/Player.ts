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

    @property(cc.Label)
    scorelabel: cc.Label = null;

    @property
    score: number = 0;

    @property(cc.Prefab)
    coin: cc.Prefab = null;

    @property(cc.AudioClip)
    jumpAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    walkAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    loseLifeAudio: cc.AudioClip = null;

    private moveDir = 0;
    private fallDown: boolean = false;
    private playerSpeed = 300;
    private playerJumpSpeed = 500;
    private playerHitJumpSpeed = 300; //jump speed after hitting enemy
    private idleFrame = null;
    private anim = null;
    private dead = false;
    private lastWalkEffectTime=0;
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // console.log("check");
        
    }
      
    start () {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim  = this.getComponent(cc.Animation);
        this.liveslabel.string = this.lives.toString();
        let user = firebase.auth().currentUser
        if(user){
            console.log(user.email);
            console.log(user.uid);
            let handle = this;
            firebase.database().ref('users/'+user.uid.toString()+'/'+this.text).once('value')
            .then(function(snapshot){
                if(snapshot.val()){
                    console.log(snapshot.val().lives);
                    console.log(snapshot.val().score);
                    handle.score = snapshot.val().score;
                    handle.lives = snapshot.val().lives;
                    // update labels
                    handle.scorelabel.string = handle.score.toString();
                    handle.liveslabel.string = handle.lives.toString();
                }
                // else console.log("no data");
            });
        } else {
            console.log("not logged in");
        }
        console.log(this.lives);
        console.log(this.score);

        // let newCoin = cc.instantiate(this.coin);
        // let current_pos = this.node.getPosition();
        // this.node.addChild(newCoin);
        // newCoin.setPosition(current_pos);
    }
    
    playerMove(moveDir: number)
    {
        
        this.moveDir = moveDir;
        // this.node.getComponent(cc.RigidBody).linearVelocity
    }
    playerJump(type: string){
        // console.log("Jump");
        cc.audioEngine.playEffect(this.jumpAudio, false);
        if(type == "Normal"){
            // console.log(this.fallDown);
            if(!this.fallDown){ // Initial contact with ground will have y_speed<0
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.playerJumpSpeed);
            }
        } else if(type == "Enemy"){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.playerHitJumpSpeed);
        }
    }
    update (dt) {
        // this.node.x += this.playerSpeed * this.moveDir * dt;

        if(!this.dead){
            let velocity = this.node.getComponent(cc.RigidBody).linearVelocity 
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed*this.moveDir, velocity.y);
            this.node.scaleX = (this.moveDir >= 0) ? 2 : -2;

            let y_speed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            if(y_speed < 1 && y_speed >=-1) this.fallDown = false;
            else this.fallDown = true;

            if(this.moveDir!=0){
                // console.log(this.lastWalkEffectTime);
                if(Date.now()-this.lastWalkEffectTime > 500){
                    // console.log("check");
                    this.lastWalkEffectTime = Date.now();
                    cc.audioEngine.playEffect(this.walkAudio, false);
                    this.lastWalkEffectTime = Date.now();
                }
                
            }
            this.playerAnimation();
        }

    }
    playerAnimation(){
        if(!this.dead){
            if(this.fallDown){
                if(!this.anim.getAnimationState("Player_Jump").isPlaying)
                    this.anim.play("Player_Jump");
            } else {
                if(this.moveDir == 0)
                {
                    this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
                    this.anim.stop();
                }    
                else if(!this.anim.getAnimationState("Player_Move").isPlaying)
                    this.anim.play("Player_Move");
            }
        }
        
    }
    addScore(number:number){
        this.score += number;
        this.scorelabel.string = this.score.toString();
    }
    hurt(){
        // console.log(this.dead);
        
            // console.log("player hurt");
            this.lives--;
            this.liveslabel.string = this.lives.toString();
            cc.audioEngine.playEffect(this.loseLifeAudio, false);
            if(this.lives<=0){
                cc.director.loadScene("Gameover");
            } else {
                this.node.getComponent(cc.PhysicsCollider).enabled = false;
                // console.log("player collider enabled: " + this.node.getComponent(cc.PhysicsCollider).enabled)
                this.dead = true;
                let handle = this;
                let position = this.node.getPosition();
                // console.log("scheduling reborn");
                this.playerJump("Normal");
                this.scheduleOnce(function(){
                    handle.dead = false;
                    // console.log("setting player position");
                    handle.node.getComponent(cc.PhysicsCollider).enabled = true;
                    handle.node.setPosition(cc.v2(position.x + 50, position.y+100));
                    console.log("reborn");
                }, 3)
            }
        
    }
    onBeginContact(contact, self, other){
        // console.log("contact!");
        // console.log("player hit "+other.node.name);
        // if(other.node.name == "FinishLine"){
        //     // console.log("finish");
        //     cc.director.loadScene("Menu");
        // }
    }
}
