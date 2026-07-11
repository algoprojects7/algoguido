import { Injectable, BadRequestException } from '@nestjs/common';
import { put } from '@vercel/blob';

@Injectable()
export class UploadsService {
  async uploadFile(file: any): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      // Upload directly to Vercel Blob
      const blob = await put(`uploads/${Date.now()}-${file.originalname}`, file.buffer, {
        access: 'public',
      });
      return { url: blob.url };
    } catch (error: any) {
      throw new BadRequestException(`Failed to upload file to Vercel Blob: ${error.message}`);
    }
  }
}
