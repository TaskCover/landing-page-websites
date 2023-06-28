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
      <Statistics />
      <ChartStatistics />
      <Transactions />
    </Wrapper>
  );
}
