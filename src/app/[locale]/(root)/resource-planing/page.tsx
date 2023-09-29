import Wrapper from "components/Wrapper";
import ResourcePlanning from "components/sn-resource-planing";

export const metadata = {
  title: "Resource Planning | Taskcover",
};

export default function ResourcePlanningPage() {
  return (
    <Wrapper overflow="auto">
      <ResourcePlanning />
    </Wrapper>
  );
}
