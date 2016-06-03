import {Component} from "@angular/core";
import {Auth} from "../../services/auth.service";

@Component({
    selector: 'board-login-form',
    template: `
      <input type="button" class="btn btn-default btn-lg" (click)="auth.login()" value="Log In" >
`,
    providers: [ Auth ],
})

export class AuthComponent {    
    constructor(public auth: Auth) {}
}