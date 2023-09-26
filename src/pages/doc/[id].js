import { useSession, getSession, signOut } from "next-auth/react";
import { Description, People } from "@mui/icons-material";
import Login from "@/components/Login";
import { useRouter } from "next/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import TextEditor from "@/components/TextEditor";
import { useState } from "react";
import { Alert } from "@mui/material";

function Doc() {
  const { data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;

  const email = session?.user?.email;
  const [snapshot, loading] = useDocumentOnce(
    doc(db, `userDocs/${email}/docs`, id)
  );
  const info = snapshot?.data()?.fieldName;

  if (!loading && !info) router.replace("/");

  const [open, setOpen] = useState(false);
  const [shEmail, setShEmail] = useState();
  const [shRole, setShRole] = useState("viewer");
  const [showAlert, setShowAlert] = useState(false);

  const handleAdd = async () => {
    // const currUserRef = doc(db, `userDocs/${email}/docs`, id);
    const sharedUserRef = collection(db, `userDocs/${shEmail}/shared`); //edit `userDocs/${shEmail}/shared/{editor[] and veiwer[]}` -->
    addDoc(sharedUserRef, {
      id: id,
      owner: email,
    });
    // const preveditor = await getDoc(currUserRef);

    // if (shRole === "editor") {
    //   await setDoc(
    //     ref,
    //     {
    //       editor: [shEmail, ...preveditor?.data()?.editor],
    //     },
    //     {
    //       merge: true,
    //     }
    //   );
    // } else {
    //   await setDoc(
    //     ref,
    //     {
    //       viewer: [shEmail, ...preveditor?.data()?.viewer],
    //     },
    //     {
    //       merge: true,
    //     }
    //   );
    // }
    // setOpen(!open);
    // setShowAlert(true);
    // setTimeout(() => setShowAlert(false), 4000);
  };

  const handleOpen = () => setOpen(!open);

  const shareDialog = (
    <>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Share "{info}.docx"</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid  gap-4">
            <Input
              color="blue"
              type="email"
              label="Email Address"
              value={shEmail}
              onChange={(e) => setShEmail(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Select
                  color="blue"
                  label="Select Role"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  defaultValue={shRole}
                  onChange={(e) => setShRole(e)}
                >
                  <Option value="viewer">Viewer</Option>
                  <Option value="editor">Editor</Option>
                </Select>
              </div>
              <Button
                variant="outlined"
                color="blue"
                className="rounded-full"
                onClick={handleAdd}
              >
                ADD
              </Button>
            </div>
            <div>People with access</div>
            <div> peoples list here</div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="blue"
            onClick={handleOpen}
            className="rounded-full"
          >
            done
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );

  //sharedoc implementation

  if (!session) return <Login />;
  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <Description sx={{ fontSize: 50, color: "#008ae2" }} />
        </span>
        <div className="flex-grow px-2 ">
          <h2>{info}</h2>
          <div className="flex items-center text-sm space-x-1 ml-1 h-8 text-gray-600">
            <p className="cursor-pointer hover:bg-gray-100 p-2 transition duration-200 ease-out rounded-lg">
              Edit
            </p>
            <p className="cursor-pointer hover:bg-gray-100 p-2 transition duration-200 ease-out rounded-lg">
              File
            </p>
            <p className="cursor-pointer hover:bg-gray-100 p-2 transition duration-200 ease-out rounded-lg">
              View
            </p>
            <p className="cursor-pointer hover:bg-gray-100 p-2 transition duration-200 ease-out rounded-lg">
              Insert
            </p>
            <p className="cursor-pointer hover:bg-gray-100 p-2 transition duration-200 ease-out rounded-lg">
              Formal
            </p>
            <p className="cursor-pointer hover:bg-gray-100 p-2 transition duration-200 ease-out rounded-lg">
              Tools
            </p>
          </div>
        </div>
        <Button
          className=" hidden md:!inline bg-blue-600 pt-1 pb-1 h-10"
          onClick={handleOpen}
        >
          <People /> SHARE
        </Button>
        <img
          className="cursor-pointer rounded-full h-10 w-10 ml-2"
          src={session?.user?.image}
          onClick={signOut}
        />
      </header>
      {/* <Alert className="z-5" severity="success">
        This is a success alert — check it out!
      </Alert> */}
      {showAlert && (
        <Alert className="z-5 flex justify-center" severity="success">
          This is a success alert — check it out!
        </Alert>
      )}
      {shareDialog}
      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
