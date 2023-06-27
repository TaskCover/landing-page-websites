import Wrapper from "components/Wrapper";
import InformationCompanyPage from "components/sn-company-detail/Information";

export const metadata = {
  title: "Thông tin công ty | Taskcover",
};

export default function Page() {
  return (
    <Wrapper overflow="auto">
      <InformationCompanyPage />
    </Wrapper>
  );
}
