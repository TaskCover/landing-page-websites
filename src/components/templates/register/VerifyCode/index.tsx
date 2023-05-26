import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { InputCenterAtom } from "../../../atoms/InputAtom/InputCenterAtom";
import { useForm } from "react-hook-form";

export const VerifyCodeComponent: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<any>();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className={styles["container__verify"]}>
      <img src={"/images/logo.png"} width={"187px"} height={"48px"} />
      <h3>{"Xác thực tài khoản"}</h3>
      <p>{"Một mã code đã được gửi đến email đăng ký của bạn"}</p>
      <p>{"Vui lòng kiểm tra mail và điền mã code để hoàn thành đăng ký"}</p>
      <form
        className={styles["verify__formarea"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputCenterAtom label={"Mã code"} {...register("code")} />
        <button className={styles["form__submitbutton"]} type="submit">
          {"Xác thực"}
        </button>
      </form>
    </div>
  );
};
