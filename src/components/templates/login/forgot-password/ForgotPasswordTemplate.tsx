import { FunctionComponent, useState } from "react";
import { VerifyLayoutAtom } from "../../../atoms/LayoutAtom/VerifyLayoutAtom";
import { SingleLayoutAtom } from "../../../atoms/LayoutAtom/SingleLayoutAtom";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { AuthForgotPasswordPost } from "../../../../utils/model";
import { InputAtom } from "../../../atoms/InputAtom";
import { ButtonAtom } from "../../../atoms/ButtonAtom";
import { apiAuthForgotPasswordPost } from "../../../../utils/apis";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { ResetPasswordSuccessComponent } from "./ResetPasswordSuccess";

export const ForgotPasswordTemplate: FunctionComponent = () => {
  const { register, handleSubmit } =
    useForm<AuthForgotPasswordPost["requestBody"]>();

  const [step, setStep] = useState<1 | 2>(1);

  const onSubmit = async (data: AuthForgotPasswordPost["requestBody"]) => {
    try {
      await apiAuthForgotPasswordPost(data);
      setStep(2);
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  return (
    <SingleLayoutAtom>
      {step === 1 && (
        <VerifyLayoutAtom
          title={"Quên mật khẩu"}
          description={
            "Đường link đặt lại mật khẩu sẽ được gửi đến email\nVui lòng nhập email đăng ký của bạn"
          }
          className={styles["forget_pass__container"]}
        >
          <form
            className={styles["forget_pass__form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputAtom label={"Email"} {...register("email")} />
            <ButtonAtom label={"Xác nhận"} type={"submit"} />
          </form>
        </VerifyLayoutAtom>
      )}
      {step === 2 && <ResetPasswordSuccessComponent />}
    </SingleLayoutAtom>
  );
};
