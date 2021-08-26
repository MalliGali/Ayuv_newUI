import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../theme-options';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  user: any;
  password: any;
  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  sideBarOpen = true;
  browserRefresh: any;
  quickLogin: boolean;
  emailId: any;

  constructor(
    public globals: ThemeOptions,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
    ) {

  }

  @select('config') public config$: Observable<any>;

  private newInnerWidth: number;
  private innerWidth: number;
  activeId = 'dashboardsMenu';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
    // // // console.log('refreshed?:', browserRefresh);
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });
    this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.password = JSON.parse(localStorage.getItem('users')).password;
    this.getUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }

  }

  getUser() {
    this.userService.getAyuvUser().subscribe(
      (res) => {
        res.map(e => {
          if(this.user.username === e.username)
          console.log(e);
          this.emailId = e.nhsEmailId;
        })
      },
      (err) => {
        // console.log(err)
      }
    )
  }
  
}
