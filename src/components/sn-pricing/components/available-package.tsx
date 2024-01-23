import { Stack, styled } from "@mui/material";
import useBreakpoint from "hooks/useBreakpoint";
import { memo, useState } from "react";
import { Button, Text } from "components/shared";
import Image from "next/image";
import Switch, { SwitchProps } from "@mui/material/Switch";
import {
  ListPackageLink,
  ListPackageUnbeatuble,
  TableBackgroundItem,
  TableBodyPackage,
  TableHeadPackage,
} from "../configs";
import CheckIcon from "public/images/pricing/icon-check.svg";

type AvailablePackageProps = {};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 26,
  padding: 0,
  borderRadius: 50,
  display: "flex",
  alignItems: "center",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 60,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(29px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(33px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)"
            : "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 21,
    height: 21,
    borderRadius: 50,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)"
        : "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
    boxSizing: "border-box",
  },
}));

const AvailablePackage = (props: AvailablePackageProps) => {
  const { isMdSmaller } = useBreakpoint();
  const [switchState, setSwitchState] = useState(false);

  const onChangeSwitch = () => {
    setSwitchState((prev) => !prev);
  };

  return (
    <Stack width="100%" sx={{}}>
      <Stack sx={sectionContainerSx}>
        <Text
          component="span"
          sx={[
            {
              ...textGradientSx,
              fontSize: { xs: "24px", md: "40px" },
              lineHeight: { xs: "32px", md: "38px" },
              fontWeight: 600,
              textAlign: "center",
              background:
                "linear-gradient(90deg, #0575E6 27.8%, #38E27B 66.38%)",
            },
          ]}
        >
          Unlock Unbeatuble Value
        </Text>
        <Text
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            lineHeight: { xs: "24px", md: "32px" },
            fontWeight: 400,
            textAlign: "center",
            m: "16px 0px 36px",
          }}
        >
          Don’t miss out exclusive features - explore our options and elevate
          your experience!
        </Text>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          mb="40px"
        >
          <Text variant="h5">Monthly</Text>
          <AntSwitch
            checked={switchState}
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
            onChange={onChangeSwitch}
          />
          <Text variant="h5">Yearly</Text>
        </Stack>
        <Stack
          direction="column"
          display={{ xs: "flex", md: "grid" }}
          sx={{
            gap: { xs: "24px", md: "0" },
            gridTemplateColumns: "repeat(4,1fr)",
            gridTemplateRows: "1fr",
            borderRadius: "16px",
            backgroundColor: { xs: "none", md: "rgba(255,255,255,.2)" },
            boxShadow: {
              xs: "none",
              md: "0px 0px 14.93px 0px rgba(170, 198, 245, 0.60)",
            },
            overflow: "hidden",
          }}
        >
          {ListPackageUnbeatuble.map((item, index) => {
            const isActive = item.isActive;
            return (
              <Stack
                key={index}
                sx={{
                  p: "40px 20px",
                  gap: "40px",
                  justifyContent: "space-between",
                  backgroundColor: isActive ? "#5C98F6" : "#fff",
                  borderRadius: { xs: "16px", md: "0" },
                  boxShadow: {
                    xs: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
                    md: "",
                  },
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    gap: "4px",
                    height: item.isFree && isMdSmaller ? "0" : "40px",
                  }}
                >
                  {!item.isFree ? (
                    <>
                      <Text
                        variant="h5"
                        sx={{
                          color: "#000B33",
                          height: "100%",
                          justifyContent: "start",
                        }}
                      >
                        $
                      </Text>
                      <Text
                        variant="h2"
                        sx={{
                          color: "#000B33",
                          width: "fit-content",
                          fontWeight: 400,
                          lineHeight: "40px",
                        }}
                      >
                        {item.pricePackage && item.pricePackage}
                      </Text>
                      <Stack
                        sx={{
                          height: "100%",
                          justifyContent: "end",
                        }}
                      >
                        <Text
                          variant="h6"
                          sx={{
                            color: isActive ? "#fff" : "#5C98F6",
                            fontWeight: 400,
                          }}
                        >
                          Per user/{switchState ? "yearly" : "monthly"}
                        </Text>
                      </Stack>
                    </>
                  ) : (
                    <Stack height="40px"></Stack>
                  )}
                </Stack>
                <Stack height="100%" justifyContent="start">
                  <Stack gap="8px" direction="row" alignItems="center" mb="8px">
                    <Text
                      color={isActive ? "#fff" : "#212121"}
                      sx={{
                        fontSize: "20px",
                        lineHeight: "32px",
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </Text>
                    {item.tag && (
                      <Stack
                        p="4px"
                        borderRadius="4px"
                        sx={{
                          backgroundColor: isActive ? "#fff" : "#5C98F6",
                          color: "#fff",
                        }}
                      >
                        <Text
                          sx={[
                            isActive ? textGradientSx : { color: "#fff" },
                            {
                              fontSize: "12px",
                              fontWeight: 400,
                              lineHeight: "16px",
                            },
                          ]}
                        >
                          {item.tag}
                        </Text>
                      </Stack>
                    )}
                  </Stack>
                  <Text sx={textDescSx} color={isActive ? "#fff" : "#212121"}>
                    {item.desc}
                  </Text>
                  <Stack
                    sx={{
                      my: "24px",
                      backgroundColor: "#DEEAFD",
                      width: "100%",
                      height: "1px",
                    }}
                  />
                  <Stack gap="8px">
                    {item.infoItems.map((e, i) => (
                      <Stack
                        key={i}
                        direction="row"
                        alignItems="center"
                        gap="14px"
                      >
                        <Image
                          src={CheckIcon}
                          width={16}
                          height={16}
                          alt="icon"
                        />
                        <Text
                          sx={textDescSx}
                          color={isActive ? "#fff" : "#212121"}
                        >
                          {e}
                        </Text>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>

                <Button
                  sx={{
                    width: "100%",
                    background: isActive
                      ? "#fff"
                      : "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                    color: isActive ? "#000" : "#fff",
                    fontSize: { xs: "14px", md: "16px" },
                    borderRadius: "24px",
                    p: "12px 24px",
                  }}
                >
                  {item.isFree ? "Start for free" : "Buy now"}
                </Button>
              </Stack>
            );
          })}
        </Stack>
        <Stack
          mt={{ xs: "40px", md: "60px" }}
          sx={{
            borderRadius: "16px",
            boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
            overflow: "auto",
          }}
        >
          <Stack>
            <Stack
              display="grid"
              sx={{
                gridTemplateColumns: {
                  xs: "220px repeat(5,170px)",
                  md: "2fr repeat(5,1fr)",
                },
                gridTemplateRows: "1fr",
              }}
            >
              {TableHeadPackage.map((item, index) => {
                const isPremiumPackage =
                  TableHeadPackage[TableHeadPackage.length - 1].packageName ==
                  item.packageName;
                return (
                  <Stack key={index}>
                    {item.isNoneItem ? (
                      <Stack></Stack>
                    ) : (
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        gap="8px"
                        p="20px"
                        sx={{
                          backgroundColor: item.bgColor,
                        }}
                      >
                        <Image src={item.icon} alt="icon" />
                        <Text
                          variant="h6"
                          fontWeight={400}
                          color={isPremiumPackage ? "#fff" : "#212121"}
                        >
                          {item.packageName}
                        </Text>
                        {item.isFree ? (
                          <Text variant="h4" fontWeight={700} color="#5C98F6">
                            Free to start
                          </Text>
                        ) : (
                          <Stack direction="row" alignItems="center">
                            <Text
                              component="span"
                              variant="h4"
                              fontWeight={700}
                              color={isPremiumPackage ? "#fff" : "#212121"}
                            >
                              ${item.pricePackage}/
                            </Text>
                            <Text
                              component="span"
                              variant="h6"
                              fontWeight={400}
                              color={isPremiumPackage ? "#fff" : "#212121"}
                            >
                              {switchState ? "yearly" : "monthly"}
                            </Text>
                          </Stack>
                        )}
                      </Stack>
                    )}
                  </Stack>
                );
              })}
            </Stack>
            <Stack width="100%">
              {TableBodyPackage.map((item, index) => {
                return (
                  <Stack
                    key={index}
                    display="grid"
                    sx={{
                      gridTemplateColumns: {
                        xs: "220px repeat(5,170px)",
                        md: "2fr repeat(5,1fr)",
                      },
                      gridTemplateRows: "1fr",
                    }}
                  >
                    <Stack p="16px" border="1px solid rgba(0, 0, 0, 0.03)">
                      <Text
                        sx={{
                          fontSize: "16px",
                          fontWeight: 700,
                          lineHeight: "24px",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                        }}
                      >
                        {item.desc}
                      </Text>
                    </Stack>
                    {item.listValue &&
                      item.listValue?.map((e, i) => {
                        const isPremiumPackage =
                          item.listValue[item.listValue.length - 1] == e;

                        return (
                          <Stack
                            key={i}
                            p="16px"
                            justifyContent="center"
                            alignItems="center"
                            border="1px solid rgba(0, 0, 0, 0.03)"
                            sx={{
                              backgroundColor: TableBackgroundItem[i],
                            }}
                          >
                            <Text
                              variant="h5"
                              sx={{
                                color: isPremiumPackage ? "#fff" : "#212121",
                              }}
                            >
                              {e}{" "}
                              {item.title == "Map views" &&
                                `/${switchState ? "year" : "month"}`}
                            </Text>
                          </Stack>
                        );
                      })}
                    {item.listAvailable &&
                      item.listAvailable?.map((e, i) => (
                        <Stack
                          key={i}
                          p="16px"
                          justifyContent="center"
                          alignItems="center"
                          border="1px solid rgba(0, 0, 0, 0.03)"
                          sx={{
                            backgroundColor: TableBackgroundItem[i],
                          }}
                        >
                          <Image src={e} width={20} height={20} alt="icon" />
                        </Stack>
                      ))}
                  </Stack>
                );
              })}
            </Stack>
            <Stack
              display="grid"
              sx={{
                gridTemplateColumns: {
                  xs: "220px repeat(5,170px)",
                  md: "2fr repeat(5,1fr)",
                },
                gridTemplateRows: "1fr",
              }}
            >
              <Stack></Stack>
              {ListPackageLink.map((item, i) => (
                <Stack
                  key={i}
                  p="16px"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid rgba(0, 0, 0, 0.03)"
                  sx={{
                    backgroundColor: TableBackgroundItem[i],
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
                      background:
                        "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                      color: "#fff",
                      fontSize: { xs: "14px", md: "16px" },
                      borderRadius: "24px",
                      p: "10px 24px",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(AvailablePackage);
const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "40px 16px 60px", md: "60px 0px 120px" },
  position: "relative",
};

const textGradientSx = {
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
};

const textDescSx = {
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
};
