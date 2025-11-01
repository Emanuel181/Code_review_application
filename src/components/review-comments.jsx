'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Check, X, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export function ReviewComments({ fileKey, fileName, issueId = null }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [expandedComments, setExpandedComments] = useState(new Set());

  const loadComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/review-comments?fileKey=${encodeURIComponent(fileKey)}`);
      const data = await response.json();

      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/review-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileKey,
          fileName,
          content: newComment,
          type: 'comment',
          parentId: replyTo,
          issueId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewComment('');
        setReplyTo(null);
        loadComments();
        toast.success('Comment added');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const resolveComment = async (commentId) => {
    try {
      const response = await fetch(`/api/review-comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' }),
      });

      if (response.ok) {
        loadComments();
        toast.success('Comment resolved');
      }
    } catch (error) {
      console.error('Failed to resolve comment:', error);
      toast.error('Failed to resolve comment');
    }
  };

  const toggleComment = (commentId) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const getStatusBadge = (status) => {
    const variants = {
      open: 'default',
      resolved: 'secondary',
      dismissed: 'outline',
    };
    return (
      <Badge variant={variants[status] || 'default'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Comments ({comments.length})
        </h3>
        <Button size="sm" variant="outline" onClick={loadComments}>
          Refresh
        </Button>
      </div>

      {/* Comment List */}
      {comments.length > 0 && (
        <div className="space-y-2">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-3">
              <button
                onClick={() => toggleComment(comment.id)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {comment.user.firstName || comment.user.email}
                      </span>
                      {getStatusBadge(comment.status)}
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {!expandedComments.has(comment.id) && (
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {comment.content}
                      </p>
                    )}
                  </div>
                  {expandedComments.has(comment.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {expandedComments.has(comment.id) && (
                <div className="mt-3 space-y-3">
                  <p className="text-sm">{comment.content}</p>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-4 border-l-2 pl-3 space-y-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {reply.user.firstName || reply.user.email}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setReplyTo(comment.id)}
                    >
                      Reply
                    </Button>
                    {comment.status === 'open' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => resolveComment(comment.id)}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* New Comment */}
      <Card className="p-3">
        {replyTo && (
          <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
            <span>Replying to comment...</span>
            <Button size="sm" variant="ghost" onClick={() => setReplyTo(null)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[80px] mb-2"
        />
        <Button size="sm" onClick={addComment} disabled={!newComment.trim()}>
          <Send className="h-3 w-3 mr-1" />
          {replyTo ? 'Reply' : 'Comment'}
        </Button>
      </Card>
    </div>
  );
}

