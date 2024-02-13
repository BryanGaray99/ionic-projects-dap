import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-repo',
  templateUrl: './edit-repo.page.html',
  styleUrls: ['./edit-repo.page.scss'],
})
export class EditRepoPage implements OnInit {
  /**
   * Array to store user repositories.
   * @type {any[]}
   */
  repos: any[] = [];

  /** Object to store form data */
  formData: any = {
    name: "",
    description: "",
    private: false,
  };

  /** Flag to track whether the form has been submitted */
  formSubmitted = false;

  /** Variables to store repository information */
  owner: string = "";
  oldName: string = "";

  /**
  * Creates an instance of EditRepoPage.
  * @constructor
  * @param {GithubService} githubService - The service for interacting with the GitHub API.
  * @param {LoadingController} loadingController - The controller for displaying loading indicators.
  * @param {Router} router - The Angular router service.
  * @param {ToastController} toastController - The controller for displaying toast messages.
  */
  constructor(
    private githubService: GithubService,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController
  ) {}

  /**
   * Initialize the component with parameters retrieved from state.
   */
  ngOnInit() {
    // Retrieve parameters from state
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state;
      this.owner = state['owner'];
      this.oldName = state['name'];
      this.formData.name = state['name'];
      this.formData.description = state['description'];
      this.formData.private = state['private']? true : false;
    }
  }

  /**
   * A method that is called when the page is about to leave and triggers the 'getRepositories' method.
   */
  ionViewDidLeave(){
    this.getRepositories();
    window.location.reload();
  }

  /**
   * Retrieves the user's repositories using an HTTP GET request in order of creation.
   * @method
   * @name getRepositories
   * @public
   * @return {void}
   */
  getRepositories(): void {
    this.githubService.getUserRepos().subscribe({
      next: (data) => {
        this.repos = data;
        console.log("Repos: ", this.repos);
      },
      error: error => {
        console.log("Error: ", error);
      }
    })
  }

  /**
  * Handles the form submission.
  * It sets a flag to indicate the form has been submitted, then checks if the form data has a name and description.
  * If so, it creates a loading spinner, calls a githubService method to create a repository, and handles the success
  * and error cases by displaying appropriate messages and navigating to different pages.
  * @method
  * @returns {void}
  */
  onSubmit(): void {
    this.formSubmitted = true;

    if (this.formData.name && this.formData.description) {
      const loading = this.loadingController.create({
        message: 'Updating Repository...'
      }).then(loading => {
        loading.present();
        this.githubService.updateRepository(this.owner, this.oldName, this.formData).subscribe({
          next: (response) => {
            console.log('Repository updated successfully:', response);
            this.presentSuccessToast();
            this.router.navigate(['/tabs/tab1']);
            this.resetForm(); // Clear the form on successful submission
          },
          error: error => {
            console.error('Error updating repository:', error);
            this.presentErrorToast('Error updating repository. Please try again.');
          }
        }).add(() => {
          loading.dismiss();
        });
      });
    } else {
      this.presentWarningToast('Please fill in all required fields');
    }
  }


  /**
  * Resets the form fields and form submission flag.
  * @method
  * @returns {void}
  */
  resetForm(): void {
    this.formData = {
      name: "",
      description: "",
    };
    this.formSubmitted = false;
  }

  /**
  * Presents a success toast message.
  * @async
  * @method
  * @returns {Promise<void>}
  */
  async presentSuccessToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Repository updated successfully',
      duration: 2000,
      color: 'success',
      position: 'middle'
    });
    toast.present();
  }

  /**
  * Presents an error toast message with a custom message.
  * @async
  * @method
  * @param {string} message - The custom error message.
  * @returns {Promise<void>}
  */
  async presentErrorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
  }

  /**
  * Presents a warning toast message with a custom message.
  * @async
  * @method
  * @param {string} message - The custom warning message.
  * @returns {Promise<void>}
  */
  async presentWarningToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'warning',
      position: 'middle'
    });
    toast.present();
  }
}
