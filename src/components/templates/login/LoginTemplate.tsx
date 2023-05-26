import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { InputAtom } from "../../atoms/InputAtom";
import { InputSecretAtom } from "../../atoms/InputAtom/InputSecretAtom";
import { useForm } from "react-hook-form";
import { AuthLoginPost } from "../../../utils/model";
import { apiAuthLoginPost } from "../../../utils/apis";

export const LoginTemplate: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<AuthLoginPost["requestBody"]>();

  const onSubmit = async (data: AuthLoginPost["requestBody"]) => {
    try {
      await apiAuthLoginPost(data);
    } catch (e: any) {
      console.log(e?.response);
    }
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["login__container"]}>
        <div className={styles["container__form_area"]}>
          <img src={"/images/login_logo.png"} width={"152px"} height={"39px"} />
          <div className={styles["form_area__form"]}>
            <h3>{"Đăng nhập"}</h3>
            <div className={styles["form__suggest"]}>
              <span>{"hoặc bạn chưa có tài khoản?"}</span>
              <span>
                <Link href={"#"}>{"Đăng ký ngay"}</Link>
              </span>
            </div>
            <form
              className={styles["form__input"]}
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputAtom label={"Tên đăng nhập"} {...register("email")} />
              <InputSecretAtom label={"Mật khẩu"} {...register("password")} />
              <div className={styles["input__forget"]}>
                <Link href={"#"}>{"Quên mật khẩu?"}</Link>
              </div>

              <button className={styles["form__submitbutton"]} type="submit">
                {"Đăng nhập"}
              </button>
            </form>
          </div>
        </div>
        <img
          src={"/images/login_welcome.png"}
          width={"616px"}
          height={"687px"}
        />
      </div>
    </div>
  );
};
