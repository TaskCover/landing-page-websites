import { Button, FormControl, Input, Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import Image from "next/image";

export const FormMobile = () => {
  return (
    <Stack
      sx={{
        mt: 12.5,
        backgroundImage: "url(/images/bg-trust-helper-mobile.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        aspectRatio: "359/558",
        flexDirection: "row",
        position: "relative",
        paddingTop: 5,
        borderRadius: 5,
        px: "10%"
      }}
    >
      <Stack justifyContent="center" width="100%">
        <Text fontWeight={500} variant="h5" color="#fff" mb={3} align="center">
          A unified app for all your needs.
        </Text>
        <Text color="#fff" mb={3} align="center" fontWeight={400}>
          Share your email to recieve guides and news from us
        </Text>
        <FormControl sx={{display: "flex", alignItems: "center"}}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border: "1px solid #fff",
              width: 295,
              height: 52,
              borderRadius: 13.5,
              px: 0.452,
            }}
          >
            <Input
              disableUnderline
              sx={{ px: 2, color: "#fff" }}
              placeholder="Email box"
            />
            <Button
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              <Image src="/images/send-2.png" width={24} height={24} alt="send" />
            </Button>
          </Stack>
        </FormControl>

        <Text
          color="#fff"
          mt={3}
          align="center"
          fontWeight={400}
          variant="body2"
        >
          By clicking Sign Up you&rsquo;re confirming that you agree with our
          Terms and Conditions.
        </Text>
        <Stack
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: -40,
          }}
        >
          <Image
            src="/images/legend-animal-helper.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "130%",
              height: "auto",
            }}
            alt="legend animal"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
