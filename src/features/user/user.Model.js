import { dbshare } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handling/applicatinError.js";

export default class userModel{
    constructor(name,email,password,type){
//this._id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
       


    }



    // static signin(email,password){

    //     const auth=users.find((u)=>u.email==email && u.password==password)
    //     return auth;
    // }

    static getAll(){
        return users;
    }
}

var users=[
    {
        id:1,
       name:'AdminUser',
       email:'admin@gmail.com',
       password:'Admin1',
       type:'seller'

    },
    {
        id:2,
        name:'customer1',
        email:'customer1@gmail.com',
        password:'customer1',
        type:'customer'
    },
]