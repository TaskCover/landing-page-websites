"use client";

import { Stack } from '@mui/material';
import { Button, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import { memo, useEffect, useState } from 'react';
import { DetailCareerData } from '../helpers/helpers';
import Image from "next/image";
import useQueryParams from 'hooks/useQueryParams';
import { useCareer } from 'store/career/selectors';
import LocationIc from "public/images/careers/icon-location.svg";
import TimerIc from "public/images/careers/icon-timer.svg";
import { formatDate, getPath } from 'utils/index';
import ArrowRightIc from "public/images/careers/icon-arrow-right.svg";
import { Date } from "components/Filters";
import { DATE_FORMAT_HYPHEN, NS_COMMON, NS_SALES } from "constant/index";
import { Controller, useForm, useFormContext, useWatch } from "react-hook-form";
import { TTimeRanges } from 'components/sn-budgeting/TabDetail/Time';

type DetailCareerPageProps = {}

const DetailCareerPage = (props: DetailCareerPageProps) => {
    const { isMdSmaller } = useBreakpoint();
    const [showForm, setShowForm] = useState(true);

    const { onGetCareer, onUpdateCareer, items, totalItems, total_page, page, size, isIdle, onUpdateCareerStatus: onApproveOrRejectAction, } = useCareer();
    const { initQuery, isReady, query } = useQueryParams();
    const { control, handleSubmit, setValue, getValues, reset, watch } =
        useForm();


    useEffect(() => {
        if (!isReady) return;
        onGetCareer({ ...initQuery });
    }, [initQuery, isReady, onGetCareer]);

    return (
        <Stack width="100%">
            <Stack
                width="100%"
                sx={{
                    background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                }}
            >
                <Stack
                    sx={[sectionContainerSx, {
                        gap: "24px",
                        justifyContent: "center",
                        alignItems: "center",

                    }]}
                >
                    <Text
                        variant="h5"
                        sx={{
                            letterSpacing: "3.2px",
                            color: "#fff"
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
                            color: "#fff"
                        }}
                    >
                        JOIN US TO STRIVE FOR {isMdSmaller && <br />} EXCELLENCE
                    </Text>
                    <Button sx={{
                        p: "12px 24px",
                        background: "#fff",
                        width: { xs: "105px", md: "130px" }
                    }}>
                        <Text
                            variant="h5"
                            sx={textGradientSx}
                        >
                            Contact Us
                        </Text>
                    </Button>
                </Stack>

            </Stack>

            <Stack
                sx={[sectionContainerSx, {
                    gap: { xs: "40px", md: "80px" },
                    justifyContent: "center",
                    alignItems: "center",
                }]}
            >
                <Text variant="h3"
                    sx={{
                        fontSize: { xs: "24px", md: "30px" },
                        fontWeight: { xs: 500, md: 700 },
                        lineHeight: { xs: "32px", md: "44px" },
                        textAlign: "center",
                    }}>
                    {`SENIOR EXECUTIVE – SERVICE COUNTER`}
                </Text>
                <Stack
                    gap={{ xs: "24px", md: "40px" }}
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
                >
                    <Stack gap="24px">
                        {
                            DetailCareerData.map((item) =>
                            (
                                <Stack gap="16px">
                                    <Text variant="h5" fontWeight={700}>{item.title}</Text>
                                    {item.desc?.map(e => (
                                        <Text variant="h6" fontWeight={400} >
                                            • {e}
                                        </Text>
                                    ))}
                                </Stack>
                            ))
                        }
                        <Stack gap="16px">
                            <Text variant="h5" fontWeight={700}>Applications:</Text>
                            <Stack sx={{

                            }}>
                                <Text component='span' variant="h6" fontWeight={400} >
                                    Candidates apply online by clicking
                                    <Text component='span' variant="h6" fontWeight={400}
                                        sx={[textGradientSx, {
                                            "&:hover": {
                                                cursor: "pointer"
                                            }
                                        }]} onClick={() => setShowForm(!showForm)} > Apply now </Text>
                                    below.
                                </Text>
                            </Stack>
                            <Button sx={{
                                p: "12px 24px",
                                background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                                width: { xs: "105px", md: "130px" }
                            }}>
                                <Text
                                    variant="h5"
                                    color="#fff"
                                >
                                    Apply now
                                </Text>
                            </Button>
                            {
                                showForm ?
                                    <Stack
                                        width="100%"
                                        sx={{
                                            borderRadius: "16px",
                                            border: "1px solid #fff",
                                            backgroundColor: "rgba(255, 255, 255, 0.50)",
                                            boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
                                        }}
                                    >
                                        <Controller
                                            name="todoItem.expiration_date"
                                            control={control}
                                            render={({ field }) => {
                                                const { onChange: onValueChange, ...rest } = field;
                                                const onChangeDate = (e, value) => {
                                                    onValueChange(value);
                                                };
                                                return (
                                                    <Date
                                                        label={"Birthday"}
                                                        format={DATE_FORMAT_HYPHEN}
                                                        onChange={onChangeDate}
                                                        {...rest}
                                                    />
                                                );
                                            }}
                                        />
                                    </Stack>
                                    :
                                    <></>
                            }
                        </Stack>
                    </Stack>
                    <Stack gap="24px">
                        <Text variant="h5" fontWeight={700} color="#225976">Other jobs</Text>
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
                                        }}>
                                        <Text variant="h5" fontWeight={700}>
                                            {item.title}
                                        </Text>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" >
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
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="end"
                                            gap="12px"
                                            onClick={() => { }}
                                        >

                                            <Text variant="h5" sx={textGradientSx}>
                                                APPLY NOW
                                            </Text>
                                            <Image src={ArrowRightIc} width={26} height={20} alt="icon" />

                                        </Stack>
                                    </Stack>
                                )
                            })}

                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>


    )
}

export default memo(DetailCareerPage);

const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "60px 16px", md: "80px 0px " }
};

const textGradientSx = {
    background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
};