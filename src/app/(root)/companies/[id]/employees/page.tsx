import {
  Actions,
  Wrapper,
  ItemList,
} from "components/sn-company-detail/Employees";

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
