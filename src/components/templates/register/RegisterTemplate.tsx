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
import { SingleLayoutAtom } from "../../atoms/LayoutAtom/SingleLayoutAtom";
import { ButtonAtom } from "../../atoms/ButtonAtom";

export const RegisterTemplate: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<AuthRegisterPost["requestBody"]>();
  const [step, setStep] = useState<1 | 2>(1);
  const [registerToken, setRegisterToken] = useState<string>("");

  const onSubmit = async (data: AuthRegisterPost["requestBody"]) => {
    try {
      const registerResponse: AuthRegisterPost["responseBody"] =
        await apiAuthRegisterPost(data);
      console.log(registerResponse.id + " 123123123");
      setRegisterToken(registerResponse.id);
      setStep(2);
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  return (
    <SingleLayoutAtom>
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
                <InputAtom label={"Email"} {...register("email")} isRequired />
                <InputSecretAtom
                  label={"Mật khẩu"}
                  {...register("password")}
                  isRequired
                />
                <InputSecretAtom label={"Nhập lại mật khẩu"} isRequired />
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
      {step === 2 && <VerifyCodeComponent registerToken={registerToken} />}
    </SingleLayoutAtom>
  );
};
