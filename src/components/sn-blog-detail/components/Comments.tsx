import { Box, Stack } from '@mui/material';
import { Text } from 'components/shared';
import React, { memo } from 'react';
import { CommentBlogData } from 'store/blog/actions';
import { formatDate } from 'utils/index';

type CommentsProps = {
  comments?: CommentBlogData[];
};

type CommentItemProps = {
  comment: CommentBlogData;
};


const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { id, name, email, created_time, content, reply_to } = comment;

  return (
    <Box
      key={id}
      bgcolor="grey.50"
      p={2}
      borderRadius={1}
      border={1}
      borderColor="grey.300"
      sx={{ marginLeft: reply_to ? 2 : 0 }}
    >
      <Stack spacing={1}>
        <Text variant="body2">{name ?? '--'}</Text>
        <Text variant="caption" color="grey.400">
          {email ?? '--'}
        </Text>
        <Text variant="body2" color="grey.400">
          {formatDate(created_time, 'HH:mm - dd/MM/yyyy')}
        </Text>
        <div
          sx={{
            fontSize: 14,
            '& *': {
              marginBlockStart: 0,
              marginBlockEnd: 0,
              wordBreak: 'break-all',
            },
          }}
          className="html"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Stack>
    </Box>
  );
};

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const buildCommentTree = (comments: CommentBlogData[]) => {
    const commentMap: Record<string, CommentBlogData> = {};
    const rootComments: CommentBlogData[] = [];

    comments.forEach((comment) => {
      commentMap[comment.id] = comment;

      if (comment.reply_to && commentMap[comment.reply_to]) {
        const parentComment = commentMap[comment.reply_to];
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(comment);
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  };

  const nestedComments = buildCommentTree(comments || []);

  return (
    <Stack sx={{ mt: 3 }} spacing={2}>
      {nestedComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};

export default memo(Comments);