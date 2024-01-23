import { Button, FormControl, Input, Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";

export const FormDesktop = () => {
  return (
      <Stack
        sx={{
          mt: 12.5,
          backgroundImage: "url(/images/bg-trust-helper.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          aspectRatio: "1199/370",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "10%",
          position: "relative",
        }}
      >
        <Stack>
          <Text fontWeight={500} fontSize={32} color="#fff" mb={3}>
            A unified app for all your needs.
          </Text>
          <FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #fff",
                width: { lg: 513, xs: 413 },
                height: 56,
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
                  background: "#fff",
                  px: { lg: 5, xs: 2 },
                  py: 1.5,
                  textTransform: "capitalize",
                  borderRadius: 6,
                  "&:hover": {
                    background: "#fff",
                  },
                }}
              >
                <TextGradient>Star Free Trial</TextGradient>
              </Button>
            </Stack>
          </FormControl>
        </Stack>
      </Stack>
  );
};
