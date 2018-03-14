class GithubUser{
    static getPublicaServices(){
        return ['login success']
    }
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
    login(){
        console.log(this,this.username + "开始登陆");
    }
}