import Head from "next/head";
import Header from "@/components/Header";
import { Folder, MoreVert } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import { getSession } from "next-auth/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import DocumentRow from "@/components/DocumentRow";

export default function Home() {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState();
  const email = session?.user?.email;
  const [snapshot] = useCollectionOnce(
    collection(db, `userDocs/${email}/docs`)
  );

  if (!session) return <Login />;

  const row = snapshot?.docs.map((doc) => (
    <DocumentRow
      key={doc.id}
      id={doc.id}
      filename={doc.data().fieldName}
      date={doc.data().timestamp}
    />
  ));

  const createDocument = () => {
    if (!input) return;

    const user = doc(db, "userDocs", session?.user?.email);
    const docCollection = collection(user, "docs");
    addDoc(docCollection, {
      fieldName: input,
      timestamp: serverTimestamp(),
      owner: session?.user?.email,
      editor: [],
      viewer: [],
    });

    setInput("");
    setShowModal(false);
  };

  const modal = (
    <>
      <Dialog open={showModal} handler={() => setShowModal(!showModal)}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="outline-none w-full"
            placeholder="enter name of document..."
            onKeyDown={(e) => e.key === "Enter" && createDocument()}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue"
            onClick={(e) => setShowModal(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={createDocument}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );

  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="favicon" />
      </Head>
      <Header />
      {modal}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-grey-700 text-lg">Start a new document</h2>
            <Button
              color="gray"
              variant="text"
              icononly="true"
              className="hidden md:inline-block ml-5 md:ml-20 h-20 w-20 border-0 rounded-full hover:bg-transparent "
            >
              <MoreVert sx={{ fontSize: 30 }} />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 bg-white border-2 cursor-pointer hover:border-blue-700"
            >
              <img
                loading="lazy"
                // onClick={signout}
                className="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                alt=""
                // style={{ height: "250", width: "40" }}
              />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Folder color="gray" />
          </div>
          {row}
        </div>
        {/* <Button onClick={test}>test</Button> */}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
