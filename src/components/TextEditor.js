import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function TextEditor() {
  const { data: session } = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { id } = router.query;

  const email = session?.user?.email;
  const [snapshot] = useDocumentOnce(doc(db, `userDocs/${email}/docs`, id));

  //sharedoc implementation
  // const [snapshot] = useDocumentOnce(doc(db, `userDocs/${email}));
  //check if id is in docs or shared

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const onEditorStateChange = async (editorState) => {
    setEditorState(editorState);

    const ref = doc(db, `userDocs/${email}/docs`, id);
    await setDoc(
      ref,
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      {
        merge: true,
      }
    );
  };
  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        toolbarClassName="flex stickey top-0 z-50 !justify-center"
        editorClassName="mt-6 p-10 bg-white min-h-screen shadow-lg max-w-5xl mx-auto mb-12 border"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

export default TextEditor;
