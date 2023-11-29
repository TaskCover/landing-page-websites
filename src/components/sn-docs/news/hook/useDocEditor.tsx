import { useEditor } from "@tiptap/react";
import { NewPageContext } from "../context/NewPageContext";
import { getExtensions } from "../tiptap/extensions/starter-kit";
import useDebounce from "hooks/useDebounce";
import { useAppDispatch } from "store/hooks";
import { changeContentDoc } from "store/docs/reducer";

export default function useDocEditor() {
  const {
    content,
    setContent,
    setIsAddingNewLink,
    setActiveCommentId,
  } = useContext(NewPageContext);

  const dispatch = useAppDispatch();

  const [handleContentUpdate] = useDebounce((content: any) => {
    dispatch(changeContentDoc(content));
  }, 200);

  const anchorRef = useRef(0);
  return useEditor({
    content,
    extensions: getExtensions({
      openLinkModal: () => setIsAddingNewLink(true),
      onCommentActivated: (commentId: string) => {
        if (commentId) {
          setActiveCommentId(commentId);
          setOpenComment(true);
        }
      },
    }),

    editorProps: {
      attributes: {
        class: `main-editor`,
        spellCheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    onUpdate: async ({ editor, transaction }) => {
      setContent(editor.getJSON());
      anchorRef.current = transaction.selection.anchor;
      await handleContentUpdate(editor.getHTML());
      console.log(transaction.selection.anchor);
      setTimeout(() => {
        editor.chain().setTextSelection(anchorRef.current).run();
        editor.commands.focus(anchorRef.current);
      });
    },

    onTransaction: ({ editor, transaction }) => {
      editor.chain().setTextSelection(anchorRef.current).run();
      editor.commands.focus(anchorRef.current);
    },
  });
}
