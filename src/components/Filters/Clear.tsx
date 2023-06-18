import { memo } from "react";
import { IconButton, IconButtonProps } from "components/shared";
import CloseIcon from "icons/CloseIcon";

type ClearProps = IconButtonProps & {
  onClear?: () => void;
};

const Clear = (props: ClearProps) => {
  const { onClear, sx, ...rest } = props;
  return (
    <IconButton
      tooltip="Clear filters"
      sx={{ color: "grey.300", ...sx }}
      noPadding
      onClick={onClear}
      {...rest}
    >
      <CloseIcon sx={{ fontSize: 18 }} />
    </IconButton>
  );
};

export default memo(Clear);
