import Wrapper from "components/Wrapper";
import { Statistics, Transactions } from "components/sn-dashboard";

export const metadata = {
  title: "Dashboard | Taskcover",
};

export default function Page() {
  return (
    <Wrapper overflow="auto" spacing={3}>
      <Statistics />
      <Transactions />
    </Wrapper>
  );
}
