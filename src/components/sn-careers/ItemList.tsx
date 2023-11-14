"use client";
import { Stack, TableRow } from "@mui/material";
import FixedLayout from "components/FixedLayout";
import {
  ActionsCell,
  BodyCell,
  CellProps,
  TableLayout,
} from "components/Table";
import { ACCESS_TOKEN_STORAGE_KEY, NS_CAREER } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import { HEADER_HEIGHT } from "layouts/Header";
import Pagination from "components/Pagination";
import { useTranslations } from "next-intl";
import { memo, useEffect, useMemo, useState } from "react";
// import { useCategoryBlogs } from "store/blog-category/selectors";
import DesktopCells from "./components/DesktopCells";
import MobileContentCells from "./components/MobileContentCell";
import useQueryParams from "hooks/useQueryParams";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import { useCareer } from "store/career/selectors";
import { DataAction } from "constant/enums";
import { CareerData } from "store/career/action";
import ConfirmDialog from "components/ConfirmDialog";
import Form from "./components/Form";
import { CareergDataForm } from "store/career/type";
import { clientStorage } from "utils/storage";

const ItemList = () => {
  const careerT = useTranslations(NS_CAREER);
  const { isMdSmaller } = useBreakpoint();
  // const { loading, categories } = useSelector((state: RootState) => state.categoryBlogs);
  const { initQuery, isReady, query } = useQueryParams();
  const { onGetCareer, onUpdateCareer, items, totalItems, total_page, page, size, isIdle } = useCareer();
  const pathname = usePathname();
  const { push } = useRouter();
  const [action, setAction] = useState<DataAction | undefined>();
  const [item, setItem] = useState<CareerData>();
  const [careerId, setCareerId] = useState<string | undefined>();


  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      { value: careerT("careerTable.title"), width: "15%", align: "left" },
      { value: careerT("careerTable.location"), width: "15%", align: "left" },
      { value: careerT("careerTable.time"), width: "20%", align: "left" },
      { value: careerT("careerTable.numberOfHires"), width: "10%", align: "left" },
      {
        value: careerT("careerTable.description"),
        width: "25%",
        align: "left",
      },
      { value: careerT("status"), width: "10%", align: "left" },
      { value: careerT("careerTable.responsed"), width: "5%", align: "left" },
    ],
    [careerT],
  );

  const onChangeQueries = (queries: { [key: string]: any }) => {
    const newQueries = { ...query, ...queries };
    const path = getPath(pathname, newQueries);
    push(path);

    onGetCareer(newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ page: newPage, size });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ page: 1, size: newPageSize });
  };

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? MOBILE_HEADER_LIST
      : desktopHeaderList;

    return [
      ...additionalHeaderList,
      { value: "", width: isMdSmaller ? "20%" : "8%" },
    ] as CellProps[];
  }, [isMdSmaller, desktopHeaderList]);

  useEffect(() => {
    if (!isReady) return;
    onGetCareer({ ...initQuery });
  }, [initQuery, isReady, onGetCareer]);

  const onActionToItem = (action: DataAction, item?: CareerData) => {
    return () => {
      if (action === DataAction.DELETE) {
        setCareerId(item?.slug);
      } else {
        item && setItem(item);
      }
      setAction(action);
    };
  };

  const onResetAction = () => {
    setItem(undefined);
    setAction(undefined);
    setCareerId(undefined);
  };

  const onUpdateCareer_submit = async (id: string, data: CareergDataForm) => {
    if (!item) return; // Nếu item là undefined, thoát khỏi hàm
    console.log(data);
    console.log(id);
    // return 200;
    const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
    return await onUpdateCareer(id as string, data, accessToken);
  };

  //định dạng ngày
  const chuyen_dinh_dang_ngay = (dateString) => {
    // console.log(dateString);
    const dateObject = new Date(dateString);

    // Lấy thông tin ngày, tháng, năm
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    // Tạo chuỗi mới với định dạng yyyy/mm/dd
    const formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
    return formattedDate;
  };

  return (
    <>
      <FixedLayout>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          pb={0.25}
        ></Stack>
        <TableLayout
          headerList={headerList}
          noData={!isIdle && totalItems === 0}
          px={{ xs: 0, md: 3 }}
          containerHeaderProps={{
            sx: {
              maxHeight: { xs: 0, md: undefined },
              minHeight: { xs: 0, md: HEADER_HEIGHT },
            },
          }}
          sx={{ bgcolor: { xs: "grey.50", md: "transparent" } }}
        >
          {items.map((item, index) => {
            return (
              <TableRow key={index}>
                {isMdSmaller ? (
                  <MobileContentCells item={item} />
                ) : (
                  <DesktopCells item={item} />
                )}
                <ActionsCell
                  sx={{
                    pl: { xs: 0.5, md: 0 },
                    verticalAlign: { xs: "top", md: "middle" },
                    pt: { xs: 2, md: 0 },
                  }}
                  iconProps={{
                    sx: {
                      p: { xs: "4px!important", lg: 1 },
                    },
                  }}
                  onEdit={onActionToItem(DataAction.UPDATE, item)}
                  hasPopup={false}
                />
              </TableRow>
            );
          })}
        </TableLayout>
        <Pagination
          totalItems={total_page}
          totalPages={total_page}
          page={page}
          pageSize={size}
          containerProps={{ px: { md: 3 }, py: 1 }}
          onChangePage={onChangePage}
          onChangeSize={onChangeSize}
        />
      </FixedLayout>

      {action === DataAction.UPDATE && (
        <Form
          open
          onClose={onResetAction}
          type={DataAction.UPDATE}
          initialValues={
            {
              title: item?.title,
              description: item?.description,
              location: item?.location,
              start_time: chuyen_dinh_dang_ngay(item?.start_time),
              end_time: chuyen_dinh_dang_ngay(item?.end_time),
              numberOfHires: item?.numberOfHires,
              is_opening: String(item?.is_opening),
              slug: item?.slug,
            } as CareergDataForm
          }
          onSubmit={(values) => onUpdateCareer_submit(String(item?.id), values)}
        />
      )}
    </>
  );
};

export default memo(ItemList);

const MOBILE_HEADER_LIST = [{ value: "", width: "100%", align: "left" }];
function onAddSnackbar(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}
