import FixedLayout from "components/FixedLayout";
import Wrapper from "components/Wrapper";
import {
  Statistics,
  Transactions,
  ChartStatistics,
} from "components/sn-dashboard";

export const metadata = {
  title: "Dashboard | Taskcover",
};

export default function Page() {
  return (
    <Wrapper overflow="auto" spacing={3} transparent>
      <FixedLayout flex={1} spacing={3} bgcolor="transparent">
        <Statistics />
        <ChartStatistics />
        <Transactions />
      </FixedLayout>
    </Wrapper>
  );
}
