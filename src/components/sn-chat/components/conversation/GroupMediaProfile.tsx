import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useMemo, useState } from "react";
import { STEP, STEP_INFO } from "store/chat/type";
import ProfileHeader from "../common/ProfileHeader";
import { useChat } from "store/chat/selectors";
import { SxProps } from "@mui/material";
import LinkContent from "../common/LinkContent";
import MediaContent from "../common/MediaContent";
import FileContent from "../common/FileContent";

interface GroupMediaProfileProps {
  type?: STEP_INFO;
  onPrevious: (step) => void;
}
const GroupMediaProfile = ({ type, onPrevious }: GroupMediaProfileProps) => {
  const [tab, setTab] = useState<STEP_INFO>(type || STEP_INFO.MEDIA);
  const { conversationInfo } = useChat();
  const { name } = conversationInfo || {};

  const renderContent = useMemo(() => {
    switch (tab) {
      case STEP_INFO.MEDIA:
        return <MediaContent />;
      case STEP_INFO.LINK:
        return <LinkContent />;
      case STEP_INFO.FILE:
        return <FileContent />;
    }
  }, [tab]);

  const styleButtonTab: SxProps = {
    width: "100px",
    border: "1px solid #999999",
    borderRadius: "20px",
    color: "#999999",
    textTransform: "inherit",
    "&:hover": {
      border: "1px solid #999999",
    },
  };
  return (
    <>
      <ProfileHeader
        name={name || ""}
        onPrevious={() => {
          onPrevious(STEP_INFO.IDLE);
        }}
      />
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          mt={2}
          mb={2}
          sx={{
            "& .active": {
              color: "#3699FF",
              border: "1px solid #3699FF !important",
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setTab(STEP_INFO.MEDIA)}
            sx={styleButtonTab}
            className={tab === STEP_INFO.MEDIA ? "active" : ""}
          >
            Media file
          </Button>
          <Button
            variant="outlined"
            onClick={() => setTab(STEP_INFO.LINK)}
            sx={styleButtonTab}
            className={tab === STEP_INFO.LINK ? "active" : ""}
          >
            Link
          </Button>
          <Button
            variant="outlined"
            onClick={() => setTab(STEP_INFO.FILE)}
            sx={styleButtonTab}
            className={tab === STEP_INFO.FILE ? "active" : ""}
          >
            File
          </Button>
        </Box>
        {renderContent}
      </Box>
    </>
  );
};

export default GroupMediaProfile;