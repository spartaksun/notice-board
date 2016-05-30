import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import HomeComponent from '../home/home';


@Component({
  selector: 'notice-board-application',
  template: require('./application.html'),
  directives: [
    ROUTER_DIRECTIVES,
    HomeComponent
  ]
})
@Routes([
  {path: '/', component: HomeComponent},
])
export default class ApplicationComponent {
  constructor() {
    console.log('Run ApplicationComponent');
  }
}
