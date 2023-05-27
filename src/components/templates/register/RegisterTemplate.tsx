import { FunctionComponent, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { InputAtom } from "../../atoms/InputAtom";
import { InputSecretAtom } from "../../atoms/InputAtom/InputSecretAtom";
import { useForm } from "react-hook-form";
import { AuthRegisterPost } from "../../../utils/model";
import { apiAuthRegisterPost } from "../../../utils/apis";
import { showErrorNotify } from "../../molecules/NotificationMolecule";
import { VerifyCodeComponent } from "./VerifyCode";
import { UploadAvatar } from "./UploadAvatar";
import { LoginLayoutAtom } from "../../atoms/LayoutAtom/LoginLayoutAtom";
import { ButtonAtom } from "../../atoms/ButtonAtom";

export const RegisterTemplate: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<AuthRegisterPost["requestBody"]>();
  const [step, setStep] = useState<1 | 2>(1);

  const onSubmit = async (data: AuthRegisterPost["requestBody"]) => {
    try {
      await apiAuthRegisterPost(data);
      setStep(2);
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  return (
    <LoginLayoutAtom>
      {step === 1 && (
        <>
          <div className={styles["container__form_area"]}>
            <img src={"/images/logo.png"} width={"152px"} height={"39px"} />
            <div className={styles["form_area__form"]}>
              <h3>{"Đăng nhập"}</h3>
              <div className={styles["form__suggest"]}>
                <span>{"hoặc bạn đã có tài khoản?"}</span>
                <span>
                  <Link href={"/login"}>{"Đăng nhập ngay"}</Link>
                </span>
              </div>
              <form
                className={styles["form__input"]}
                onSubmit={handleSubmit(onSubmit)}
              >
                <InputAtom label={"Họ tên"} {...register("fullname")} />
                <InputAtom label={"Số điện thoại"} {...register("phone")} />
                <InputAtom label={"Email"} {...register("email")} isrequired />
                <InputSecretAtom
                  label={"Mật khẩu"}
                  {...register("password")}
                  isrequired
                />
                <InputSecretAtom label={"Nhập lại mật khẩu"} isrequired />
                <UploadAvatar />
                <ButtonAtom type={"submit"} label={"Đăng ký"} />
              </form>
            </div>
          </div>
          <img
            src={"/images/register_welcome.png"}
            width={"616px"}
            height={"687px"}
          />
        </>
      )}
      {step === 2 && <VerifyCodeComponent />}
    </LoginLayoutAtom>
  );
};
