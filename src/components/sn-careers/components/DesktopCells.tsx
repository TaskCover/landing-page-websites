import { Chip, Fab, IconButton, Tooltip } from "@mui/material";
import { BodyCell } from "components/Table";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  NS_CAREER,
  NS_FEEDBACK,
} from "constant/index";
import { useTranslations } from "next-intl";
import { memo, useState } from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { DataAction } from "constant/enums";
import Form from "./Form";
import { clientStorage } from "utils/storage";
import { CareerData } from "store/career/action";
import { useCareer } from "store/career/selectors";

type DesktopCellsProps = {
  item: CareerData;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { onGetCareer, items, totalItems, total_page, page, size, isIdle } =
    useCareer();
  const careerT = useTranslations(NS_CAREER);
  const [item, setItem] = useState<CareerData>();
  const [action, setAction] = useState<DataAction | undefined>();

  const onActionToItem = (action: DataAction, item?: CareerData) => {
    return () => {
      if (action === DataAction.DELETE) {
        //Không Có chức năng này
        console.log(props.item);
      } else {
        item && setItem(props.item);
        // console.log(action);
      }
      setAction(action);
    };
  };

  const onResetAction = () => {
    setAction(undefined);
  };

  // const onResponsedContent = async (data: FeedbackData) => {
  //   if (!item) return; // Nếu item là undefined, thoát khỏi hàm
  //   // console.log(data);
  //   const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
  //   return await onRespondToFeedback(data.id as string, data, accessToken);
  //   // console.log(accessToken);
  //   // return 200;
  // };
  const chuyen_dinh_dang_ngay = (dateString) => {
    const dateObject = new Date(dateString);

    // Lấy thông tin ngày, tháng, năm
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    // Tạo chuỗi mới với định dạng yyyy/mm/dd
    const formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  return (
    <>
      <BodyCell align="left">{props.item.title}</BodyCell>
      <BodyCell align="left">{props.item.location}</BodyCell>
      <BodyCell align="left">
        {chuyen_dinh_dang_ngay(props.item.start_time)} {careerT("careerTable.endtime")} {chuyen_dinh_dang_ngay(props.item.end_time)}
      </BodyCell>
      <BodyCell align="left">{props.item.numberOfHires}</BodyCell>
      <BodyCell align="left">{props.item.description}</BodyCell>
      {/* <BodyCell align="left">{item.responsed_content}</BodyCell> */}
      <BodyCell align="left">
        {props.item.is_opening === true ? (
          <Chip
            size="small"
            label={careerT("careerTable.statusList.is_opening")}
            color="success"
          />
        ) : (
          <Chip
            size="small"
            label={careerT("careerTable.statusList.is_closed")}
            color="primary"
          />
        )}
      </BodyCell>
      <BodyCell align="left">
        {/* {props.item.is_opening === true ? (
          <Tooltip title={careerT("careerTable.editResponsed")}>
            <IconButton color="primary" size="large" onClick={onActionToItem(DataAction.UPDATE, props.item)} >
              <ForwardToInboxIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )} */}
        {/* <Tooltip title={careerT("careerTable.editResponsed")}>
            <IconButton color="primary" size="large" onClick={onActionToItem(DataAction.UPDATE, item)} >
              <ForwardToInboxIcon />
            </IconButton>
          </Tooltip>*/}
      </BodyCell>
      {/* {action === DataAction.UPDATE && (
        <Form
          open
          onClose={onResetAction}
          type={DataAction.UPDATE}
          initialValues={
            {
              id: props.item?.id,
              name: props.item?.name,
              phone: props.item?.phone,
              email: props.item?.email,
              title: props.item?.title,
              content: props.item?.content,
              status: props.item?.status,
              created_time: props.item?.created_time,
              responsed_by: props.item?.responsed_by,
              responsed_content: props.item?.responsed_content,
              responsed_time: props.item?.responsed_time,
            } as FeedbackData
          }
          onSubmit={onResponsedContent}
        />
      )} */}
    </>
  );
};
export default memo(DesktopCells);
