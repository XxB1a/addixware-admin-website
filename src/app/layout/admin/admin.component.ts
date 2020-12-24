import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public navLists = [
    {icon: 'apps', route: 'annonces'},
    {icon: 'post', route: 'blog'},
    // {icon: 'book-open', route: 'projets'},
    {icon: 'book-open', route: 'candidature'},
    {icon: 'settings', route: 'configuration'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
