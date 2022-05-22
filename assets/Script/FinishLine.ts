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

    @property(cc.AudioClip)
    yahooAudio: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    onBeginContact(contact, self, other){
        // console.log("contact!");
        // console.log("player hit "+other.node.name);
        if(other.node.name == "Player"){
            cc.audioEngine.playEffect(this.yahooAudio, false);

            let user = firebase.auth().currentUser;
            if(user){
                let data = other.node.getComponent("Player");
                firebase.database().ref('users/'+user.uid.toString()+'/'+this.text)
                .set({
                    score: data.score,
                    lives: data.lives,
                });
            }
            // console.log("finish");
            if(this.text == "stage1")
                cc.director.loadScene("Start2");
            else if(this.text == "stage2")
                cc.director.loadScene("GameCompleted");
        }
    }
}
