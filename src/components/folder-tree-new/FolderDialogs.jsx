'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function CreateFolderDialog({
    open,
    parentPath,
    folderName,
    onFolderNameChange,
    onClose,
    onConfirm
}) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New Folder</AlertDialogTitle>
                    <AlertDialogDescription>
                        {parentPath ? (
                            <>Create a new folder inside <strong>{parentPath}</strong></>
                        ) : (
                            <>Create a new folder inside <strong>All Files</strong></>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-2 py-4">
                    <label className="text-sm font-medium">Folder Name:</label>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => onFolderNameChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && folderName.trim()) {
                                onConfirm();
                            }
                        }}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter folder name..."
                        autoFocus
                    />
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={!folderName.trim()}
                    >
                        Create Folder
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function DeleteFolderDialog({
    open,
    folderName,
    onClose,
    onConfirm
}) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Folder?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <strong>{folderName}</strong>?
                        <br />
                        This will permanently delete the folder and all files inside it. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete Folder
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function DeleteFileDialog({
    open,
    fileName,
    onClose,
    onConfirm
}) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete File?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete <strong>{fileName}</strong>. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function OverwriteFileDialog({
    open,
    fileName,
    customFileName,
    fileExtension,
    onCustomFileNameChange,
    onClose,
    onConfirm
}) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Replace File</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are replacing <strong>{fileName}</strong> with a new file.
                        <br />
                        Choose the filename for the uploaded file:
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-2 py-4">
                    <label className="text-sm font-medium">Filename:</label>
                    <div className="flex items-center gap-1">
                        <input
                            type="text"
                            value={customFileName}
                            onChange={(e) => onCustomFileNameChange(e.target.value)}
                            className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Enter filename..."
                        />
                        <span className="text-sm text-muted-foreground font-mono">
                            {fileExtension}
                        </span>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={!customFileName.trim()}
                    >
                        Upload File
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

