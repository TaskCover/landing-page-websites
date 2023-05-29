import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { InputCenterAtom } from "../../../atoms/InputAtom/InputCenterAtom";
import { useForm } from "react-hook-form";
import { VerifyLayoutAtom } from "../../../atoms/LayoutAtom/VerifyLayoutAtom";
import { ButtonAtom } from "../../../atoms/ButtonAtom";
import { AuthCode } from "../../../../utils/model";
import { apiAuthCode } from "../../../../utils/apis";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { useRouter } from "next/router";

export type Props = {
  tokenRegister: string;
};

export const VerifyCodeComponent: FunctionComponent<Props> = (props) => {
  const { register, handleSubmit } = useForm<AuthCode["requestBody"]>();
  const router = useRouter();

  const onSubmit = async (data: AuthCode["requestBody"]) => {
    try {
      await apiAuthCode(data, { tokenRegister: props.tokenRegister });
      router.push("/login");
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
        <InputCenterAtom label={"Mã code"} {...register("code")} />
        <ButtonAtom label={"Xác thực"} type={"submit"} />
      </form>
    </VerifyLayoutAtom>
  );
};
