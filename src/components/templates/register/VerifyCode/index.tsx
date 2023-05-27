import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { InputCenterAtom } from "../../../atoms/InputAtom/InputCenterAtom";
import { useForm } from "react-hook-form";
import { VerifyLayoutAtom } from "../../../atoms/LayoutAtom/VerifyLayoutAtom";
import { ButtonAtom } from "../../../atoms/ButtonAtom";

export const VerifyCodeComponent: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<any>();

  const onSubmit = async (data: any) => {
    console.log(data);
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
