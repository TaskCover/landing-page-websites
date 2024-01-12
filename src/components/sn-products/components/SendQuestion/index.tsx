import { Stack, Input, Button } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import ArrowIcon from "icons/ArrowIcon";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { nextPage, prePage } from "store/product-page/reducer";
import { useRouter, usePathname } from "next/navigation";
import { ROUTER_PRODUCT } from "constant/index";
import { useState, useEffect } from "react";


export const SendQuestion = () => {
  const { isMdSmaller } = useBreakpoint();
  const { value } = useAppSelector((state) => state.counterPage);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const count = value;

  const handlerNextPage = () => {
    dispatch(nextPage());
    if (count + 1 >= ROUTER_PRODUCT.length) return;
    ROUTER_PRODUCT[count + 1] && router.push(ROUTER_PRODUCT[count + 1].url);
  };

  const handlerPrevPage = () => {
    dispatch(prePage());
    if (count - 1 === 0) return;
    ROUTER_PRODUCT[count - 1] && router.push(ROUTER_PRODUCT[count - 1].url);
  };


  // useEffect(() => {
  //     const handleStart = (url) => (url !== pathName) && setLoading(true);
  //     const handleComplete = (url) => (url === pathName) && setLoading(false);

  //     router.events.on('routeChangeStart', handleStart)
  //     router.events.on('routeChangeComplete', handleComplete)
  //     router.events.on('routeChangeError', handleComplete)

  //     return () => {
  //         router.events.off('routeChangeStart', handleStart)
  //         router.events.off('routeChangeComplete', handleComplete)
  //         router.events.off('routeChangeError', handleComplete)
  //     }
  // })

  return (
    <Stack position="relative">
      <Stack
        sx={{
          backgroundImage: `url(/images/bg-send-question-product${
            isMdSmaller ? "-mobile" : ""
          }.png)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          aspectRatio: { md: "1169/390", xs: "343/482" },
          mt: {md: 21.875, xs: 10},
          alignItems: { md: "flex-end", xs: "center" },
          justifyContent: {md: "center", xs: "flex-start"},
          pt: {md: 0, xs: 5}
        }}
      >
        <Stack
          width={{ md: "50%", xs: "100%" }}
          mr={{ md: 3, xs: 0 }}
          alignItems={{ md: "flex-start", xs: "center" }}
        >
          <Text
            fontSize={24}
            color="#fff"
            fontWeight={700}
            textAlign={{ md: "left", xs: "center" }}
          >
            Don&rsquo;t sure about it?{" "}
            <Text
              fontSize="inherit"
              component="span"
              fontWeight={700}
              color="#11C77F"
            >
              We
            </Text>{" "}
            are here to{" "}
            <Text
              fontSize="inherit"
              component="span"
              fontWeight={700}
              color="#11C77F"
            >
              {" "}
              support
            </Text>{" "}
            you!
          </Text>
          <Input
            placeholder="TYPE YOUR QUESTION"
            disableUnderline
            sx={{
              color: "rgba(255, 255, 255, 0.80)",
              textTransform: "uppercase",
              border: "1px solid rgba(255, 255, 255, 0.70)",
              background: "rgba(0, 0, 0, 0.34)",
              backdropFilter: "blur(6px)",
              borderRadius: 8,
              width: "90%",
              py: {md: 1.75, xs: 1.2},
              px: 3,
              mt: 2,
            }}
          />
          <Button
            sx={{
              width: "90%",
              background: "#fff",
              mt: {md: 3, xs: 1.75},
              py: {md: 1.75, xs: 1.2},
              borderRadius: 8,
              "&:hover": {
                background: "#fff",
              },
            }}
          >
            <TextGradient>Send</TextGradient>
          </Button>
        </Stack>
      </Stack>
      <Stack mt={{ md: 15, xs: 10 }} mb={10} direction="row">
        <Stack
          onClick={handlerPrevPage}
          flex="1"
          sx={{
            border: "1px solid #BDD6FB",
            height: { md: 212, xs: 100 },
            justifyContent: "center",
            pl: { md: "10%", xs: "5%" },
            cursor: "pointer",
          }}
        >
          <Text
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowIcon /> Previous
          </Text>
          <Text fontSize={{ md: 32, xs: 14 }} mt={3} fontWeight={500}>
            {ROUTER_PRODUCT[count - 1]?.label
              ? ROUTER_PRODUCT[count - 1].label
              : ROUTER_PRODUCT[0].label}
          </Text>
        </Stack>
        <Stack
          onClick={handlerNextPage}
          flex="1"
          sx={{
            background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
            justifyContent: "center",
            pr: { md: "10%", xs: "5%" },
            alignItems: "flex-end",
            cursor: "pointer",
          }}
        >
          <Text
            color="#fff"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {" "}
            Next <ArrowIcon sx={{ transform: "rotate(180deg)" }} />
          </Text>
          <Text
            fontSize={{ md: 32, xs: 14 }}
            mt={3}
            color="#fff"
            fontWeight={500}
          >
            {ROUTER_PRODUCT[count + 1]?.label
              ? ROUTER_PRODUCT[count + 1].label
              : ROUTER_PRODUCT[ROUTER_PRODUCT.length - 1].label}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
