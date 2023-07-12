import { ChatListTemp } from "components/sn-chat";
import MainLayout from "layouts/MainLayout";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = (props: RootLayoutProps) => {
  return (
    <MainLayout>
      <ChatListTemp />
      {props.children}
    </MainLayout>
  );
};

export default RootLayout;
