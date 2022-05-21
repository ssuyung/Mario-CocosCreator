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
        if(this.text == "stage1")
            this.scheduleOnce(function(){
                cc.director.loadScene("FirstStage");
            }, 4);
        else if(this.text == "stage2")
            this.scheduleOnce(function(){
                cc.director.loadScene("SecondStage");
            }, 4);
    }

    // update (dt) {}
}
