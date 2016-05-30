import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import HomeComponent from '../home/home';
import NoticeComponent from "../notice/notice";


@Component({
  selector: 'jp-application',
  template: require('./application.html'),
  directives: [
    ROUTER_DIRECTIVES,
    HomeComponent
  ]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/notice', component: NoticeComponent}
])
export default class ApplicationComponent {
  constructor() {
    console.log('Run ApplicationComponent');
  }
}
