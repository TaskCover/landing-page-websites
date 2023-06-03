import { ReactNode, createContext, useContext, useState } from "react";
import { ModalAtom } from "../../atoms/ModalAtom";
import { ModalLv2Consumer, ModalLv2Provider } from "./ModalLv2";

export { useModalLv2ContextMolecule } from "./ModalLv2";

export type Props = {
  children: ReactNode;
};

const ModalContextMolecule = createContext({
  open: false,
  width: 400,
  openModal: (e: ReactNode, width?: number) => {},
  closeModal: () => {},
  content: (<></>) as ReactNode,
});

export const ModalContextMoleculeProvider = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(400);
  const [content, setContent] = useState<ReactNode>(<></>);
  return (
    <ModalContextMolecule.Provider
      value={{
        open: open,
        width: width,
        content: content,
        openModal: (children: ReactNode, width?: number) => {
          setContent(children);
          width && setWidth(width);
          setOpen(true);
        },
        closeModal: () => {
          setOpen(false);
        },
      }}
    >
      <ModalLv2Provider>
        {props.children}
        <ModalLv2Consumer />
        <ModalContextMoleculeConsumer />
      </ModalLv2Provider>
    </ModalContextMolecule.Provider>
  );
};

export const ModalContextMoleculeConsumer = () => {
  const { open, content, closeModal, width } = useContext(ModalContextMolecule);
  return (
    <ModalAtom open={open} handleClose={closeModal} width={width}>
      {content}
    </ModalAtom>
  );
};

export const useModalContextMolecule = () => {
  const { open, openModal, closeModal } = useContext(ModalContextMolecule);
  return { open, openModal, closeModal };
};
