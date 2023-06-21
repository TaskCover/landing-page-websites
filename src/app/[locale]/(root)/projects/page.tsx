import { Actions, ItemList, Wrapper } from "components/sn-projects";

export const metadata = {
  title: "Danh sách dự án | Taskcover",
};

export default function Page() {
  return (
    <Wrapper>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
