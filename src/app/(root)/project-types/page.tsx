import { Actions, ItemList, Wrapper } from "components/sn-project-types";

export const metadata = {
  title: "Quản lý loại dự án | Taskcover",
};

export default function Page() {
  return (
    <Wrapper>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
