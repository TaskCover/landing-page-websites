import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import styles from "./styles.module.css";

export const UploadAvatar: FunctionComponent = () => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [imgUrl, setImgUrl] = useState("/images/unknown_avatar.png");

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className={styles["register__upload"]}>
      <label className={styles["register__upload__label"]}>
        {"Ảnh đại diện"}
      </label>
      <div className={styles["register__upload__uploadavatar"]}>
        <img src={imgUrl} className={styles["uploadavatar__img"]} />
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          style={{ display: "none" }}
          ref={imgRef}
          onChange={onFileUpload}
        />
        <button
          type="button"
          onClick={() => {
            imgRef.current?.click();
          }}
          className={styles["uploadavatar__button"]}
        >
          <div className={styles["uploadavatar__button__content"]}>
            <img
              src="/images/icon_upload.png"
              className={styles["uploadavatar__button__icon"]}
            />
            <label className={styles["uploadavatar__button__label"]}>
              {"Tải ảnh lên"}
            </label>
          </div>
        </button>
      </div>
    </div>
  );
};
