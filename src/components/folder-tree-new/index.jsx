'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tree } from '@/components/ui/tree-view';
import { useFolderTreeNew } from './useFolderTreeNew';
import { FolderTreeHeader } from './FolderTreeHeader';
import { FolderTreeDialogs } from './FolderTreeDialogs';
import { Folder, FolderOpen, FileIcon, Plus, Trash2, Download, RefreshCw, UploadCloud, FolderDown, FileSearch, Layers, Edit, Share2, X, Eye, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CodeReviewPanel } from '@/components/code-review-panel';
import { FolderAnalysisPanel } from '@/components/folder-analysis-panel';
import { FileEditor } from '@/components/file-editor';

export function FolderTree({ folders, onFolderSelect, selectedFolder, onFolderCreated, files = [] }) {
    const [reviewFile, setReviewFile] = useState(null);
    const [analyzeFolder, setAnalyzeFolder] = useState(null);
    const [editingFile, setEditingFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [loadingFile, setLoadingFile] = useState(false);
    const [shareDialog, setShareDialog] = useState({ open: false, file: null, shareUrl: null });

    const {
        expandedFolders,
        setExpandedFolders,
        createDialog,
        deleteDialog,
        newFolderName,
        deleteFileDialog,
        overwriteDialog,
        customFileName,
        uploading,
        deleting,
        dragOverFolder,
        dropSuccessFolder,
        setNewFolderName,
        setDeleteFileDialog,
        setCreateDialog,
        setDeleteDialog,
        setOverwriteDialog,
        setCustomFileName,
        openCreateDialog,
        openDeleteDialog,
        handleCreateFolder,
        handleDeleteFolder,
        handleDeleteFile,
        handleOverwriteClick,
        handleOverwriteConfirm,
        handleDrop,
        handleDragOver,
        handleDragLeave,
    } = useFolderTreeNew({ onFolderCreated, onFolderSelect, selectedFolder });

    // Filter out .foldermarker files
    const filteredFiles = files.filter(file => !file.name.includes('.foldermarker'));

    const handleExpandAll = () => {
        // Get all folder IDs including nested ones
        const allFolderIds = folders.map(f => `folder-${f}`);
        setExpandedFolders(allFolderIds);
    };

    const handleCollapseAll = () => {
        setExpandedFolders([]);
    };

    const handleDownloadAll = async () => {
        try {
            const response = await fetch('/api/folders/download-all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to download all files');
            }

            // Create a blob from the response
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'all-files.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success('All files downloaded', {
                description: 'all-files.zip has been downloaded.',
            });
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Download failed', {
                description: 'Something went wrong. Please try again.',
            });
        }
    };

    const handleDownloadFolder = async (folderPath, folderName) => {
        try {
            const response = await fetch('/api/folders/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folderPath }),
            });

            if (!response.ok) {
                throw new Error('Failed to download folder');
            }

            // Create a blob from the response
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${folderName}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success('Folder downloaded', {
                description: `${folderName}.zip has been downloaded.`,
            });
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Download failed', {
                description: 'Something went wrong. Please try again.',
            });
        }
    };

    const handleEdit = async (file) => {
        setLoadingFile(true);
        try {
            const response = await fetch(`/api/file-content?fileKey=${encodeURIComponent(file.key)}`);
            if (!response.ok) {
                throw new Error('Failed to load file content');
            }
            const data = await response.json();
            setFileContent(data.content);
            setEditingFile(file);
        } catch (error) {
            console.error('Error loading file:', error);
            toast.error('Failed to load file for editing', {
                description: error.message,
            });
        } finally {
            setLoadingFile(false);
        }
    };

    const handleShare = async (file) => {
        try {
            const response = await fetch('/api/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileKey: file.key,
                    fileName: file.name,
                    permissions: {
                        canView: true,
                        canEdit: true,
                        canComment: true,
                        canAnalyze: true,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create share link');
            }

            const data = await response.json();
            setShareDialog({
                open: true,
                file,
                shareUrl: data.shareLink.url,
                expiresAt: data.shareLink.expiresAt,
            });

            toast.success('Share link created', {
                description: 'Copy the link to share with others',
            });
        } catch (error) {
            console.error('Error creating share link:', error);
            toast.error('Failed to create share link', {
                description: error.message,
            });
        }
    };

    // Build tree data for the Tree component
    const buildTreeData = () => {
        // Create a map to store folders by path
        const folderMap = new Map();

        // Sort folders by path depth to ensure parents are created before children
        const sortedFolders = [...folders].sort((a, b) => {
            const aDepth = a.split('/').length;
            const bDepth = b.split('/').length;
            return aDepth - bDepth;
        });

        // Create folder nodes
        sortedFolders.forEach(folderPath => {
            // Get folder name from path (last segment)
            const folderName = folderPath.includes('/')
                ? folderPath.substring(folderPath.lastIndexOf('/') + 1)
                : folderPath;

            const folderNode = {
                id: `folder-${folderPath}`,
                name: folderName,
                path: folderPath,
                children: [],
                icon: expandedFolders.includes(`folder-${folderPath}`) ? FolderOpen : Folder,
                draggable: true,
                droppable: true,
                onDragStart: (e) => {
                    e.stopPropagation();
                    e.dataTransfer.setData('folderPath', folderPath);
                    e.dataTransfer.setData('folderName', folderName);
                },
                actions: (
                    <div className="flex gap-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Pass just the folder path - the API will handle userId
                                        setAnalyzeFolder({ path: folderPath, name: folderName });
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <Layers className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Analyze folder</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownloadFolder(folderPath, folderName);
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <FolderDown className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download folder</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.multiple = true;
                                        input.onchange = async (event) => {
                                            const files = Array.from(event.target.files || []);
                                            if (files.length > 0) {
                                                for (const file of files) {
                                                    try {
                                                        const timestamp = Date.now();
                                                        const fileName = `${timestamp}-${file.name}`;

                                                        const uploadUrlResponse = await fetch('/api/upload', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ fileName, folderPath }),
                                                        });

                                                        if (!uploadUrlResponse.ok) throw new Error('Failed to get upload URL');

                                                        const { uploadUrl } = await uploadUrlResponse.json();

                                                        const uploadResponse = await fetch(uploadUrl, {
                                                            method: 'PUT',
                                                            body: file,
                                                            headers: {
                                                                'Content-Type': file.type || 'application/octet-stream',
                                                            },
                                                        });

                                                        if (!uploadResponse.ok) throw new Error('Failed to upload file');
                                                    } catch (error) {
                                                        console.error('Upload failed:', error);
                                                    }
                                                }
                                                onFolderCreated?.();
                                            }
                                        };
                                        input.click();
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <UploadCloud className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Upload files</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openCreateDialog(folderPath);
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <Plus className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Create subfolder</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDeleteDialog(folderPath, folderName);
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <Trash2 className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete folder</TooltipContent>
                        </Tooltip>
                    </div>
                ),
                onClick: () => onFolderSelect(folderPath),
                onDrop: (e) => handleDrop(e, folderPath),
                onDragOver: (e) => handleDragOver(e, folderPath),
                onDragLeave: (e) => handleDragLeave(e, folderPath),
            };
            folderMap.set(folderPath, folderNode);
        });

        // Add files to their respective folders
        filteredFiles.forEach(file => {
            const fileNode = {
                id: `file-${file.key}`,
                name: file.name,
                key: file.key,
                url: file.url,
                icon: FileIcon,
                draggable: true,
                onDragStart: (e) => {
                    e.dataTransfer.setData('fileKey', file.key);
                    e.dataTransfer.setData('fileName', file.name);
                },
                actions: (
                    <div className="flex gap-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setReviewFile({ key: file.key, name: file.name });
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <FileSearch className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Code Review</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(file);
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-accent text-blue-600"
                                >
                                    <Edit className="h-3 w-3" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit File</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleShare(file);
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-accent text-purple-600"
                                >
                                    <Share2 className="h-3 w-3" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Share File</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Download className="h-3 w-3 text-muted-foreground" />
                                    </a>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOverwriteClick(file);
                                    }}
                                    disabled={uploading === file.key || deleting === file.key}
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <RefreshCw className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Replace</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteFileDialog({ open: true, file });
                                    }}
                                    disabled={deleting === file.key || uploading === file.key}
                                    className="h-6 w-6 p-0 hover:bg-accent"
                                >
                                    <Trash2 className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                    </div>
                ),
            };

            const parentPath = file.folderPath || '';
            const parentFolder = folderMap.get(parentPath);
            if (parentFolder) {
                parentFolder.children.push(fileNode);
            }
        });

        // Build the tree structure by linking folders to their parents
        const rootItems = [];

        sortedFolders.forEach(folderPath => {
            const folderNode = folderMap.get(folderPath);
            const parentPath = folderPath.includes('/')
                ? folderPath.substring(0, folderPath.lastIndexOf('/'))
                : '';

            if (parentPath === '') {
                // This is a root-level folder
                rootItems.push(folderNode);
            } else {
                // This is a subfolder
                const parentFolder = folderMap.get(parentPath);
                if (parentFolder) {
                    parentFolder.children.push(folderNode);
                }
            }
        });

        // Add root-level files
        filteredFiles.forEach(file => {
            if (!file.folderPath || file.folderPath === '') {
                const fileNode = {
                    id: `file-${file.key}`,
                    name: file.name,
                    key: file.key,
                    url: file.url,
                    icon: FileIcon,
                    draggable: true,
                    onDragStart: (e) => {
                        e.dataTransfer.setData('fileKey', file.key);
                        e.dataTransfer.setData('fileName', file.name);
                    },
                    actions: (
                        <div className="flex gap-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setReviewFile({ key: file.key, name: file.name });
                                        }}
                                        className="h-6 w-6 p-0 hover:bg-accent"
                                    >
                                        <FileSearch className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Code Review</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 hover:bg-accent"
                                    >
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download className="h-3 w-3 text-muted-foreground" />
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Download</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOverwriteClick(file);
                                        }}
                                        disabled={uploading === file.key || deleting === file.key}
                                        className="h-6 w-6 p-0 hover:bg-accent"
                                    >
                                        <RefreshCw className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Replace</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteFileDialog({ open: true, file });
                                        }}
                                        disabled={deleting === file.key || uploading === file.key}
                                        className="h-6 w-6 p-0 hover:bg-accent"
                                    >
                                        <Trash2 className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                        </div>
                    ),
                };
                rootItems.push(fileNode);
            }
        });

        // Sort children (folders first, then files, alphabetically)
        const sortChildren = (children) => {
            return children.sort((a, b) => {
                const aIsFolder = a.id.startsWith('folder-');
                const bIsFolder = b.id.startsWith('folder-');

                if (aIsFolder && !bIsFolder) return -1;
                if (!aIsFolder && bIsFolder) return 1;

                return a.name.localeCompare(b.name);
            });
        };

        folderMap.forEach(node => {
            if (node.children.length > 0) {
                node.children = sortChildren(node.children);
            }
        });

        // Sort and return root items
        return sortChildren(rootItems);
    };

    const treeData = buildTreeData();

    return (
        <>
            <Card className="p-4">
                <FolderTreeHeader
                    onCreateClick={() => openCreateDialog('')}
                    onExpandAll={handleExpandAll}
                    onCollapseAll={handleCollapseAll}
                    onDownloadAll={handleDownloadAll}
                />

                <div className="mt-4">
                    <div
                        className={`mb-2 p-3 rounded-md border-2 border-dashed ${dragOverFolder === '' ? 'bg-primary/20 border-primary' : 'border-transparent'} ${dropSuccessFolder === '' ? 'bg-green-500/20 animate-pulse' : ''}`}
                        onDrop={(e) => handleDrop(e, '')}
                        onDragOver={(e) => handleDragOver(e, '')}
                        onDragLeave={(e) => handleDragLeave(e, '')}
                    >
                        <p className="text-sm text-muted-foreground text-center">
                            Drop files or folders here to move to root level
                        </p>
                    </div>

                    <Tree
                        data={treeData}
                        initialSelectedItemId={selectedFolder ? `folder-${selectedFolder}` : undefined}
                        expandedItemIds={expandedFolders}
                        onExpandedChange={setExpandedFolders}
                        onSelectChange={(item) => {
                            if (item && item.path !== undefined) {
                                onFolderSelect(item.path);
                            }
                        }}
                    />
                </div>
            </Card>

            <FolderTreeDialogs
                createDialog={createDialog}
                deleteDialog={deleteDialog}
                deleteFileDialog={deleteFileDialog}
                overwriteDialog={overwriteDialog}
                newFolderName={newFolderName}
                customFileName={customFileName}
                setNewFolderName={setNewFolderName}
                setCustomFileName={setCustomFileName}
                setCreateDialog={setCreateDialog}
                setDeleteDialog={setDeleteDialog}
                setDeleteFileDialog={setDeleteFileDialog}
                setOverwriteDialog={setOverwriteDialog}
                handleCreateFolder={handleCreateFolder}
                handleDeleteFolder={handleDeleteFolder}
                handleDeleteFile={handleDeleteFile}
                handleOverwriteConfirm={handleOverwriteConfirm}
            />

            {reviewFile && (
                <CodeReviewPanel
                    fileKey={reviewFile.key}
                    fileName={reviewFile.name}
                    onClose={() => setReviewFile(null)}
                />
            )}

            {analyzeFolder && (
                <FolderAnalysisPanel
                    folderPath={analyzeFolder.path}
                    folderName={analyzeFolder.name}
                    onClose={() => setAnalyzeFolder(null)}
                />
            )}

            {editingFile && fileContent && (
                <FileEditor
                    fileKey={editingFile.key}
                    fileName={editingFile.name}
                    initialContent={fileContent}
                    onClose={() => {
                        setEditingFile(null);
                        setFileContent('');
                    }}
                    onSave={() => {
                        setEditingFile(null);
                        setFileContent('');
                        // Reload files to reflect changes
                        onFolderCreated();
                    }}
                />
            )}

            {/* Share Dialog */}
            {shareDialog.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                    <Card className="w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                    <Share2 className="h-4 w-4 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold">Share File</h3>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShareDialog({ open: false, file: null, shareUrl: null })}
                                className="h-7 w-7"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium mb-1">{shareDialog.file?.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    Expires: {new Date(shareDialog.expiresAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="p-3 bg-muted rounded-lg">
                                <p className="text-xs font-medium mb-2">Shareable Link:</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={shareDialog.shareUrl || ''}
                                        readOnly
                                        className="flex-1 px-2 py-1 text-xs border rounded bg-background font-mono"
                                    />
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            navigator.clipboard.writeText(shareDialog.shareUrl);
                                            toast.success('Link copied to clipboard');
                                        }}
                                        className="h-7"
                                    >
                                        Copy
                                    </Button>
                                </div>
                            </div>

                            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                <p className="text-xs font-medium mb-2">Permissions:</p>
                                <div className="flex flex-wrap gap-1">
                                    <Badge variant="secondary" className="text-xs">
                                        <Eye className="h-3 w-3 mr-1" />
                                        View
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <Edit className="h-3 w-3 mr-1" />
                                        Edit
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <MessageSquare className="h-3 w-3 mr-1" />
                                        Comment
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <Sparkles className="h-3 w-3 mr-1" />
                                        Analyze
                                    </Badge>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Anyone with this link can view, edit, comment on, and analyze this file.
                                The link will expire in 7 days.
                            </p>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}