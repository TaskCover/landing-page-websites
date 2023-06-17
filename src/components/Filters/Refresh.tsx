import { memo, useRef } from "react";
import { IconButton, IconButtonProps } from "components/shared";
import RefreshIcon from "icons/RefreshIcon";

type RefreshProps = IconButtonProps;

const Refresh = (props: RefreshProps) => {
  const { onClick, ...rest } = props;

  const latestClickedRef = useRef<number | undefined>();

  const onRefresh = (event) => {
    if (
      latestClickedRef?.current &&
      Date.now() - latestClickedRef.current < 2000
    )
      return;
    latestClickedRef.current = Date.now();
    onClick && onClick(event);
  };

  return (
    <IconButton
      tooltip="Làm mới dữ liệu"
      noPadding
      onClick={onRefresh}
      {...rest}
    >
      <RefreshIcon
        sx={{
          fontSize: 20,
          color: "grey.300",
        }}
      />
    </IconButton>
  );
};

export default memo(Refresh);
