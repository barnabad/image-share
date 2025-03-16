import { Link as RouterLink } from "react-router-dom";
import { Button, Heading, Popover } from "@radix-ui/themes";
import { authService } from "../services/auth.service";
import toast from "react-hot-toast";
import { BellIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectAccessToken } from "../store/authSlice";

const Header = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logoutUser());
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
          <div className="flex gap-2">
            <Popover.Root>
              <Popover.Trigger>
                <button className="p-1">
                  <BellIcon className="size-6" />
                </button>
              </Popover.Trigger>
              <Popover.Content>
                <p>notifications</p>
              </Popover.Content>
            </Popover.Root>
            <Button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
