import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage-angular";

/**
 * Service for interacting with local storage using Ionic Storage.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  /**
   * Constructor of the StorageService.
   * @param storage Ionic Storage service for local storage interactions.
   */
  constructor(private storage: Storage) {
    // Initialize the storage service when the service is constructed
    this.init();
  }

  /**
   * Initializes the storage service.
   */
  async init() {
    // Check if the storage service is not already initialized
    if (!this._storage) {
      // Create an instance of the Ionic Storage service
      const storage = await this.storage.create();
      this._storage = storage;
    }
  }

  /**
   * Creates or updates a storage entry.
   * @param key Key for the storage entry.
   * @param value Value to be stored.
   */
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  /**
   * Retrieves the value of a storage entry.
   * @param key Key of the storage entry.
   * @returns The value of the storage entry.
   */
  public async get(key: string) {
    try {
      // Check if the storage service is initialized
      if (this._storage) {
        const value = await this._storage.get(key);
        return value;
      } else {
        console.log("Storage not initialized");
      }
    } catch (error) {
      console.error("Error accessing storage", error);
    }
  }

  /**
   * Deletes a storage entry.
   * @param key Key of the storage entry to be deleted.
   */
  public async remove2(key:string){
    this._storage?.remove(key);
  }
}
