'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Loader2,
  ChevronDown,
  ChevronRight,
  Shield,
  FileSearch,
  Code2,
  Layers,
  History
} from 'lucide-react';
import { toast } from 'sonner';

export function FolderAnalysisPanel({ folderPath, folderName, onClose }) {
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [expandedFiles, setExpandedFiles] = useState(new Set());
  const [progress, setProgress] = useState(0);

  const startAnalysis = async () => {
    setLoading(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      const response = await fetch('/api/folder-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderPath }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze folder');
      }

      const data = await response.json();
      setAnalysisData(data);

      toast.success('Folder analysis completed', {
        description: `${data.metrics.passedFiles} passed, ${data.metrics.failedFiles} failed`,
      });
    } catch (error) {
      console.error('Folder analysis failed:', error);
      clearInterval(progressInterval);
      toast.error('Folder analysis failed', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFile = (index) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFiles(newExpanded);
  };

  const getScoreBadge = (score) => {
    if (score > 8) {
      return <Badge className="bg-green-500">✓ Pass ({score}/10)</Badge>;
    }
    return <Badge variant="destructive">✗ Fail ({score}/10)</Badge>;
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-l-red-600 bg-red-50 dark:bg-red-950/20';
      case 'error':
        return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  // Initial state
  if (!loading && !analysisData) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Layers className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Security Analysis</h3>
              <p className="text-xs text-muted-foreground">{folderName || folderPath}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center py-8 space-y-6">
          <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/50">
              <FileSearch className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Linting</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/50">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Security</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/50">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Quality</span>
            </div>
          </div>
          <Button onClick={startAnalysis} size="sm" className="w-full">
            <FileSearch className="h-4 w-4 mr-2" />
            Start Analysis
          </Button>
        </div>
      </Card>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
            <div>
              <h3 className="text-sm font-semibold">Analyzing...</h3>
              <p className="text-xs text-muted-foreground">{folderName || folderPath}</p>
            </div>
          </div>
        </div>

        <div className="py-8 space-y-3">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">{progress}% complete</p>
        </div>
      </Card>
    );
  }

  // Results state
  const metrics = analysisData.metrics;

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-sm border max-h-[85vh] overflow-hidden flex flex-col">
      {/* Compact Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
            <Layers className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Analysis Results</h3>
            <p className="text-xs text-muted-foreground">{folderName || folderPath}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button onClick={startAnalysis} variant="ghost" size="sm" className="h-7 text-xs">
            Reanalyze
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Compact Summary */}
      <div className="grid grid-cols-4 gap-2 p-4 bg-muted/30">
        <div className="text-center">
          <p className="text-xl font-bold text-green-600">{metrics.passedFiles}</p>
          <p className="text-xs text-muted-foreground">Passed</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-red-600">{metrics.failedFiles}</p>
          <p className="text-xs text-muted-foreground">Failed</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{metrics.analyzedFiles}</p>
          <p className="text-xs text-muted-foreground">Analyzed</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-purple-600">{metrics.passRate}%</p>
          <p className="text-xs text-muted-foreground">Pass Rate</p>
        </div>
      </div>

      {/* Files List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {analysisData.files.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No files to analyze</p>
            </div>
          ) : (
            analysisData.files.map((file, fileIndex) => (
              <div key={fileIndex} className="border rounded-lg">
                <div
                  className="flex items-center justify-between cursor-pointer p-3 hover:bg-muted/50 transition-colors"
                  onClick={() => toggleFile(fileIndex)}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {expandedFiles.has(fileIndex) ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs font-medium truncate">{file.fileName}</p>
                      <p className="text-xs text-muted-foreground">{file.language}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getScoreBadge(file.qualityScore)}
                    <Badge variant="secondary" className="text-xs">
                      {file.analysis.issues.length}
                    </Badge>
                  </div>
                </div>

                {expandedFiles.has(fileIndex) && file.analysis.issues.length > 0 && (
                  <div className="p-3 pt-0 space-y-1.5">
                    {file.analysis.issues.slice(0, 10).map((issue, issueIndex) => (
                      <div
                        key={issueIndex}
                        className={`p-2 rounded border-l-2 ${getSeverityColor(issue.severity)}`}
                      >
                        <div className="flex items-start gap-2">
                          {getSeverityIcon(issue.severity)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Badge variant="outline" className="text-xs h-4 px-1">
                                {issue.category}
                              </Badge>
                              {issue.line && (
                                <span className="text-xs text-muted-foreground">
                                  L{issue.line}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-medium mb-0.5">{issue.message}</p>
                            {issue.suggestion && (
                              <p className="text-xs text-muted-foreground">{issue.suggestion}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {file.analysis.issues.length > 10 && (
                      <p className="text-xs text-muted-foreground text-center py-1">
                        +{file.analysis.issues.length - 10} more
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}

