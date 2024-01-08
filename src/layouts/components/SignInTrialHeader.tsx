import { Stack } from "@mui/material";
import { Button } from "components/shared";
import { memo } from "react";

const SignInTrialHeader = () => {
    return(
        <Stack direction="row" spacing={2}>
            <Button className="MuiButton-primaryOutlined">Log in</Button>
            <Button className="MuiButton-primary">Free 14-day trial</Button>
        </Stack>
    );
}

export default memo(SignInTrialHeader);