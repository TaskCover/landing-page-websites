import InformationCompanyPage from "components/sn-company-detail/Information";
import Wrapper from "components/sn-company-detail/Information/Wrapper";

export const metadata = {
  title: "Thông tin công ty | Taskcover",
};

export default function Page() {
  return (
    <Wrapper>
      <InformationCompanyPage />
    </Wrapper>
  );
}
