import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  user: any = {};
  constructor(private githubService: GithubService) {}

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
}
