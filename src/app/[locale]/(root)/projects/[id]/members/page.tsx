import { ItemList, Actions } from "components/sn-project-detail/Members";

export const metadata = {
  title: "Danh sách thành viên | Taskcover",
};

export default function Page() {
  return (
    <>
      <Actions />
      <ItemList />
    </>
  );
}
