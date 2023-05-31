import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { InputAtom } from "../../atoms/InputAtom";
import { InputSecretAtom } from "../../atoms/InputAtom/InputSecretAtom";
import { useForm } from "react-hook-form";
import { AuthLoginPost, ValidationListError } from "../../../utils/model";
import { apiAuthLoginPost } from "../../../utils/apis";
import { showErrorNotify } from "../../molecules/NotificationMolecule";
import { useRouter } from "next/router";
import { SingleLayoutAtom } from "../../atoms/LayoutAtom/SingleLayoutAtom";
import { ButtonAtom } from "../../atoms/ButtonAtom";
import { LoginLayoutAtom } from "../../atoms/LayoutAtom/SingleLayoutAtom/LoginLayoutAtom";
import { ErrorTextAtom } from "../../atoms/ErrorTextAtom";
import { useHandleError } from "../../../utils/useHandleError";

export const LoginTemplate: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<AuthLoginPost["requestBody"]>();
  const { getErrorMessage, handleError } = useHandleError();
  const router = useRouter();

  const onSubmit = async (data: AuthLoginPost["requestBody"]) => {
    try {
      const response: AuthLoginPost["responseBody"] = await apiAuthLoginPost(
        data
      );
      localStorage.setItem("jwt", response.accessToken);
      localStorage.setItem("refresh-token", response.refreshToken);
      router.push("/dashboard");
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
      handleError(e);
    }
  };

  return (
    <LoginLayoutAtom>
      <div className={styles["container__form_area"]}>
        <img src={"/images/logo.png"} width={"152px"} height={"39px"} />
        <div className={styles["form_area__form"]}>
          <h3>{"Đăng nhập"}</h3>
          <div className={styles["form__suggest"]}>
            <span>{"hoặc bạn chưa có tài khoản?"}</span>
            <span>
              <Link href={"/register"}>{"Đăng ký ngay"}</Link>
            </span>
          </div>
          <form
            className={styles["form__input"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputAtom
              label={"Tên đăng nhập"}
              {...register("email")}
              isError={!!getErrorMessage("email")}
            />
            {getErrorMessage("email") && (
              <ErrorTextAtom error={getErrorMessage("email")!} />
            )}
            <InputSecretAtom
              className={styles["form__input__input"]}
              label={"Mật khẩu"}
              {...register("password")}
              isError={!!getErrorMessage("password")}
            />
            {getErrorMessage("password") && (
              <ErrorTextAtom error={getErrorMessage("password")!} />
            )}
            <div className={styles["input__forget"]}>
              <Link href={"/login/forgot-password"}>{"Quên mật khẩu?"}</Link>
            </div>
            <ButtonAtom label={"Đăng nhập"} type={"submit"} />
          </form>
        </div>
      </div>
      <img
        src={"/images/login_welcome.png"}
        className={styles["container__img"]}
      />
    </LoginLayoutAtom>
  );
};
