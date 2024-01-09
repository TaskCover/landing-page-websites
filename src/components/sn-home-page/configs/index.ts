import TaskCoverAiIcon from "public/images/home-page/icon-taskcover-ai.svg";
import TaskProjectIcon from "public/images/home-page/icon-task-project.svg";
import NoteDocsIcon from "public/images/home-page/icon-note-docs.svg";
import MindMapsIcon from "public/images/home-page/icon-mind-maps.svg";
import AiChatIcon from "public/images/home-page/icon-ai-chat.svg";
import AiMeetingIcon from "public/images/home-page/icon-ai-meeting.svg";

export const PowerFullAgentTabs = [
  {
    img: TaskCoverAiIcon,
    label: "TaskCover AI",
    textColor: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
    isTextGradient:true,
  },
  {
    img: TaskProjectIcon,
    label: "Task Project",
    textColor: "#E96C3F",
    isActive: true,
  },
  {
    img: NoteDocsIcon,
    label: "Note & Docs",
    textColor: "#42ADA7",
  },
  {
    img: MindMapsIcon,
    label: "Mind Maps",
    textColor: "#1B88EC",
  },
  {
    img: AiChatIcon,
    label: "AI Chat",
    textColor: "#EDB932",
  },
  {
    img: AiMeetingIcon,
    label: "AI Meeting",
    textColor: "#48BF80",
  },
];
