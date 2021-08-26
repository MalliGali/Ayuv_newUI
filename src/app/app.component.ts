import {Component, OnInit} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit{
  subscription: Subscription;
  title = 'dashboard';
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    if(!localStorage.getItem(`users`)) {
      this.router.navigate(['login'])
    }
  }
}

