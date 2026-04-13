import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadService {
  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Only image files are allowed.'));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();

        image.onload = () => {
          const maxWidth = 500;
          const maxHeight = 500;

          let { width, height } = image;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext('2d');
          if (!context) {
            reject(new Error('Failed to process image.'));
            return;
          }

          context.drawImage(image, 0, 0, width, height);

          const compressed = canvas.toDataURL('image/jpeg', 0.72);

          if (compressed.length > 2_000_000) {
            reject(new Error('Selected image is still too large. Choose a smaller image.'));
            return;
          }

          resolve(compressed);
        };

        image.onerror = () => reject(new Error('Failed to read image file.'));
        image.src = reader.result as string;
      };

      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  }
}