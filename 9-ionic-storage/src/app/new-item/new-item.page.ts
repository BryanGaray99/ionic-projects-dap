import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

/**
 * Component for adding a new item/album.
 */
@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage {

  /** List of albums retrieved from storage. */
  albums: any[] = [];

  /** Form data for the new album. */
  formData: any = {
    title: "",
    artist: "",
    genre: "",
    coverUrl: ""
  }

  /**
   * Constructor of the component.
   * @param storageService Service for interacting with local storage.
   * @param router Routing service for navigation between pages.
   */
  constructor(private storageService: StorageService, private router: Router) { }

  /**
   * Stores the data from the form.
   */
  async onSubmit() {
    await this.storageService.get('albums').then((albums: any) => {
      // If there are no existing albums, initialize the albums array
      if (!albums) {
        albums = [];
      }
      // Add the new album data to the albums array
      albums.push(this.formData);
      // Save the updated albums array to storage
      this.storageService.set('albums', albums);

    }).catch(error => {
      // Handle errors in case of failure to retrieve or store albums
      console.error("Error adding the album", error);
    });

    // Navigate back to the main page after adding the album
    await this.router.navigate(['/']);
  }
}
