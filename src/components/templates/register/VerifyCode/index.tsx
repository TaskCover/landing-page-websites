import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { InputCenterAtom } from "../../../atoms/InputAtom/InputCenterAtom";
import { useForm } from "react-hook-form";
import { VerifyLayoutAtom } from "../../../atoms/LayoutAtom/VerifyLayoutAtom";
import { ButtonAtom } from "../../../atoms/ButtonAtom";
import { AuthCheckOtp } from "../../../../utils/model";
import { apiAuthCheckOtp } from "../../../../utils/apis";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { useRouter } from "next/router";

export type Props = {
  registerToken: string;
};

export const VerifyCodeComponent: FunctionComponent<Props> = (props) => {
  const { register, handleSubmit } = useForm<AuthCheckOtp["requestBody"]>();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await apiAuthCheckOtp(data, { token2FA: props.registerToken });
      router.push("https://google.com");
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  return (
    <VerifyLayoutAtom
      title={"Xác thực tài khoản"}
      description={
        "Một mã code đã được gửi đến email đăng ký của bạn\nVui lòng kiểm tra mail và điền mã code để hoàn thành đăng ký"
      }
    >
      <form
        className={styles["verify__formarea"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputCenterAtom label={"Mã code"} {...register("otp")} />
        <ButtonAtom label={"Xác thực"} type={"submit"} />
      </form>
    </VerifyLayoutAtom>
  );
};
