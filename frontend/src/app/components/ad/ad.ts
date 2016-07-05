import {Category} from "../category/category";
import {User} from "../../services/user-service";

export class Ad {
    constructor(public id:number,
                public user:User,
                public title:string,
                public description:string,
                public price:string,
                public currency:string,
                public category:Category,
                public bargain:boolean,
                public delivery:boolean,
                public second_hand:boolean,
                public images:AdImage[],
                public delivery_description:string) {
    }
}

export class AdImage {
    constructor(public id:number,
                public file_key:string,
                public format:string) {
    }
}