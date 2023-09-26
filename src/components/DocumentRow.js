import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { Article, MoreVert } from "@mui/icons-material";

function DocumentRow({ id, filename, date }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 test-gray-100 text-sm cursor-pointer"
    >
      <Article sx={{ fontSize: 30, color: "#008ae2" }} />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{filename}</p>
      <p className="pr-5 text-sm ">{date.toDate().toLocaleDateString()}</p>
      <Button
        color="gray"
        variant="text"
        icononly="true"
        className="hidden md:inline-block border-0 rounded-full hover:bg-transparent "
      >
        <MoreVert sx={{ fontSize: 30 }} />
      </Button>
    </div>
  );
}

export default DocumentRow;
