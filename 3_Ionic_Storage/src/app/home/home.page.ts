import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Main page displaying the list of albums.
 * Allows navigation to the page for creating new albums.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  /** List of albums to be displayed on the page. */
  albums: any[] = [];

  /**
   * Constructor of the component.
   * @param router Routing service for navigation between pages.
   * @param storageService Service for interacting with local storage.
   */
  constructor(
    private router: Router,
    private storageService: StorageService,
  ) { }

  /**
   * Initialization method of the component.
   * Initializes the storage service and loads the list of albums.
   */
  async ngOnInit() {
    // Initializing the storage service
    await this.storageService.init();

    // Retrieving albums stored in the storage service
    await this.storageService.get("albums").then(albums => {
      // Assigning the retrieved albums to the 'albums' property
      this.albums = albums;

      // Logging albums to the console (for debugging purposes)
      console.log(albums);
    }).catch(error => {
      // Handling errors in case of failure to retrieve albums
      console.log("An error occurred", error);
    });
  }

  /**
   * Navigates to the page for creating a new album.
   */
  navigateToAlbumForm() {
    this.router.navigate(['/new-item']);
  }

  /**
   * Deletes an album.
   * @param album The album to be deleted.
   */
  deleteAlbum(album: any) {
    // Find the index of the album in the array
    const index = this.albums.indexOf(album);

    // Remove the album from the array
    if (index !== -1) {
      this.albums.splice(index, 1);

      // Update the storage with the modified array
      this.storageService.set('albums', this.albums);
    }
  }
}
