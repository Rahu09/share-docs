import { Button } from "@material-tailwind/react";
import { Menu, Description, Search } from "@mui/icons-material";
import { blue, grey } from "@mui/material/colors";

function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <Button
        color="blue"
        variant="text"
        icononly="true"
        className="h-20 w-20 border-0 rounded-full hover:bg-transparent "
      >
        <Menu sx={{ fontSize: 30 }} />
      </Button>
      <Description sx={{ color: blue[600], fontSize: 40 }} />
      <h1 className="hidden md:inline-flex ml-2 text-gray-700">Docs</h1>
      <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600">
        <Search sx={{ color: grey[800], fontSize: 30 }} />
        <input
          type="text"
          placeholder="Search"
          className="focus:outline-none flex-grow px-5 text-base bg-transparent"
        />
      </div>
    </div>
  );
}

export default Header;
