import crypto from 'crypto';
import prisma from './prisma';

/**
 * Generate SHA-256 hash of content
 */
export function generateContentHash(content) {
  return crypto.createHash('sha256').update(content, 'utf-8').digest('hex');
}

/**
 * Store a new file version
 */
export async function storeFileVersion(userId, fileKey, fileName, content) {
  const hash = generateContentHash(content);
  const size = Buffer.byteLength(content, 'utf-8');

  // Check if this exact version already exists
  const existing = await prisma.fileVersion.findFirst({
    where: { fileKey, hash },
  });

  if (existing) {
    return existing;
  }

  // Get the latest version number for this file
  const latestVersion = await prisma.fileVersion.findFirst({
    where: { fileKey },
    orderBy: { version: 'desc' },
  });

  const version = latestVersion ? latestVersion.version + 1 : 1;

  // Create new version
  const fileVersion = await prisma.fileVersion.create({
    data: {
      userId,
      fileKey,
      fileName,
      version,
      content,
      hash,
      size,
    },
  });

  return fileVersion;
}

/**
 * Get file version by ID
 */
export async function getFileVersion(id) {
  return await prisma.fileVersion.findUnique({
    where: { id },
  });
}

/**
 * Get all versions for a file
 */
export async function getFileVersions(fileKey) {
  return await prisma.fileVersion.findMany({
    where: { fileKey },
    orderBy: { version: 'desc' },
    select: {
      id: true,
      version: true,
      hash: true,
      size: true,
      createdAt: true,
    },
  });
}

/**
 * Get latest version for a file
 */
export async function getLatestFileVersion(fileKey) {
  return await prisma.fileVersion.findFirst({
    where: { fileKey },
    orderBy: { version: 'desc' },
  });
}

/**
 * Check if content has changed
 */
export async function hasFileChanged(fileKey, content) {
  const hash = generateContentHash(content);
  const latest = await getLatestFileVersion(fileKey);

  if (!latest) {
    return true; // No previous version, so it's new
  }

  return latest.hash !== hash;
}

/**
 * Get version statistics
 */
export async function getVersionStats(fileKey) {
  const versions = await prisma.fileVersion.findMany({
    where: { fileKey },
    orderBy: { version: 'asc' },
    select: {
      id: true,
      version: true,
      size: true,
      createdAt: true,
    },
  });

  if (versions.length === 0) {
    return null;
  }

  return {
    totalVersions: versions.length,
    currentVersion: versions[versions.length - 1].version,
    firstCreated: versions[0].createdAt,
    lastUpdated: versions[versions.length - 1].createdAt,
    sizeHistory: versions.map(v => ({ version: v.version, size: v.size })),
  };
}

