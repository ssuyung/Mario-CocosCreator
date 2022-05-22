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

    @property(cc.Node)
    loginButton: cc.Node = null;

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    @property(cc.Node)
    loginemail: cc.Node = null;

    @property(cc.Node)
    loginpassword: cc.Node = null;

    @property(cc.Node)
    signupemail: cc.Node = null;

    @property(cc.Node)
    signuppassword: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // console.log("hello");
        let signupbtn = new cc.Component.EventHandler();
        signupbtn.target = this.node;
        signupbtn.component = "SignUpLogin";
        signupbtn.handler = "signup";
        cc.find("Canvas/SignUpBox/SignUpButton").getComponent(cc.Button).clickEvents.push(signupbtn);
        
        // this.button.getComponent(cc.Button).clickEvents.push(startbtn);
        // this.node.getComponent(cc.Button).clickEvents.push(startbtn);
        // this.button.getComponent(cc.Button).clickEvents.push(startbtn);

        let loginbtn = new cc.Component.EventHandler();
        loginbtn.target = this.node;
        loginbtn.component = "SignUpLogin";
        loginbtn.handler = "login";
        cc.find("Canvas/LoginBox/LoginButton").getComponent(cc.Button).clickEvents.push(loginbtn);
        
    }

    login(){
        console.log("login");
        let email = this.loginemail.getComponent(cc.Label).string;
        let password = this.loginpassword.getComponent(cc.Label).string;
        console.log(email);
        console.log(password);
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) =>{
            alert("Signed in as "+ userCredential.user.email);
            cc.director.loadScene("Menu");
        })
        .catch((error)=>{
            alert(error.message);
        });
    }
    
    signup(){
        console.log("signup");
        let email = this.signupemail.getComponent(cc.Label).string;
        let password = this.signuppassword.getComponent(cc.Label).string;
        console.log(email);
        console.log(password);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Sign up successful, "+userCredential.user.email);
        })
        .catch((error)=>{
            alert(error.message);
        });
    }

    // update (dt) {}
}
