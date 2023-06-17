import { Actions, Wrapper, ItemList } from "components/sn-companies";

export const metadata = {
  title: "Danh sách công ty | Taskcover",
};

export default function Page() {
  return (
    <Wrapper>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
