import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || '';
export const NEXT_PUBLIC_R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

let r2ClientInstance: S3Client | null = null;

/**
 * Returns an S3Client instance configured for Cloudflare R2.
 */
export function getR2Client(): S3Client {
  if (!r2ClientInstance) {
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
      throw new Error('Missing Cloudflare R2 credentials in environment variables.');
    }

    r2ClientInstance = new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });
  }

  return r2ClientInstance;
}

/**
 * Upload a file directly to Cloudflare R2 (server-side).
 * Ideal for audio files (e.g. mp3, wav, ogg) and other media.
 */
export async function uploadToR2({
  key,
  buffer,
  contentType,
}: {
  key: string;
  buffer: Buffer | Uint8Array;
  contentType: string;
}): Promise<{ url: string; key: string }> {
  const client = getR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return {
    key,
    url: getR2PublicUrl(key),
  };
}

/**
 * Generate a presigned upload URL for direct client-to-R2 upload.
 */
export async function getPresignedUploadUrl({
  key,
  contentType,
  expiresIn = 3600,
}: {
  key: string;
  contentType: string;
  expiresIn?: number;
}): Promise<string> {
  const client = getR2Client();

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(client, command, { expiresIn });
}

/**
 * Delete a file from Cloudflare R2 by key.
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client();

  await client.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })
  );
}

/**
 * Get the publicly accessible URL for an audio or media file stored in R2.
 */
export function getR2PublicUrl(key: string): string {
  if (!NEXT_PUBLIC_R2_PUBLIC_URL) {
    return `/${key}`;
  }
  const baseUrl = NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/$/, '');
  const cleanKey = key.replace(/^\//, '');
  return `${baseUrl}/${cleanKey}`;
}
