import { Card, Text } from "@radix-ui/themes";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import useStore from "../store";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface PostItemProps {
  postId: string;
  ownerId: string;
  caption?: string;
  imageUrl: string;
  likes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostItem = ({
  postId,
  ownerId,
  caption,
  imageUrl,
  likes,
  createdAt,
}: PostItemProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useStore();
  const [username, setUsername] = useState("");
  const [isLiked, setIsLiked] = useState(likes?.includes(userId as string));

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await axiosPrivate(`users/${ownerId}`);
        setUsername(res.data.user.username);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsername();
  }, [axiosPrivate, ownerId]);

  const handleLike = async () => {
    try {
      const res = await axiosPrivate.post(`/posts/like/${postId}`, { userId });
      console.log(res.data.message);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[800px]">
      <Card className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Text weight={"bold"}>{username}</Text>
          <Text weight={"light"} size={"1"}>
            {new Date(createdAt).toLocaleString()}
          </Text>
        </div>
        <div className="flex">
          {caption && (
            <Text as="p" className="text-justify">
              {caption}
            </Text>
          )}
          {userId === ownerId && (
            <button className="ml-auto">
              <PencilSquareIcon className="size-5" />
            </button>
          )}
        </div>
        <div className="bg-black flex justify-center items-center overflow-hidden max-h-[75vh]">
          <img
            className="object-contain  "
            src={`http://localhost:3000/${imageUrl}`}
            alt="Post Image"
          />
        </div>
        <div className="flex gap-2  ">
          <button
            className="flex items-center gap-2 p-2 hover:bg-zinc-800"
            onClick={handleLike}
          >
            <HandThumbUpIcon
              className="size-5"
              fill={isLiked ? "white" : "none"}
              stroke="white"
            />
            <Text>Like</Text>
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-zinc-800">
            <ChatBubbleBottomCenterIcon
              className="size-5"
              fill="none"
              stroke="white"
            />
            <Text>Comments</Text>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default PostItem;
