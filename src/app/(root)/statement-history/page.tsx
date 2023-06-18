import { Actions, ItemList, Wrapper } from "components/sn-statement-history";

export const metadata = {
  title: "Lịch sử báo cáo | Taskcover",
};

export default function Page() {
  return (
    <Wrapper>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
