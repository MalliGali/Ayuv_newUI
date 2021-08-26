import {Component, HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from '../../../theme-options';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
  browserRefresh: any;
  quickLogin: boolean;
  
  constructor(
    public globals: ThemeOptions,
    private route: Router
    ) {
  }
  ngOnInit(): void {
    this.browserRefresh = browserRefresh;
    // // // console.log('refreshed?:', browserRefresh);
    // if(browserRefresh === true) {
    //   localStorage.clear();
    //   sessionStorage.removeItem('username');
    //   this.route.navigate(['login']);
    // } else {
      // if(localStorage.getItem('quickLogin') === 'true') {
      //   this.route.navigate(['home']);
      //   this.quickLogin = true;
      // } else {
        
      // }
    // }
  }

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }
  logout() {
    localStorage.clear()
    sessionStorage.clear();
    return this.route.navigate(['login']);
  }
}
