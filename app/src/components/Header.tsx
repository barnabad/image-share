import { Link as RouterLink } from "react-router-dom";
import { Button, Heading } from "@radix-ui/themes";
import useStore from "../store";
import { authService } from "../services/auth.service";
import toast from "react-hot-toast";

const Header = () => {
  const { accessToken, logoutUser } = useStore();

  const handleLogout = async () => {
    await authService.logout();
    logoutUser();
    toast.success("Logout successful");
  };

  return (
    <header
      className="flex justify-between items-center p-4 border-b backdrop-blur-2xl z-20 fixed top-0 w-full"
      style={{ borderColor: "var(--gray-6)" }}
    >
      <Heading as="h1">
        <RouterLink to={"/"}>Image Share</RouterLink>
      </Heading>
      <nav className="flex items-center gap-2">
        {accessToken && (
          <>
            {/* <Avatar
              radius="full"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            /> */}
            <Button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
