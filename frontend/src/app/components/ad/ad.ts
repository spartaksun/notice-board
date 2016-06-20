import {Category} from "../category/category";
import {User} from "../../services/user-service";

export class Ad {
    constructor(public id:number,
                public user:User,
                public title:string,
                public description:string,
                public price:string,
                public category:Category,
                public bargain:boolean,
                public delivery:boolean,
                public delivery_description:string) {
    }
}