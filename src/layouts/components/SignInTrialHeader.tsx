import { Stack } from "@mui/material";
import { ButtonCustom } from "components/shared";
import { memo } from "react";

const SignInTrialHeader = () => {
    return(
        <Stack direction="row" spacing={2}>
            <ButtonCustom className="MuiButton-primaryOutlined" href="http://103.182.16.241:2023/">Log in</ButtonCustom>
            <ButtonCustom className="MuiButton-primary">Free 14-day trial</ButtonCustom>
        </Stack>
    );
}

export default memo(SignInTrialHeader);
