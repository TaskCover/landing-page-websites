import { FunctionComponent, useState } from "react";
import styles from "./styles.module.css";
import { LoginLayoutAtom } from "../../../atoms/LayoutAtom/LoginLayoutAtom";
import { VerifyLayoutAtom } from "../../../atoms/LayoutAtom/VerifyLayoutAtom";
import { useForm } from "react-hook-form";
import { AuthSetPasswordPost } from "../../../../utils/model";
import { InputAtom } from "../../../atoms/InputAtom";
import { ButtonAtom } from "../../../atoms/ButtonAtom";
import { apiAuthSetPasswordPostPost } from "../../../../utils/apis";
import {
  showErrorNotify,
  showSuccessNotify,
} from "../../../molecules/NotificationMolecule";
import { InputSecretAtom } from "../../../atoms/InputAtom/InputSecretAtom";
import { useRouter } from "next/router";

export type Props = {
  token: string;
};

export const ResetPasswordTemplate: FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const { register, handleSubmit } =
    useForm<AuthSetPasswordPost["requestBody"]>();

  const onSubmit = async (data: AuthSetPasswordPost["requestBody"]) => {
    console.log(data);
    try {
      await apiAuthSetPasswordPostPost(data, {
        "reset-password-token": props.token,
      });
      showSuccessNotify("Đổi mật khẩu thành công");
      router.push("/login");
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  return (
    <LoginLayoutAtom>
      <VerifyLayoutAtom title={"Đặt lại mật khẩu mới"}>
        <form
          className={styles["setpass__formarea"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputSecretAtom
            label={"Mật khẩu"}
            {...register("password")}
            isrequired
          />
          <InputSecretAtom
            className={styles["setpass__formarea__input2"]}
            label={"Nhập lại mật khẩu"}
            isrequired
          />
          <ButtonAtom
            className={styles["setpass__formarea__button"]}
            label={"Xác nhận"}
            type={"submit"}
          />
        </form>
      </VerifyLayoutAtom>
    </LoginLayoutAtom>
  );
};
