import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  data: any = [];
  name = '';
  private _vps: ViewportScroller;
  
  constructor(
  ) {}

  ngOnInit() {
    this.data = [{
      "name": 'A',
      "value": 1
    }, {
      "name": 'B',
      "value": 2
    }, {
      "name": 'C',
      "value": 3
    }, {
      "name": 'D',
      "value": 4
    }, {
      "name": 'E',
      "value": 5
    }, {
      "name": 'F',
      "value": 6
    }, {
      "name": 'G',
      "value": 7
    }, {
      "name": 'H',
      "value": 8
    }, {
      "name": 'I',
      "value": 9
    }, {
      "name": 'J',
      "value": 10
    }, {
      "name": 'K',
      "value": 11
    }, {
      "name": 'L',
      "value": 12
    }, {
      "name": 'M',
      "value": 13
    }, {
      "name": 'N',
      "value": 14
    }, {
      "name": 'O',
      "value": 15
    }, {
      "name": 'P',
      "value": 16
    }, {
      "name": 'Q',
      "value": 17
    }, {
      "name": 'R',
      "value": 18
    }, {
      "name": 'S',
      "value": 19
    }, {
      "name": 'T',
      "value": 20
    }, {
      "name": 'U',
      "value": 21
    }, {
      "name": 'V',
      "value": 22
    }, {
      "name": 'W',
      "value": 23
    }, {
      "name": 'X',
      "value": 24
    }, {
      "name": 'Y',
      "value": 25
    }, {
      "name": 'Z',
      "value": 26
    }]
  }

  scroll(id) {
    // console.log(`scrolling to ${id}`);
    let el = document.getElementById(id);
    el.scrollIntoView();
  }

}
