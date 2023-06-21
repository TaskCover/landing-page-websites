import {
  Wrapper,
  ItemList,
  Actions,
} from "components/sn-project-detail/Members";

export const metadata = {
  title: "Danh sách thành viên | Taskcover",
};

export default function Page() {
  return (
    <Wrapper>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
