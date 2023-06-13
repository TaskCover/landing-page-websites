import { memo } from "react";
import Image, { ImageProps } from "next/image";
import UserPlaceholderImage from "public/images/img-user-placeholder.webp";

type AvatarProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string;
  alt?: string;
  size: number;
};

const Avatar = (props: AvatarProps) => {
  const { src = UserPlaceholderImage, alt = "Avatar", size, ...rest } = props;

  return (
    <Image
      className="rounded"
      src={src}
      alt={alt}
      width={size}
      height={size}
      {...rest}
    />
  );
};

export default memo(Avatar);
