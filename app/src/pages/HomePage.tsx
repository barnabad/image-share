import Page from "../components/Page";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useStore from "../store";
import PostItem from "../components/PostItem";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Post from "../models/Post";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CreatePostModal from "../components/CreatePostModal";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [isOpen, setIsOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { logoutUser } = useStore();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await axiosPrivate.get("/posts");
        if (res?.status === 200) {
          toast.success(res.data.message);
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
        logoutUser();
        navigate("/login");
      }
    };
    loadPosts();
  }, [logoutUser, navigate, axiosPrivate]);

  return (
    <Page className="flex flex-col">
      <div className="flex gap-4 items-start mb-4">
        <RouterLink
          className="hover:underline"
          style={{ color: "var(--accent-9)" }}
          to="/profile"
        >
          Profile Page
        </RouterLink>
        <CreatePostModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div className="mx-auto flex flex-col gap-4">
        {posts?.map((item) => (
          <PostItem
            key={item._id}
            ownerId={item.ownerId}
            caption={item.caption}
            imageUrl={item.imageUrl}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
          />
        ))}
      </div>
    </Page>
  );
};

export default HomePage;
