import { Box } from "@mui/system";
import SelectItem from "./components/SelectItem";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Typography } from "@mui/material";
import { Button } from "components/shared";
import { useChat } from "store/chat/selectors";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";

const ChatForward = () => {
  const { onSetStep, prevStep } = useChat();
  const commonT = useTranslations(NS_COMMON);

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            height: "260px"
          }}
        >
          <Box>
            {/* <SelectItem employee={undefined} /> */}
          </Box>
        </Box>

        <Box>
          <Box sx={{
            position: "relative"
          }}>
            <Typography
              sx={{
                color: "var(--gray-3, #999)",
                fontSize: "0.75rem",
                fontWeight: 400,
                lineHeight: "1rem",
                position: "absolute",
                left: 14,
                top: 10,
              }}
            >
              Message
            </Typography>
            <TextareaAutosize
              style={{
                resize: 'vertical',
                width: "100%",
                padding: "28px 14px 14px",
                borderRadius: "0.25rem",
                background: "var(--gray-0, #F7F7FD)",
                border: "none",
                color: "var(--black, #212121)",
                fontFamily: "Open Sans",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "1.375rem",
              }}
              aria-label="minimum height"
              value="They shared that sometimes their app freezes on Android when they're trying to access previously rec"
            />
          </Box>
          <Typography
            sx={{
              color: "var(--gray-3, #999)",
              textAlign: "right",
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "1rem",
            }}
          >
            0/2000
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            padding: 2,
          }}
        >
          <Button
            type="button"
            variant="primaryOutlined"
            size="small"
            sx={defaultSx.button}
            onClick={() => { onSetStep(prevStep) }}
          >
            {commonT("form.cancel")}
          </Button>
          <Button
            variant="primary"
            sx={defaultSx.button}
            type="button"
            size="small"
          // onClick={()=>{}}
          >
            {commonT("form.add")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChatForward;
const defaultSx = {
  button: {
    minWidth: 120,
    mx: 1.5,
  },
};