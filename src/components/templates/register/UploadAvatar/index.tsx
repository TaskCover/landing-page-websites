import { ChangeEvent, FunctionComponent, useRef, useState } from "react";

export const UploadAvatar: FunctionComponent = () => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [imgUrl, setImgUrl] = useState("/images/unknown_avatar.png");
  return (
    <div>
      <label>{"Ảnh đại diện"}</label>
      <div>
        <img
          src={imgUrl}
          width={"64px"}
          height={"64px"}
          style={{ borderRadius: "32px" }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={imgRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length === 1) {
              setImgUrl(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            imgRef.current?.click();
          }}
        >
          {"Tải ảnh lên"}
        </button>
      </div>
    </div>
  );
};
