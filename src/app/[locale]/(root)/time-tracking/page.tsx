import TimeTrackingPage from "components/TimeTracking";
import Wrapper from "components/Wrapper";

export const metadata = {
  title: "Time tracking | Taskcover",
};

export default function Page() {
  return (
    <Wrapper overflow="auto">
      <TimeTrackingPage />
    </Wrapper>
  );
}
