import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class UploadService {
  async uploadFile(file: File): Promise<string> {
    // Replace with your real upload API or Cloudinary later.
    // For now, return a local preview URL so the workflow is complete.
    return Promise.resolve(URL.createObjectURL(file));
  }
}