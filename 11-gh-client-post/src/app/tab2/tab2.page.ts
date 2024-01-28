import { Component } from '@angular/core';
import { GithubService } from '../services/github.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

/**
 * @description Represents the Tab2Page component.
 * @class
 */
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  /** Array to store repository data */
  repository: any[] = [];

  /** Object to store form data */
  formData: any = {
    name: "",
    description: "",
    private: false,
  };

  /** Flag to track whether the form has been submitted */
  formSubmitted = false;

  /**
   * Creates an instance of Tab2Page.
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
   * Handles the form submission. This code snippet defines an onSubmit method that handles form submission.
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
        message: 'Creating Repository...'
      }).then(loading => {
        loading.present();
        this.githubService.createRepository(this.formData).subscribe(
          (response) => {
            console.log('Repository created successfully:', response);
            this.presentSuccessToast();
            this.router.navigate(['/tabs/tab1']);
            this.resetForm(); // Clear the form on successful submission
          },
          (error) => {
            console.error('Error creating repository:', error);
            if (error.status === 422) {
              // Check if the error is due to the repository name already existing
              this.presentErrorToast('Repository name already exists. Please choose a different name.');
            } else {
              this.presentErrorToast('Error creating repository. Please try again.');
            }
          }
        ).add(() => {
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
      message: 'Repository created successfully',
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
