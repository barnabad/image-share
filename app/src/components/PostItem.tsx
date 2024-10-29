import { Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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
  const [ownerName, setOwnerName] = useState("");
  const privateAxios = useAxiosPrivate();

  useEffect(() => {
    const getUsername = async () => {
      try {
        const res = await privateAxios(`/users/${ownerId}`);
        setOwnerName(res.data.username);
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
          <Text weight={"bold"}>{ownerName}</Text>
          <Text weight={"light"} size={"1"}>
            {`${createdAt !== updatedAt ? "(edited)" : ""} ${new Date(
              createdAt
            ).toLocaleString()}`}
          </Text>
        </div>
        {caption && (
          <Text as="p" className="text-justify">
            {caption}
          </Text>
        )}
        <div className="">
          <img
            className=""
            src={`http://localhost:3000/${imageUrl}`}
            alt="Post Image"
          />
        </div>
      </Card>
    </div>
  );
};

export default PostItem;
