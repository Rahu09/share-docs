import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { Article } from "@mui/icons-material";

function DocumentRow({ id, fileName, date }) {
  return (
    <div>
      <Article sx={{ fontSize: 30 }} color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm ">{date.toDate().toLocaleDateString()}</p>
    </div>
  );
}

export default DocumentRow;
