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
        let loginHandler = new cc.Component.EventHandler();
        loginHandler.target = this.node;
        loginHandler.component = "LoginSignUp";
        loginHandler.handler = "userLog";
        console.log(cc.find("Canvas/LoginBox/LoginButton").getComponent(cc.Button).clickEvents);
        cc.find("Canvas/LoginBox/LoginButton").getComponent(cc.Button).clickEvents.push(loginHandler);
        console.log(cc.find("Canvas/LoginBox/LoginButton").getComponent(cc.Button).clickEvents);

        // let signup = new cc.Component.EventHandler();
        // signup.target = this.node;
        // signup.component = "Login";
        // signup.handler = "userSignUp";
        // cc.find("Canvas/SignUpBox/SignUpButton").getComponent(cc.Button).clickEvents.push(signup);
    }
    
    userLog(){
        console.log("loggin in");
    }

    userSignUp(){
        console.log("signing up");
    }

    // update (dt) {}
}
