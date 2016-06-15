import {User} from "./user-service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

    public user:User;

    constructor() {
        this.user = new User('', '');
    }
}