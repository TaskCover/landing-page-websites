import { useEditor } from "@tiptap/react";
import { useContext } from "react";
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
    setSelectedComment,
    //  pageSettings,
  } = useContext(NewPageContext);

  const dispatch = useAppDispatch();

  const [handleContentUpdate] = useDebounce((content: any) => {
    dispatch(changeContentDoc(content));
  }, 200);

  return useEditor({
    content,
    extensions: getExtensions({
      openLinkModal: () => setIsAddingNewLink(true),
      onCommentActivated: (commentId: string) => setSelectedComment(commentId),
    }),

    editorProps: {
      attributes: {
        class: `main-editor`,
        spellCheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
      handleContentUpdate(editor.getHTML());
    },
  });
}
