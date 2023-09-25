import { Button } from "@material-tailwind/react";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <img
        src="https://www.dignited.com/wp-content/uploads/2020/04/Google-Docs-Header-1280x720-1-1024x576.png"
        height={300}
        width={550}
      />
      <Button className="w-44 mt-10 bg-blue-600" onClick={signIn}>
        Login
      </Button>
    </div>
  );
}

export default Login;
