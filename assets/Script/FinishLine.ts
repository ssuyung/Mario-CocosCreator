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

            // console.log("finish");
            if(this.text == "FirstStage")
                cc.director.loadScene("Start2");
            else if(this.text == "SecondStage")
                cc.director.loadScene("GameCompleted");
        }
    }
}
