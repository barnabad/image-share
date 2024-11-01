import { Link as RouterLink, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { Badge, Card, DataList } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import useStore from "../store";
import { User } from "../models/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId, logoutUser } = useStore();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await axiosPrivate.get(`/users/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        logoutUser();
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, axiosPrivate, logoutUser, navigate]);

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
          <DataList.Root size={"3"}>
            <DataList.Item>
              <DataList.Label>Status</DataList.Label>
              <DataList.Value>
                <button>
                  <Badge color="grass" size={"2"} radius="full">
                    Online
                  </Badge>
                </button>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Username</DataList.Label>
              <DataList.Value>{user?.username}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Email</DataList.Label>
              <DataList.Value>{user?.email}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Change Password</DataList.Label>
              <DataList.Value>
                <button
                  className="hover:underline"
                  style={{ color: "var(--accent-9)" }}
                >
                  Change
                </button>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Card>
      </div>
    </Page>
  );
};

export default ProfilePage;
