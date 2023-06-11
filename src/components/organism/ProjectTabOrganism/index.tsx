import { Box, Tab, Tabs, styled } from "@mui/material";
import { useProjectTabOrganism } from "./useProjectTabOrganism";

const TabCustom = styled(Tab)(({ theme }) => ({
  fontSize: "1.4rem",
  color: "#999999",
  textTransform: "none",
  padding: "20px 28px",
  "&.Mui-selected": {
    backgroundColor: "#E1F0FF",
    color: "#212121",
  },
}));

export type Props = {
  tabIndex: number;
  projectId: string;
};

export const ProjectTabOrganism = (props: Props) => {
  const [values, handlers] = useProjectTabOrganism(props);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={props.tabIndex} sx={{ span: { display: "none" } }}>
        <TabCustom
          label="Công việc"
          onClick={() => handlers.redirectToPath("")}
        />
        <TabCustom
          label="Hoạt động"
          onClick={() => handlers.redirectToPath("")}
        />
        <TabCustom
          label="Chi phí"
          onClick={() => handlers.redirectToPath("")}
        />
        <TabCustom
          label="Thành viên"
          onClick={() => handlers.redirectToPath("member")}
        />
        <TabCustom
          label="Thông tin"
          onClick={() => handlers.redirectToPath("")}
        />
      </Tabs>
    </Box>
  );
};
