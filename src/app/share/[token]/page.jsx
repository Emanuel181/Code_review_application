'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileCode,
  Save,
  MessageSquare,
  Loader2,
  AlertCircle,
  Share2,
  Eye,
  Edit3,
  Sparkles,
  Shield,
  Clock,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { analyzeCodeMultiDimensional } from '@/lib/multi-dimensional-analyzer';

export default function SharedFilePage() {
  const params = useParams();
  const token = params.token;

  const [loading, setLoading] = useState(true);
  const [shareData, setShareData] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentLine, setCommentLine] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'comments', 'analysis'

  useEffect(() => {
    if (token) {
      loadSharedFile();
      loadComments();
    }
  }, [token]);

  const loadSharedFile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/share/${token}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to load shared file');
      }

      const data = await response.json();
      setShareData(data.shareLink);
      setFileContent(data.shareLink.content || '');
      setOriginalContent(data.shareLink.content || '');
    } catch (error) {
      console.error('Error loading shared file:', error);
      toast.error('Failed to load file', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const response = await fetch(`/api/share/${token}/comment`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSave = async () => {
    if (!shareData?.permissions?.canEdit) {
      toast.error('You do not have permission to edit this file');
      return;
    }

    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/share/${token}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: fileContent,
          userName,
          userEmail,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save file');
      }

      setOriginalContent(fileContent);
      toast.success('File saved successfully');
    } catch (error) {
      console.error('Error saving file:', error);
      toast.error('Failed to save file', {
        description: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddComment = async () => {
    if (!shareData?.permissions?.canComment) {
      toast.error('You do not have permission to comment');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    try {
      const response = await fetch(`/api/share/${token}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          lineNumber: commentLine,
          userName,
          userEmail,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add comment');
      }

      const data = await response.json();
      setComments([...comments, data.comment]);
      setNewComment('');
      setCommentLine(null);
      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment', {
        description: error.message,
      });
    }
  };

  const handleAnalyze = async () => {
    if (!shareData?.permissions?.canAnalyze) {
      toast.error('You do not have permission to analyze');
      return;
    }

    setAnalyzing(true);
    try {
      const result = analyzeCodeMultiDimensional(fileContent, shareData.fileName);
      setAnalysisResult(result);
      setActiveTab('analysis');
      toast.success('Analysis complete');
    } catch (error) {
      console.error('Error analyzing:', error);
      toast.error('Analysis failed', {
        description: error.message,
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const hasChanges = fileContent !== originalContent;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!shareData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Link Not Found</h2>
          <p className="text-muted-foreground">
            This share link may have expired or been revoked.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Share2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">{shareData.fileName}</h1>
              <p className="text-xs text-muted-foreground">
                Shared by {shareData.owner.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {shareData.permissions.canEdit && (
              <Badge variant="outline" className="gap-1">
                <Edit3 className="h-3 w-3" />
                Can Edit
              </Badge>
            )}
            {shareData.permissions.canComment && (
              <Badge variant="outline" className="gap-1">
                <MessageSquare className="h-3 w-3" />
                Can Comment
              </Badge>
            )}
            {shareData.permissions.canAnalyze && (
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Can Analyze
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Editor */}
          <div className="col-span-8">
            <Card className="p-4">
              {/* Tabs */}
              <div className="flex gap-2 mb-4 border-b">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'editor'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileCode className="h-4 w-4 inline mr-2" />
                  Editor
                </button>
                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'analysis'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Shield className="h-4 w-4 inline mr-2" />
                  Analysis
                </button>
              </div>

              {activeTab === 'editor' && (
                <>
                  <Textarea
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    className="font-mono text-sm min-h-[600px] mb-4"
                    placeholder="File content..."
                    readOnly={!shareData.permissions.canEdit}
                  />

                  {shareData.permissions.canEdit && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        disabled={!hasChanges || saving}
                        className="flex-1"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>

                      {shareData.permissions.canAnalyze && (
                        <Button
                          onClick={handleAnalyze}
                          disabled={analyzing}
                          variant="outline"
                        >
                          {analyzing ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Analyze
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'analysis' && (
                <div className="space-y-4">
                  {!analysisResult ? (
                    <div className="text-center py-12">
                      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">
                        Run analysis to see code quality and security insights
                      </p>
                      {shareData.permissions.canAnalyze && (
                        <Button onClick={handleAnalyze} disabled={analyzing}>
                          {analyzing ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Start Analysis
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Metrics */}
                      <div className="grid grid-cols-4 gap-3">
                        <Card className="p-3 text-center">
                          <p className="text-2xl font-bold">
                            {analysisResult.metrics.qualityScore.toFixed(1)}
                          </p>
                          <p className="text-xs text-muted-foreground">Quality</p>
                        </Card>
                        <Card className="p-3 text-center">
                          <p className="text-2xl font-bold text-red-600">
                            {analysisResult.metrics.errorCount}
                          </p>
                          <p className="text-xs text-muted-foreground">Errors</p>
                        </Card>
                        <Card className="p-3 text-center">
                          <p className="text-2xl font-bold text-yellow-600">
                            {analysisResult.metrics.warningCount}
                          </p>
                          <p className="text-xs text-muted-foreground">Warnings</p>
                        </Card>
                        <Card className="p-3 text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {analysisResult.metrics.infoCount}
                          </p>
                          <p className="text-xs text-muted-foreground">Info</p>
                        </Card>
                      </div>

                      {/* Issues */}
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-2">
                          {analysisResult.issues.map((issue, idx) => (
                            <Card key={idx} className="p-3">
                              <div className="flex items-start gap-2">
                                {issue.severity === 'error' && (
                                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                )}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs">
                                      {issue.category}
                                    </Badge>
                                    {issue.line && (
                                      <span className="text-xs text-muted-foreground">
                                        Line {issue.line}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm font-medium">{issue.message}</p>
                                  {issue.suggestion && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {issue.suggestion}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-4">
            {/* User Info */}
            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3">Your Details</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Your Name *"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-sm"
                />
                <Input
                  placeholder="Your Email (optional)"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="text-sm"
                />
              </div>
            </Card>

            {/* File Info */}
            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3">File Information</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="font-medium">{shareData.owner.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="font-medium">
                    {new Date(shareData.expiresAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Permissions:</span>
                  <div className="flex gap-1">
                    {shareData.permissions.canView && (
                      <Badge variant="secondary" className="text-xs h-5">
                        View
                      </Badge>
                    )}
                    {shareData.permissions.canEdit && (
                      <Badge variant="secondary" className="text-xs h-5">
                        Edit
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Comments */}
            {shareData.permissions.canComment && (
              <Card className="p-4">
                <h3 className="text-sm font-semibold mb-3">
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Comments ({comments.length})
                </h3>

                <ScrollArea className="h-[300px] mb-3">
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <Card key={comment.id} className="p-3 bg-muted/50">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs font-medium">{comment.userName}</span>
                          {comment.lineNumber && (
                            <Badge variant="outline" className="text-xs h-5">
                              L{comment.lineNumber}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {comment.content}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>

                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Line number (optional)"
                    value={commentLine || ''}
                    onChange={(e) => setCommentLine(e.target.value ? parseInt(e.target.value) : null)}
                    className="text-sm"
                  />
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="text-sm min-h-[80px]"
                  />
                  <Button onClick={handleAddComment} size="sm" className="w-full">
                    <MessageSquare className="h-3 w-3 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

