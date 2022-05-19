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

    

    // @property
    // eventHandler: cc.Component.EventHandler() = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {
    //     console.log("hello");
    //     let startbtn = new cc.Component.EventHandler();
    //     startbtn.target = this.node;
    //     startbtn.component = "menu";
    //     startbtn.handler = "loadGameScene";
    //     this.node.getComponent(cc.Button).clickEvents.push(startbtn);

    //     // cc.find("Canvas/StartButton").getComponent(cc.Button).clickEvents.push(startbtn);
    // }
     
    
    loadGameScene(){
        cc.director.loadScene("main");
        console.log("click");
    }

    // update (dt) {}
}
