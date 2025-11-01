"use client";

import { Upload, X, Folder } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FileUpload({ onUploadSuccess, existingFiles = [], currentFolder = '', allFolders = [] }) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Helper function to get file extension
  const getFileExtension = (filename) => {
    const lastDot = filename.lastIndexOf('.');
    return lastDot === -1 ? '' : filename.substring(lastDot);
  };

  // Helper function to get filename without extension
  const getFileNameWithoutExtension = (filename) => {
    const lastDot = filename.lastIndexOf('.');
    return lastDot === -1 ? filename : filename.substring(0, lastDot);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const newFiles = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file: file,
        customName: getFileNameWithoutExtension(file.name),
        extension: getFileExtension(file.name),
        folderPath: currentFolder || '__root__',
        size: file.size,
      }));
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);
    if (files.length > 0) {
      const newFiles = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file: file,
        customName: getFileNameWithoutExtension(file.name),
        extension: getFileExtension(file.name),
        folderPath: currentFolder || '__root__',
        size: file.size,
      }));
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (id) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== id));
  };

  const updateFileName = (id, newName) => {
    setSelectedFiles(prev => prev.map(f =>
      f.id === id ? { ...f, customName: newName } : f
    ));
  };

  const updateFolderPath = (id, newPath) => {
    setSelectedFiles(prev => prev.map(f =>
      f.id === id ? { ...f, folderPath: newPath } : f
    ));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const uploadAllFiles = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    for (const fileItem of selectedFiles) {
      try {
        const fullFileName = `${Date.now()}-${fileItem.customName}${fileItem.extension}`;
        // Convert __root__ back to empty string for API
        const actualFolderPath = fileItem.folderPath === '__root__' ? '' : fileItem.folderPath;

        // Step 1: Get presigned URL
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: fullFileName,
            folderPath: actualFolderPath
          }),
        });

        if (!response.ok) throw new Error('Failed to get upload URL');

        const { uploadUrl } = await response.json();

        // Step 2: Upload to S3
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: fileItem.file,
          headers: {
            'Content-Type': fileItem.file.type || 'application/octet-stream',
          },
        });

        if (!uploadResponse.ok) throw new Error('Failed to upload file to S3');

        successCount++;
      } catch (error) {
        console.error('Upload failed for:', fileItem.file.name, error);
        failCount++;
      }
    }

    setUploading(false);

    if (successCount > 0) {
      toast.success('Upload complete', {
        description: `${successCount} file(s) uploaded successfully${failCount > 0 ? `, ${failCount} failed` : ''}.`,
      });
      setSelectedFiles([]);
      onUploadSuccess?.();
    } else {
      toast.error('Upload failed', {
        description: 'All uploads failed. Please try again.',
      });
    }
  };

  return (
    <Card className="p-6">
      <div
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedFiles.length === 0 ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium">
                Drop your files
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Select multiple files - any type supported
              </p>
            </div>
            <div className="flex justify-center pt-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="default"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {selectedFiles.length} file(s) selected
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Add More
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <>
          <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
            {selectedFiles.map((fileItem) => (
              <div
                key={fileItem.id}
                className="flex items-start gap-3 p-3 border rounded-md bg-accent/50"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {fileItem.file.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(fileItem.size)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium w-20">Filename:</label>
                      <input
                        type="text"
                        value={fileItem.customName}
                        onChange={(e) => updateFileName(fileItem.id, e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-input rounded bg-background"
                        disabled={uploading}
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {fileItem.extension}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium w-20">Folder:</label>
                      <Select
                        value={fileItem.folderPath}
                        onValueChange={(value) => updateFolderPath(fileItem.id, value)}
                        disabled={uploading}
                      >
                        <SelectTrigger className="flex-1 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__root__">
                            <div className="flex items-center gap-2">
                              <Folder className="h-3 w-3" />
                              Root (no folder)
                            </div>
                          </SelectItem>
                          {allFolders.map((folder) => (
                            <SelectItem key={folder} value={folder}>
                              <div className="flex items-center gap-2">
                                <Folder className="h-3 w-3" />
                                {folder}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(fileItem.id)}
                  className="h-8 w-8 flex-shrink-0"
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={uploadAllFiles}
              className="flex-1"
              disabled={uploading || selectedFiles.length === 0}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} file(s)`}
            </Button>
            <Button
              onClick={() => setSelectedFiles([])}
              variant="outline"
              disabled={uploading}
            >
              Clear All
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

