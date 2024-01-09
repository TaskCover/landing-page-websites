import { Stack, FormControl, Input } from "@mui/material";
import { Button, Text, TextGradient } from "components/shared";

export const HelperSendMail = () => {
  return (
    <Stack
      sx={{
        backgroundImage: "url(/images/bg-help-send-mail.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        minHeight: 426,
        mt: 25,
        position: "relative",
      }}
    >
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          height: "80%",
          border: "1px solid #00FF85",
          backgroundColor: "rgba(0, 0, 0, 0.40)",
          backgroundFilter: "blur(8px)",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          px: 7,
          py: 5,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Text color="#fff" fontSize={{ md: 40, xs: 24 }} width="100%">
          Unlock the value of
          <Text component="span" fontSize="inherit" color="#00FFE0">
            management and optimization
          </Text>
          for your agency right now.
        </Text>
        <Text color="#fff" fontWeight={400}>
          Share your email to recieve guides and news from us
        </Text>
        <FormControl sx={{ mt: 5 }}>
          <Stack
            maxWidth={552}
            height={54}
            sx={{
              border: "1px solid #fff",
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: 13.5,
              px: 0.452,
              py: 0.452,
            }}
          >
            <Input
              disableUnderline
              sx={{ px: 2, color: "#fff" }}
              placeholder="Type your question"
            />
            <Button
              className="MuiButton-primaryOutlined"
              sx={{ px: 6, border: "0!important", background: "#fff!important" }}
            >
              <TextGradient>Send</TextGradient>
            </Button>
          </Stack>
        </FormControl>
        <Text color="#fff" fontWeight={400} mt={3.5}>
            By clicking Sign Up you&rsquo;re confirming that you agree with our Terms and Conditions.
        </Text>
      </Stack>
    </Stack>
  );
};
