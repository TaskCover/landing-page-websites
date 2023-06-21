import { Actions, ItemList, Wrapper } from "components/sn-positions";

export const metadata = {
  title: "Quản lý chức vụ | Taskcover",
};

export default function Page() {
  return (
    <Wrapper>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
