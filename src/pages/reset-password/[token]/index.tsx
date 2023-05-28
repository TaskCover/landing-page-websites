import type { NextPage } from "next";
import ResetPasswordTemplate from "../../../components/templates/reset-password/[token]";
import { useRouter } from "next/router";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  if (typeof token === "string") {
    return <ResetPasswordTemplate token={token} />;
  } else {
    return null;
  }
};

export default ResetPassword;
