import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";

const QuillCustom = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  { ssr: false },
);

export default QuillCustom;
