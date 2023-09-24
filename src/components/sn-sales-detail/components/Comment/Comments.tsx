import { memo, useState, useEffect, useMemo } from "react";
import { Stack, Box } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { Comment } from "store/project/reducer";
import Image from "next/image";
import { formatDate } from "utils/index";
import AttachmentPreview from "components/AttachmentPreview";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT, NS_SALES } from "constant/index";
import { Attachment } from "constant/types";
import { useFormContext, useWatch } from "react-hook-form";
import useGetEmployeeOptions from "components/sn-sales/hooks/useGetEmployeeOptions";
import { SalesComment } from "store/sales/reducer";
import { useSaleDetail } from "store/sales/selectors";
import Loading from "components/Loading";
import { Dropdown } from "components/Filters";

type CommentsProps = {
  comments?: SalesComment[];
};

type CommentItemProps = { type: string } & SalesComment;

const Comments = () => {
  const salesT = useTranslations(NS_SALES);
  const commonT = useTranslations(NS_COMMON);
  const { isFetching } = useSaleDetail();
  const [comentType, setCommentType] = useState("comments");
  const { control, getValues } = useFormContext();
  const [listAttachmentsDown, setListAttachmentsDown] = useState<Attachment[]>(
    [],
  );

  const comments = useWatch({ control, name: "comments" });

  const filteredComments = useMemo(() => {
    if (!comments) return [];
    if (comentType === "comments") return comments;
    return comments.filter((comment) => comment.attachments.length > 0);
  }, [comments, comentType]);

  return isFetching ? (
    <Loading open={isFetching} />
  ) : (
    <Stack sx={{ mt: 3 }} spacing={2}>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Text>Show:</Text>
        <Dropdown
          onChange={(name, value) => {
            setCommentType(value);
          }}
          placeholder={commonT("all")}
          value={comentType}
          options={[
            {
              label: salesT("detail.comment.show.comments"),
              value: "comments",
            },
            {
              label: salesT("detail.comment.show.attachment"),
              value: "attachments",
            },
          ]}
          name="type"
          hasAll={false}
        />
      </Stack>
      {filteredComments?.map((comment) => (
        <CommentItem
          key={comment.id}
          type={comentType}
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
    type,
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

      {!!content && type === "comments" && (
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
