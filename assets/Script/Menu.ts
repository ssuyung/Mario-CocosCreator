// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    button: cc.Node = null;

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // console.log("hello");
        let startbtn = new cc.Component.EventHandler();
        startbtn.target = this.node;
        startbtn.component = "Menu";
        startbtn.handler = "loadGameScene";
        // this.node.getComponent(cc.Button).clickEvents.push(startbtn);
        // this.button.getComponent(cc.Button).clickEvents.push(startbtn);
        cc.audioEngine.playMusic(this.bgm, true);
        
        // console.log(cc.find("Canvas/StartButton").getComponent(cc.Button));
        cc.find("Canvas/StartButton").getComponent(cc.Button).clickEvents.push(startbtn);
        // .clickEvents.push(startbtn);
    }
     
    
    loadGameScene(){
        cc.director.loadScene("FirstStage");
        // console.log("click");
    }

    // update (dt) {}
}
