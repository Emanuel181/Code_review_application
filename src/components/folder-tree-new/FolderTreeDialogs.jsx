import {
    CreateFolderDialog,
    DeleteFolderDialog,
    DeleteFileDialog,
    OverwriteFileDialog
} from './FolderDialogs';
import { getFileExtension } from './utils';

export function FolderTreeDialogs({
    createDialog,
    deleteDialog,
    deleteFileDialog,
    overwriteDialog,
    newFolderName,
    customFileName,
    setNewFolderName,
    setCustomFileName,
    setCreateDialog,
    setDeleteDialog,
    setDeleteFileDialog,
    setOverwriteDialog,
    handleCreateFolder,
    handleDeleteFolder,
    handleDeleteFile,
    handleOverwriteConfirm,
}) {
    return (
        <>
            <CreateFolderDialog
                open={createDialog.open}
                parentPath={createDialog.parentPath}
                folderName={newFolderName}
                onFolderNameChange={setNewFolderName}
                onClose={(open) => {
                    if (!open) {
                        setCreateDialog({ open: false, parentPath: '' });
                        setNewFolderName('');
                    }
                }}
                onConfirm={handleCreateFolder}
            />

            <DeleteFolderDialog
                open={deleteDialog.open}
                folderName={deleteDialog.folderName}
                onClose={(open) => {
                    if (!open) {
                        setDeleteDialog({ open: false, folderPath: '', folderName: '' });
                    }
                }}
                onConfirm={handleDeleteFolder}
            />

            <DeleteFileDialog
                open={deleteFileDialog.open}
                fileName={deleteFileDialog.file?.name}
                onClose={(open) => setDeleteFileDialog({ open, file: null })}
                onConfirm={handleDeleteFile}
            />

            <OverwriteFileDialog
                open={overwriteDialog.open}
                fileName={overwriteDialog.file?.name}
                customFileName={customFileName}
                fileExtension={overwriteDialog.file ? getFileExtension(overwriteDialog.file.name) : ''}
                onCustomFileNameChange={setCustomFileName}
                onClose={(open) => {
                    if (!open) {
                        setOverwriteDialog({ open: false, file: null, newFile: null });
                        setCustomFileName('');
                    }
                }}
                onConfirm={handleOverwriteConfirm}
            />
        </>
    );
}

