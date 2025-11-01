import { Plus, Maximize2, Minimize2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export function FolderTreeHeader({ onCreateClick, onExpandAll, onCollapseAll, onDownloadAll }) {
    return (
        <div className="flex items-center justify-between mb-4 pb-3 border-b">
            <h3 className="text-lg font-semibold">File Explorer</h3>
            <div className="flex items-center gap-2 flex-wrap">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={onDownloadAll}
                            aria-label="Download all files"
                            className="h-9"
                        >
                            <Download className="h-4 w-4 mr-1.5" />
                            <span className="hidden sm:inline">Download All</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Download all files and folders as ZIP</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="sm"
                            variant="default"
                            onClick={onCreateClick}
                            aria-label="Create new folder"
                            className="h-9"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            <span className="hidden sm:inline">New Folder</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Create a new folder at root level</p>
                    </TooltipContent>
                </Tooltip>

                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={onExpandAll}
                                aria-label="Expand all folders"
                                className="h-9 w-9 p-0"
                            >
                                <Maximize2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Expand all folders</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={onCollapseAll}
                                aria-label="Collapse all folders"
                                className="h-9 w-9 p-0"
                            >
                                <Minimize2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Collapse all folders</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}