// Helper functions for file operations

export const getFileExtension = (filename) => {
    const lastDot = filename.lastIndexOf('.');
    return lastDot === -1 ? '' : filename.substring(lastDot);
};


