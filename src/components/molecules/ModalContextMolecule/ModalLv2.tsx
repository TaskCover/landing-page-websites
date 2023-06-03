import { ReactNode, createContext, useContext, useState } from "react";
import { ModalAtom } from "../../atoms/ModalAtom";

export type Props = {
  children: ReactNode;
};

const ModalLv2 = createContext({
  open: false,
  width: 400,
  openModalLv2: (e: ReactNode, width?: number) => {},
  closeModalLv2: () => {},
  content: (<></>) as ReactNode,
});

export const ModalLv2Provider = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(400);
  const [content, setContent] = useState<ReactNode>(<></>);
  return (
    <ModalLv2.Provider
      value={{
        open: open,
        width: width,
        content: content,
        openModalLv2: (children: ReactNode, width?: number) => {
          setContent(children);
          width && setWidth(width);
          setOpen(true);
        },
        closeModalLv2: () => {
          setOpen(false);
        },
      }}
    >
      {props.children}
    </ModalLv2.Provider>
  );
};

export const ModalLv2Consumer = () => {
  const { open, content, closeModalLv2, width } = useContext(ModalLv2);
  return (
    <ModalAtom
      open={open}
      handleClose={closeModalLv2}
      width={width}
      zIndex={1301}
    >
      {content}
    </ModalAtom>
  );
};

export const useModalLv2ContextMolecule = () => {
  const { open, openModalLv2, closeModalLv2 } = useContext(ModalLv2);
  return { open, openModalLv2, closeModalLv2 };
};
