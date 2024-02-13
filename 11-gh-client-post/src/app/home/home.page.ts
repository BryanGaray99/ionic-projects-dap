import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = {};

  /**
   * Creates an instance of Tab2Page.
   * @constructor
   * @param {GithubService} githubService - The service for interacting with the GitHub API.
   * @param {Router} router - The Angular router service.
   */
  constructor(
    private githubService: GithubService,
    private router: Router,
  ) {}

  /**
   * Initializes the component with the user information from the GitHub service.
   *
   * @return {void}
   */
  ngOnInit(): void {
      this.githubService.getUserInfo().subscribe({
        next: (data) => {
          this.user = data
          console.log("User: ", this.user);
        },
        error: (error) => {
          console.log("Error: ", error);
        }
      })
  };

  continue() {
    this.router.navigate(['/tabs/tabs/tab1']);
  }
}
