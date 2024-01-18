import { Stack } from "@mui/material";
import { LegacyRef, useRef, useState } from "react";
import Image from "next/image";
import { Text } from "components/shared";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type VideoProps = {
  src: string;
  poster?: string;
};

export const Video = ({ src, poster }: VideoProps) => {
  const refVideo = useRef<null | HTMLVideoElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const toggleVideo = () => {
    if (!refVideo) return;
    if (isPlay) {
      refVideo.current?.pause();
      setIsPlay(false);
    } else {
      refVideo.current?.play();
      setIsPlay(true);
    }
  };
  return (
    <Stack
      position="relative"
      sx={{
        transition: "all .3s",
        "&:hover": {
          ".controls-btn": {
            opacity: 1,
          },
        },
      }}
    >
      <video width="100%" height="100%" ref={refVideo} poster={poster}>
        <source src={src} />
      </video>
      <Stack
        className="controls-btn"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          transition: "all 0.3s",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "#fff",
          opacity: isPlay ? 0 : 1,
          "&:hover": {
            transform: "translate(-50%, -50%) scale(1.2)",
          },
          svg: {
            color: "#5c98f6",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        onClick={toggleVideo}
      >
        {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
        <Text width={100} color="#fff" mt={8.125} textAlign="center">
          {isPlay ? "Pause" : "Play"} video
        </Text>
      </Stack>
    </Stack>
  );
};
