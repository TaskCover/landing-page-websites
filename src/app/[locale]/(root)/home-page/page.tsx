import Wrapper from "components/Wrapper";
import HomePage from "components/sn-home-page";

// export async function generateMetadata(): Promise<Metadata> {
//   const t = await getTranslations(NS_ACCOUNT);

//   return {
//     title: t("changePassword.head.title"),
//   };
// }

export default function Page() {

  return (
    <Wrapper overflow="auto">
      <HomePage/>
    </Wrapper>
  );
}


