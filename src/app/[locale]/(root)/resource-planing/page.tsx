import Wrapper from "components/Wrapper";
import ResourcePlanning from "components/sn-resource-planing";

export const metadata = {
  title: "Resource Planning | Taskcover",
};

export default function ResourcePlanningPage() {
  return (
    <Wrapper
      sx={{
        overflow: {
          sx: "scroll",
          md: "hidden",
        },
      }}
      px={{
        sx: 2,
        md: 10,
      }}
    >
      <ResourcePlanning />
    </Wrapper>
  );
}
