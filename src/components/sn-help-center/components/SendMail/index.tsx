import { Stack } from "@mui/material";
import { Form, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";

export const HelperSendMail = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      mt={{md: 13, xs: 5}}
      mb={{md: 17, xs: 0}}
      sx={{
        backgroundImage: isMdSmaller
          ? "url(/images/bg-help-send-mail-mobile.png)"
          : "url(/images/bg-help-send-mail.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        minHeight: { md: 426, xs: 472 },
        mt: {md: 25, xs: 13},
        position: "relative",
        borderRadius: 4,
      }}
    >
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { md: "85%", xs: "90%" },
          height: { md: "80%", xs: "95%" },
          border: "1px solid #00FF85",
          backgroundColor: "rgba(0, 0, 0, 0.40)",
          backgroundFilter: "blur(8px)",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          px: { md: 7, xs: 3 },
          py: 5,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Text color="#fff" fontSize={{ md: 40, xs: 24 }} width="100%">
          Unlock the value of&nbsp;
          <Text component="span" fontSize="inherit" color="#00FFE0">
            management and optimization
          </Text>
          &nbsp;for your agency right now.
        </Text>
        <Text color="#fff" fontWeight={400} fontSize={{ md: 18, xs: 16 }}>
          Share your email to recieve guides and news from us
        </Text>
        <Stack mt={5}>
          <Form submitText="Send" />
        </Stack>
        <Text color="#fff" fontWeight={400} mt={3.5} fontSize={12}>
          By clicking Sign Up you&rsquo;re confirming that you agree with our
          Terms and Conditions.
        </Text>
      </Stack>
    </Stack>
  );
};
