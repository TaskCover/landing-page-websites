import { Statistics, Transactions } from "components/sn-dashboard";

export const metadata = {
  title: "Dashboard | Taskcover",
};

export default function Page() {
  return (
    <>
      <Statistics />
      <Transactions />
    </>
  );
}
