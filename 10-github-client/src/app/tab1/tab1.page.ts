import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  repos: any[] = [];
  constructor( private githubService: GithubService) {}

  /**
   * Initialize the component and retrieve user repositories.
   *
   * @return {void}
   */
  ngOnInit(): void {
    this.githubService.getUserRepos().subscribe(data => {
      this.repos = data
      // console.log("Repos: ", this.repos);
    }, error => {
      console.log("Error: ", error);
    })
  }
}
