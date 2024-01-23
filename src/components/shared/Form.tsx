import { Button, FormControl, Input, Stack } from "@mui/material";
import { TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import { memo } from "react";
import Image from "next/image";

type FormProps = {
  submitText: string;
};

const Form = (props: FormProps) => {
  const { submitText } = props;
  const { isMdSmaller } = useBreakpoint();
  return (
    <FormControl>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: "1px solid #fff",
          width: { md: 513, xs: 295 },
          height: { md: 56, xs: 52 },
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
            background: {md: "#fff", xs: "transparent"},
            px: {md: 8, xs: 0},
            py: 1.5,
            textTransform: "capitalize",
            borderRadius: 6,
            "&:hover": {
              background: {md: "#fff", xs: "transparent"},
            },
          }}
        >
          {isMdSmaller ? (
            <Image src="/images/send-2.png" width={24} height={24} alt="send" />
          ) : (
            <TextGradient>{submitText}</TextGradient>
          )}
        </Button>
      </Stack>
    </FormControl>
  );
};

export default memo(Form);
