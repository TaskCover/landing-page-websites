import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useMemo, useState } from "react";
import { STEP } from "store/chat/type";
import ProfileHeader from "../common/ProfileHeader";
import { useChat } from "store/chat/selectors";
import { SxProps } from "@mui/material";
import LinkContent from "../common/LinkContent";
import { useAuth } from "store/app/selectors";

interface GroupMediaProfileProps {
  type?: STEP;
}
const GroupMediaProfile = ({ type }: GroupMediaProfileProps) => {
  const [tab, setTab] = useState(type);
  const { onSetStep } = useChat();

  const renderContent = useMemo(() => {
    switch (tab) {
      case STEP.MEDIA:
        return <>MEDIA</>;
      case STEP.LINK:
        return <LinkContent />;
      case STEP.FILE:
        return <>FILE</>;
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
        name={"Martin Randolph"}
        onPrevious={() => {
          onSetStep(STEP.VIEW_DETAIL_USER);
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
            onClick={() => setTab(STEP.MEDIA)}
            sx={styleButtonTab}
            className={tab === STEP.MEDIA ? "active" : ""}
          >
            Media file
          </Button>
          <Button
            variant="outlined"
            onClick={() => setTab(STEP.LINK)}
            sx={styleButtonTab}
            className={tab === STEP.LINK ? "active" : ""}
          >
            Link
          </Button>
          <Button
            variant="outlined"
            onClick={() => setTab(STEP.FILE)}
            sx={styleButtonTab}
            className={tab === STEP.FILE ? "active" : ""}
          >
            File
          </Button>
        </Box>
        <Box
          px={1}
          sx={{
            backgroundColor: "red",
          }}
        >
          {renderContent}
        </Box>
      </Box>
    </>
  );
};

export default GroupMediaProfile;
