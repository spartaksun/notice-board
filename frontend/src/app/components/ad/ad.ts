import {Category} from "../category/category";

export class Ad {
    constructor(public id:number,
                public title:string,
                public description:string,
                public price:string,
                public category:Category,
                public bargain:boolean,
                public delivery:boolean,
                public delivery_description:string) {
    }
}