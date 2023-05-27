import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { VerifyLayoutAtom } from "../../../../atoms/LayoutAtom/VerifyLayoutAtom";
import { ButtonIconAtom } from "../../../../atoms/ButtonAtom/ButtonIconAtom";
import { useRouter } from "next/router";

export const ResetPasswordSuccessComponent: FunctionComponent = () => {
  const router = useRouter();

  const onButtonClick = () => {
    router.push("/login");
  };

  return (
    <VerifyLayoutAtom
      title={"Quên mật khẩu"}
      description={
        "Đường link đặt lại mật khẩu đã được gửi đến email của bạn\nVui lòng kiểm tra email"
      }
    >
      <img
        src={"/images/complete.png"}
        className={styles["forgot_pass_verify__img"]}
      />
      <ButtonIconAtom
        iconImgSrc={"/images/icon_back.png"}
        label={"Quay lại đăng nhập"}
        className={styles["forgot_pass_verify__button"]}
        onClick={onButtonClick}
      />
    </VerifyLayoutAtom>
  );
};
