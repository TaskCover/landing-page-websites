import { memo, useState, useEffect, useMemo } from "react";
import { Stack, Box } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { Comment } from "store/project/reducer";
import Image from "next/image";
import { formatDate } from "utils/index";
import AttachmentPreview from "components/AttachmentPreview";
import { useTranslations } from "next-intl";
import { NS_PROJECT, NS_SALES } from "constant/index";
import { Attachment } from "constant/types";
import { useFormContext, useWatch } from "react-hook-form";
import useGetEmployeeOptions from "components/sn-sales/hooks/useGetEmployeeOptions";
import { SalesComment } from "store/sales/reducer";
import { useSaleDetail } from "store/sales/selectors";
import Loading from "components/Loading";

type CommentsProps = {
  comments?: SalesComment[];
};

type CommentItemProps = {} & SalesComment;

const Comments = () => {
  const salesT = useTranslations(NS_SALES);
  const { isFetching } = useSaleDetail();
  const { control, getValues } = useFormContext();
  const [listAttachmentsDown, setListAttachmentsDown] = useState<Attachment[]>(
    [],
  );

  const comments = useWatch({ control, name: "comments" });

  return isFetching ? (
    <Loading open={isFetching} />
  ) : (
    <Stack sx={{ mt: 3 }} spacing={2}>
      {comments?.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          listAttachmentsDown={listAttachmentsDown}
        />
      ))}
    </Stack>
  );
};

export default memo(Comments);

const CommentItem = (props: CommentItemProps) => {
  const {
    creator: { body },
    content,
    attachments_down = [],
    created_time,
    listAttachmentsDown,
  } = props;
  // const { employeeOptions } = useGetEmployeeOptions();
  //   const user = useMemo(() => {
  //     if (!creator) return undefined;
  //     const userInSale = employeeOptions?.find(
  //       (member) => member.avatar=== creator,
  //     );
  //     return userInSale ?? creator;
  //   }, [creator, employeeOptions]);

  return (
    <Stack flex={1} spacing={1} bgcolor="grey.50" p={2} borderRadius={1}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={body?.avatar?.link} />
          <Stack>
            <Text variant="body2">{body?.fullname ?? "--"}</Text>
            <Text variant="caption" color="grey.400">
              {body?.email ?? "--"}
            </Text>
          </Stack>
        </Stack>
        <Text variant="body2" color="grey.400">
          {formatDate(created_time, "HH:mm - dd/MM/yyyy")}
        </Text>
      </Stack>

      {!!content && (
        <Box
          sx={{
            fontSize: 14,
            "& *": {
              marginBlockStart: 0,
              marginBlockEnd: 0,
              wordBreak: "break-all",
            },
          }}
          className="html"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      <Stack direction="row" gap={1.5} flex={1} flexWrap="wrap">
        {attachments_down.map((attachment) => (
          <AttachmentPreview
            key={attachment.link}
            src={attachment.link}
            name={attachment.name}
            listData={attachments_down}
            listAttachmentsDown={listAttachmentsDown}
          />
        ))}
      </Stack>
    </Stack>
  );
};
