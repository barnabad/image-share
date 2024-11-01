import { Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import { User } from "../models/User";
import useStore from "../store";

interface PostItemProps {
  ownerId: string;
  caption?: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostItem = ({
  ownerId,
  caption,
  imageUrl,
  createdAt,
  updatedAt,
}: PostItemProps) => {
  const [owner, setOwner] = useState<User>();
  const privateAxios = useAxiosPrivate();
  const { userId } = useStore();

  useEffect(() => {
    const getUsername = async () => {
      try {
        const res = await privateAxios(`/users/${ownerId}`);
        setOwner(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUsername();
  }, [ownerId, privateAxios]);

  return (
    <div className="max-w-[800px]">
      <Card className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Text weight={"bold"}>{owner?.username}</Text>
          <Text weight={"light"} size={"1"}>
            {`${createdAt !== updatedAt ? "(edited)" : ""} ${new Date(
              createdAt
            ).toLocaleString()}`}
          </Text>
        </div>
        <div className="flex">
          {caption && (
            <Text as="p" className="text-justify">
              {caption}
            </Text>
          )}
          {userId === owner?._id && (
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
        <div className="flex gap-4">
          <button className="flex items-center gap-2 p-2 hover:bg-zinc-800">
            <HandThumbUpIcon className="size-5" fill="none" stroke="white" />
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
