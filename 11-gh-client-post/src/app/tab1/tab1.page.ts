import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  repos: any[] = [];

  // Inyecta el servicio GithubService, ToastController y AlertController
  constructor(
    private githubService: GithubService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  /**
   * Inicializa el componente y recupera los repositorios del usuario.
   * @return {void}
   */
  ngOnInit(): void {
    this.githubService.getUserRepos().subscribe({
      next: data => {
        this.repos = data
        // console.log("Repos: ", this.repos);
      },
      error: error => {
        console.log("Error: ", error);
      }
    })
  }


  /**
   * Elimina un repositorio por su nombre después de confirmación del usuario.
   * @param {any} repository - El objeto del repositorio a eliminar.
   * @return {void}
   */
  async deleteRepository(repository: any): Promise<void> {
    const repoName = repository.name;
    const owner = repository.owner.login;

    // Presenta un cuadro de diálogo de confirmación
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
              // Si el nombre coincide, procede con la eliminación
              this.githubService.deleteRepository(owner, repoName).subscribe(
                () => {
                  // Eliminación exitosa, actualiza la lista de repositorios
                  this.presentSuccessToast('Repository deleted successfully');
                },
                (error) => {
                  console.error('Error deleting repository:', error);
                  this.presentErrorToast('Error deleting repository. Please try again.');
                }
              );
            } else {
              // Si el nombre no coincide, muestra un mensaje de error
              this.presentErrorToast('Repository name does not match. Deletion cancelled.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Presenta un toast de éxito.
   * @param {string} message - El mensaje del toast.
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
   * Presenta un toast de error.
   * @param {string} message - El mensaje del toast.
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

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}
