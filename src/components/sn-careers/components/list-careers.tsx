import React, { ChangeEvent, memo, useCallback, useEffect } from "react";
import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import AppLoading from "components/AppLoading";
import useBreakpoint from "hooks/useBreakpoint";
import { DataStatus } from "constant/enums";
import { useCareer } from "store/career/selectors";
import useQueryParams from "hooks/useQueryParams";
import { formatDate, getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import { Button, Text } from "components/shared";
import LocationIc from "public/images/careers/icon-location.svg";
import TimerIc from "public/images/careers/icon-timer.svg";
import Image from "next/image";
import ArrowRightIc from "public/images/careers/icon-arrow-right.svg";
import Link from "next/link";
import Pagination from "components/Pagination";

type ListCareersLayoutProps = {};

const Init_Query = {
  status: "CAN_APPLY",
  page: 1,
  size: 8,
}

const ListCareersLayout = (props: ListCareersLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();

  const { careers, careersStatus } = useAppSelector((state) => state.career);
  const dispatch = useAppDispatch();
  const {
    onGetCareer,
    items,
    totalItems,
    total_page,
    page,
    size,
    isIdle,
    onUpdateCareerStatus: onApproveOrRejectAction,
  } = useCareer();
  const { isReady, query ,initQuery} = useQueryParams();
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isReady) return;
    onGetCareer(initQuery);
  }, [isReady, onGetCareer]);

  const onChangeQueries = (queries: { [key: string]: any }) => {
    const newQueries = { ...query, ...queries };
    const path = getPath(pathname, newQueries);
    push(path);

    onGetCareer(newQueries);
  };
  // const onChangeAll = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     const isChecked = event.target.checked;
  //     if (isChecked) {
  //       setSelectedList(items);
  //     } else {
  //       setSelectedList([]);
  //     }
  //   },
  //   [items],
  // );
  const onChangePage = (newPage: number) => {
    onChangeQueries({ page: newPage, size });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ page: 1, size: newPageSize });
  };

  const onDetailCareer = (slug) => {
    const path = getPath(pathname, slug);
    push(path);
  };

  if (careersStatus === DataStatus.LOADING) return <AppLoading />;
  return (
    <Stack
      width="100%"
      sx={{
        background: "url(/images/about-us/bg-head.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Stack sx={[sectionContainerSx]}>
        <Stack
          width="100%"
          display="grid"
          gridTemplateColumns={{ xs: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
          gap={{ xs: "24px", md: "40px" }}
        >
          {items.map((item, index) => {
            return (
              <Stack
                sx={{
                  p: "24px",
                  gap: "16px",
                  borderRadius: "16px",
                  border: "1px solid #fff",
                  backgroundColor: "rgba(255, 255, 255, 0.20)",
                  boxShadow: " 0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
                }}
              >
                <Text variant="h5" fontWeight={700}>
                  {item.title}
                </Text>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" gap="8px">
                    <Image src={LocationIc} width={12} height={12} alt="icon" />
                    <Text variant="h5" fontWeight={700}>
                      {item.location}
                    </Text>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap="8px">
                    <Image src={TimerIc} width={12} height={12} alt="icon" />
                    <Text variant="h5" fontWeight={700}>
                      {formatDate(item.start_time, "dd-MM-yyyy")}
                    </Text>
                  </Stack>
                </Stack>
                <Link href={`/careers/${item.slug?.toString()}`}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                    gap="12px"
                    sx={{
                      transition: ".3s",
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(1.02)",
                        transition: ".3s",
                      }
                    }}
                  // onClick={() => onDetailCareer(item.slug)}
                  >
                    <Text variant="h5" sx={textGradientSx}>
                      APPLY NOW
                    </Text>
                    <Image
                      src={ArrowRightIc}
                      width={26}
                      height={20}
                      alt="icon"
                    />
                  </Stack>
                </Link>
              </Stack>
            );
          })}
        </Stack>
        <Pagination
          totalItems={total_page}
          totalPages={total_page}
          page={page}
          pageSize={size}
          containerProps={{ px: { md: 3 }, py: 1 }}
          onChangePage={onChangePage}
          onChangeSize={onChangeSize}
        />
      </Stack>
    </Stack>
  );
};

export default memo(ListCareersLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "60px 16px", md: "100px 0px " },
};

const textHeadSx = {
  lineHeight: { xs: "32px", md: "60px" },
  fontSize: { xs: "24px", md: "40px" },
  fontWeight: 700,
  textAlign: "center",
};

const textGradientSx = {
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
