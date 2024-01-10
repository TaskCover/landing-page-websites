import { Stack } from "@mui/material";
import { Button } from "components/shared";
import { memo } from "react";

const SignInTrialHeader = () => {
    return(
        <Stack direction="row" spacing={2}>
            <Button className="MuiButton-primaryOutlined" sx={{p:"8px 12px"}} href="http://103.182.16.241:2023/">Log in</Button>
            <Button className="MuiButton-primary" sx={{p:"8px 12px"}}>Free 14-day trial</Button>
        </Stack>
    );
}

export default memo(SignInTrialHeader);
