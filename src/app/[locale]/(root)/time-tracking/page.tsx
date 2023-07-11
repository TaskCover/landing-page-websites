import Wrapper from "components/Wrapper";
import TimeTrackingComponent from "components/sn-time-tracking";

export const metadata = {
  title: "Time tracking | Taskcover",
};

export default function Page() {
  return (
    <Wrapper overflow="auto">
      <TimeTrackingComponent />
    </Wrapper>
  );
}
