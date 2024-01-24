"use client";

import { Container, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import useQueryParams from "hooks/useQueryParams";
import Image from "next/image";
import ArrowRightIc from "public/images/careers/icon-arrow-right.svg";
import LocationIc from "public/images/careers/icon-location.svg";
import TimerIc from "public/images/careers/icon-timer.svg";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCareer } from "store/career/selectors";
import { formatDate } from "utils/index";
import { DetailCareerData, ListFormSubmit } from "../helpers/helpers";
import { FormType } from "constant/enums";
import FormApply from "../components/FormApply";
import { useParams } from "next/navigation";
import { useAppDispatch } from "store/hooks";
import Link from "next/link";
import { HEADER_HEIGHT } from "layouts/Header";

type DetailCareerPageProps = {};
const Init_Query = {
  status: "CAN_APPLY",
  page: 1,
  size: 8,
};
const DetailCareerPage = (props: DetailCareerPageProps) => {
  const { isMdSmaller } = useBreakpoint();
  const [showForm, setShowForm] = useState(true);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { initQuery, isReady, query } = useQueryParams();

  const {
    onGetCareer,
    onGetCareerBySlug,
    items,
    item,
    totalItems,
    total_page,
    page,
    size,
    isIdle,
    onUpdateCareerStatus: onApproveOrRejectAction,
  } = useCareer();

  useEffect(() => {
    dispatch(() => onGetCareer(Init_Query));
  }, [dispatch, onGetCareer]);

  useEffect(() => {
    if (id) {
      dispatch(() => onGetCareerBySlug(id.toString() as string));
    }
  }, [id]);

  return (
    <Stack width="100%" pt={HEADER_HEIGHT / 8 + 1}>
      <Stack
        width="100%"
        sx={{
          background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
        }}
      >
        <Stack
          sx={[
            sectionContainerSx,
            {
              gap: "24px",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text
            variant="h5"
            sx={{
              letterSpacing: "3.2px",
              color: "#fff",
            }}
          >
            Career
          </Text>
          <Text
            sx={{
              fontSize: { xs: "24px", md: "36px" },
              fontWeight: { xs: 500, md: 700 },
              lineHeight: { xs: "32px", md: "44px" },
              textAlign: "center",
              color: "#fff",
            }}
          >
            JOIN US TO STRIVE FOR {isMdSmaller && <br />} EXCELLENCE
          </Text>
          <Button
            sx={{
              p: "12px 24px",
              background: "#fff",
              width: { xs: "105px", md: "130px" },
            }}
          >
            <Text variant="h5" sx={textGradientSx}>
              Contact Us
            </Text>
          </Button>
        </Stack>
      </Stack>
      <Container>
        <Stack
          sx={[
            sectionContainerSx,
            {
              gap: { xs: "40px", md: "80px" },
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text
            variant="h3"
            sx={{
              fontSize: { xs: "24px", md: "30px" },
              fontWeight: { xs: 500, md: 700 },
              lineHeight: { xs: "32px", md: "44px" },
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {item?.title}
          </Text>
          <Stack
            gap={{ xs: "24px", md: "40px" }}
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
          >
            <Stack gap="24px" width="100%">
              {DetailCareerData.map((item, index) => (
                <Stack gap="16px" key={index}>
                  <Text variant="h5" fontWeight={700}>
                    {item.title}
                  </Text>
                  {item.desc?.map((e, i) => (
                    <Text key={i} variant="h6" fontWeight={400}>
                      • {e}
                    </Text>
                  ))}
                </Stack>
              ))}
              <Stack gap="16px">
                <Text variant="h5" fontWeight={700}>
                  Applications:
                </Text>
                <Stack sx={{}}>
                  <Text component="span" variant="h6" fontWeight={400}>
                    Candidates apply online by clicking
                    <Text
                      component="span"
                      variant="h6"
                      fontWeight={400}
                      sx={[
                        textGradientSx,
                        {
                          transition: ".3s",
                          "&:hover": {
                            cursor: "pointer",
                            transform: "scale(1.02)",
                            transition: ".3s",
                          },
                        },
                      ]}
                      onClick={() => setShowForm(!showForm)}
                    >
                      {" "}
                      Apply now{" "}
                    </Text>
                    below.
                  </Text>
                </Stack>
                <Button
                  sx={{
                    p: "12px 24px",
                    background:
                      "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                    width: { xs: "105px", md: "130px" },
                    mb: "24px",
                  }}
                  onClick={() => setShowForm(!showForm)}
                >
                  <Text variant="h5" color="#fff">
                    Apply now
                  </Text>
                </Button>
                {showForm ? <FormApply slug={id as string} /> : <></>}
              </Stack>
            </Stack>
            <Stack gap="24px" width="100%">
              <Text variant="h5" fontWeight={700} color="#225976">
                Other jobs
              </Text>
              <Stack
                width="100%"
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1,1fr)",
                  md: "repeat(1,1fr)",
                }}
                gap={{ xs: "24px", md: "40px" }}
              >
                {items.map((item, index) => {
                  return (
                    <Stack
                      key={index}
                      width="100%"
                      sx={{
                        p: "24px",
                        gap: "16px",
                        borderRadius: "16px",
                        border: "1px solid #fff",
                        backgroundColor: "rgba(255, 255, 255, 0.20)",
                        boxShadow:
                          " 0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
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
                          <Image
                            src={LocationIc}
                            width={12}
                            height={12}
                            alt="icon"
                          />
                          <Text variant="h5" fontWeight={700}>
                            {item.location}
                          </Text>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Image
                            src={TimerIc}
                            width={12}
                            height={12}
                            alt="icon"
                          />
                          <Text variant="h5" fontWeight={700}>
                            {formatDate(item.start_time, "dd-MM-yyyy")}
                          </Text>
                        </Stack>
                      </Stack>
                      <Link href={`/careers/${item.slug}`}>
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
                            },
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
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(DetailCareerPage);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "60px 16px", md: "80px 0px " },
};

const textGradientSx = {
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
