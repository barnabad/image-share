import Page from "../components/Page";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useStore from "../store";
import PostItem from "../components/PostItem";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Post from "../models/Post";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CreatePostModal from "../components/CreatePostModal";
import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [isOpen, setIsOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axiosPrivate.get("/posts");
      if (res?.status === 200) {
        toast.success(res.data.message);
        setPosts(res.data.posts);
      }
    } catch (error) {
      console.log(error);
      dispatch(logoutUser());
      navigate("/login");
    }
  }, [axiosPrivate, dispatch, navigate]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const toggleShowScrollTop = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else setShowScrollTop(false);
    };

    window.addEventListener("scroll", toggleShowScrollTop);

    return () => window.removeEventListener("scroll", toggleShowScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <CreatePostModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          fetchPosts={fetchPosts}
        />
      </div>

      <div className="mx-auto flex flex-col gap-4">
        {posts?.map((item) => (
          <PostItem
            key={item._id}
            postId={item._id}
            ownerId={item.ownerId}
            caption={item.caption}
            imageUrl={item.imageUrl}
            likes={item.likes}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
          />
        ))}
      </div>
      {showScrollTop && (
        <button className="fixed bottom-4" onClick={scrollToTop}>
          <ChevronUpIcon
            className="size-10 md:size-12"
            style={{ backgroundColor: "var(--accent-9)" }}
          />
        </button>
      )}
    </Page>
  );
};

export default HomePage;
