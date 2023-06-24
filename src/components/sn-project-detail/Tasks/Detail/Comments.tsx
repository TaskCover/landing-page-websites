import React, { memo } from "react";
import { Stack, Box } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { Comment } from "store/project/reducer";
import Image from "next/image";

type CommentsProps = {
  comments?: Comment[];
};

type CommentItemProps = {} & Comment;

const Comments = (props: CommentsProps) => {
  const { comments = [] } = props;

  return (
    <Stack spacing={6}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </Stack>
  );
};

export default memo(Comments);

const CommentItem = (props: CommentItemProps) => {
  const { creator, content, attachments_down } = props;

  return (
    <Stack flex={1} spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar size={32} src={creator?.avatar?.link} />
        <Text variant="body2">{creator?.fullname ?? "--"}</Text>
      </Stack>
      {!!content && (
        <Box
          sx={{
            fontSize: 14,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      <Stack
        direction="row"
        rowGap={1.5}
        columnGap={1.5}
        flex={1}
        flexWrap="wrap"
      >
        {attachments_down.map((attachment, index) => (
          <Stack
            key={index}
            alignItems="center"
            justifyContent="center"
            width={64}
            height={64}
            borderRadius={1}
          >
            <Image
              src={attachment.link}
              alt={attachment.name}
              width={64}
              height={64}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
