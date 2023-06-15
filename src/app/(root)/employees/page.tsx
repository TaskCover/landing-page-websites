import { Actions, ItemList, Wrapper } from "components/sn-employees";

export const metadata = {
  title: "Danh sách nhân viên | Taskcover",
};

export default function Page() {
  return (
    <Wrapper>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
