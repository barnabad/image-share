import { Link as RouterLink, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { Badge, Button, Card, DataList, TextField } from "@radix-ui/themes";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "../models/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import toast from "react-hot-toast";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUserId } from "../store/authSlice";

type EditingModes = "username" | "email" | null;

interface EditFieldProps {
  value: string;
  type: "text" | "email";
  setEditingMode: (value: EditingModes) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditField = ({
  value,
  type,
  setEditingMode,
  onSubmit,
  onChange,
}: EditFieldProps) => {
  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <TextField.Root
        value={value}
        type={type}
        onChange={onChange}
      ></TextField.Root>
      <Button className="cursor-pointer" type="submit">
        Save
      </Button>
      <Button
        color="gray"
        variant="soft"
        className="cursor-pointer"
        type="button"
        onClick={() => setEditingMode(null)}
      >
        Cancel
      </Button>
    </form>
  );
};

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const userId = useSelector(selectUserId);
  const [user, setUser] = useState<User>();
  const [, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editingMode, setEditingMode] = useState<EditingModes>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get(`/users/${userId}`);
      setUser(res.data.user);
      setUsernameInput(res.data.user.username);
      setEmailInput(res.data.user.email);
    } catch (error) {
      console.log(error);
      dispatch(logoutUser());
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [axiosPrivate, dispatch, navigate, userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axiosPrivate.patch("/users/username", {
        userId,
        newUsername: usernameInput,
      });
      toast.success(res.data.message);
      setEditingMode(null);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axiosPrivate.patch("/users/email", {
        userId,
        newEmail: emailInput,
      });
      toast.success(res.data.message);
      setEditingMode(null);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page>
      <RouterLink
        className="hover:underline text-center inline-block mb-4"
        style={{ color: "var(--accent-9)" }}
        to="/"
      >
        Home Page
      </RouterLink>
      <div className="max-w-[800px] mx-auto">
        <Card>
          <DataList.Root size={"3"} orientation={"vertical"}>
            <DataList.Item>
              <DataList.Label>Status</DataList.Label>
              <DataList.Value>
                <button>
                  <Badge color="grass" size={"2"}>
                    Online
                  </Badge>
                </button>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Username</DataList.Label>
              <DataList.Value>
                {editingMode !== "username" ? (
                  <>
                    <span className="mr-2">{user?.username}</span>
                    <button onClick={() => setEditingMode("username")}>
                      <PencilSquareIcon className="size-5" />
                    </button>
                  </>
                ) : (
                  <EditField
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    type="text"
                    setEditingMode={setEditingMode}
                    onSubmit={updateUsername}
                  />
                )}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Email</DataList.Label>
              <DataList.Value>
                {editingMode !== "email" ? (
                  <>
                    <span className="mr-2">{user?.email}</span>
                    <button onClick={() => setEditingMode("email")}>
                      <PencilSquareIcon className="size-5" />
                    </button>
                  </>
                ) : (
                  <EditField
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    type="email"
                    setEditingMode={setEditingMode}
                    onSubmit={updateEmail}
                  />
                )}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Change Password</DataList.Label>
              <DataList.Value>
                <ChangePasswordModal />
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Card>
      </div>
    </Page>
  );
};

export default ProfilePage;
