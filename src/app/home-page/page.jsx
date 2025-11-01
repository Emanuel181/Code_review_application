"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { handleSignOutAction } from "@/app/actions/signOut";
import { LogOut } from "lucide-react";
import FileUpload from "@/components/ui/file-upload";
import { FolderTree } from "@/components/folder-tree-new";

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [existingFiles, setExistingFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState('');

    useEffect(() => {
        // Fetch user data on component mount
        fetch('/api/get-name')
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
            })
            .catch(error => console.error('Failed to fetch user:', error));

        // Load existing files and folders
        loadFiles();
        loadFolders();
    }, []);

    const loadFiles = async () => {
        try {
            const response = await fetch('/api/files');
            const data = await response.json();
            setExistingFiles(data.files || []);
        } catch (error) {
            console.error('Failed to load files:', error);
        }
    };

    const loadFolders = async () => {
        try {
            const response = await fetch('/api/folders');
            const data = await response.json();
            setFolders(data.folders || []);
        } catch (error) {
            console.error('Failed to load folders:', error);
        }
    };

    const handleUploadSuccess = () => {
        // Reload files and folders
        loadFiles();
        loadFolders();
    };

    const handleFolderCreated = () => {
        // Reload folders and files when a new one is created or files are moved
        loadFolders();
        loadFiles();
    };

    const handleFolderSelect = (folderPath) => {
        setSelectedFolder(folderPath);
    };

    if (!user) {
        return <div className="text-center p-8">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen gap-8 w-full max-w-6xl mx-auto p-6 pt-8">
            {/* Centered File Explorer */}
            <div className="w-full max-w-4xl">
                <FolderTree
                    folders={folders}
                    files={existingFiles}
                    selectedFolder={selectedFolder}
                    onFolderSelect={handleFolderSelect}
                    onFolderCreated={handleFolderCreated}
                />
            </div>

            {/* Upload Section */}
            <div className="w-full max-w-4xl">
                <FileUpload
                    onUploadSuccess={handleUploadSuccess}
                    existingFiles={existingFiles}
                    currentFolder={selectedFolder}
                    allFolders={folders}
                />
            </div>

            {/* Sign Out Button */}
            <form action={handleSignOutAction} className="mt-4">
                <Button type="submit" variant="outline" size="lg">
                    <LogOut />
                    Sign Out
                </Button>
            </form>
        </div>
    );
}
