import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  /**
   * Array to store user repositories.
   * @type {any[]}
   */
  repos: any[] = [];

  /**
   * Constructor that injects GithubService, ToastController, and AlertController.
   * @constructor
   * @param {GithubService} githubService - The service for interacting with GitHub API.
   * @param {ToastController} toastController - The controller for displaying toast messages.
   * @param {AlertController} alertController - The controller for displaying alert dialogs.
   * @param {Router} router - The Angular router service.
   */
  constructor(
    private router: Router,
    private githubService: GithubService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  /**
   * Initializes the component and retrieves the user's repositories.
   * @method
   * @name ngOnInit
   * @public
   * @return {void}
   */
  ngOnInit(): void {
    this.getRepositories();
  }

  /**
   * Lifecycle event fired when the user navigates to the page.
   * @method
   * @name ionViewWillEnter
   * @public
   * @return {void}
   */
  ionViewWillEnter(): void {
    this.getRepositories();
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
   * Deletes a repository after user confirmation.
   * @method
   * @name deleteRepository
   * @public
   * @param {any} repository - The repository object to be deleted.
   * @return {void}
   */
  async deleteRepository(repository: any): Promise<void> {
    const repoName = repository.name;
    const owner = repository.owner.login;

    // Display a confirmation dialog
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: `Please type the name of the repository "${repoName}" to confirm deletion.`,
      inputs: [
        {
          name: 'confirmName',
          type: 'text',
          placeholder: 'Type repository name here'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion cancelled');
          }
        },
        {
          text: 'Delete',
          handler: async (data) => {
            const confirmName = data.confirmName;

            if (confirmName === repoName) {
              // If the name matches, proceed with deletion
              this.githubService.deleteRepository(owner, repoName).subscribe({
                next: () => {
                  this.presentSuccessToast('Repository deleted successfully.');
                  this.getRepositories();
                },
                error: (error) => {
                  console.error('Error deleting repository:', error);
                  this.presentErrorToast('Error deleting repository. Please try again.');
                }
              });
            } else {
              // If the name does not match, show an error message
              this.presentErrorToast('Repository name does not match. Deletion cancelled.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Navigates to the page for creating a new album.
   */
  navigateToEditRepository(repository: any) {
    this.router.navigate(['/edit-repository'], {
      state: {
        owner: repository.owner.login,
        name: repository.name,
        description: repository.description,
        private: repository.private // Enviamos 'private' si el repositorio es privado, 'public' si es público
      }
    });
  }

  /**
   * Displays a success toast.
   * @method
   * @name presentSuccessToast
   * @public
   * @param {string} message - The message for the toast.
   * @return {void}
   */
  async presentSuccessToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      position: 'middle'
    });
    toast.present();
  }

  /**
   * Displays an error toast.
   * @method
   * @name presentErrorToast
   * @public
   * @param {string} message - The message for the toast.
   * @return {void}
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
   * Handles the refresh event.
   * @method
   * @name handleRefresh
   * @public
   * @param {any} event - The refresh event.
   * @return {void}
   */
  handleRefresh(event: any): void {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}
