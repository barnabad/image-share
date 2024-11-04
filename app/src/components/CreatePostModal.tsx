import {
  Button,
  Dialog,
  Flex,
  Spinner,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

interface CreatePostModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  fetchPosts: () => void;
}

const CreatePostModal = ({
  isOpen,
  setIsOpen,
  fetchPosts,
}: CreatePostModalProps) => {
  const privateAxios = useAxiosPrivate();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { logoutUser, userId } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      setError("");
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError("Choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("ownerId", userId as string);
    formData.append("file-upload", file);

    if (caption) {
      formData.append("caption", caption);
    }

    try {
      setIsLoading(true);

      const res = await privateAxios.post("posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setIsOpen(false);
        fetchPosts();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      logoutUser();
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCaption("");
      setFile(null);
      setError("");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <button
          onClick={() => setIsOpen(true)}
          className="hover:underline"
          style={{ color: "var(--accent-9)" }}
        >
          Create post
        </button>
      </Dialog.Trigger>
      <Dialog.Content
        size={"2"}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <Dialog.Title>Create Post</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Share your, ideas, thoughts, photos with your friends!
        </Dialog.Description>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="2" weight="bold">
                Caption
              </Text>
              <TextArea
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write something..."
              />
            </label>
            <label>
              <Text as="div" size="2" mb="2" weight="bold">
                Image
              </Text>
              <input
                onChange={handleFileChange}
                type="file"
                name="file-upload"
                id="file-upload"
              />
            </label>
            {error && <Text color="ruby">{error}</Text>}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button disabled={isLoading} type="submit">
              {isLoading && <Spinner />}Upload
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreatePostModal;
