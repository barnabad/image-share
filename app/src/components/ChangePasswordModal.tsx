import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

const ChangePasswordModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button
          className="hover:underline"
          style={{ color: "var(--accent-9)" }}
        >
          Change
        </button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth={"350px"} size={"2"}>
        <Dialog.Title mb={"4"}>Change Password</Dialog.Title>
        <form>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="2" weight="bold">
                Current Password
              </Text>
              <TextField.Root size={"3"} type="password" />
            </label>
            <label>
              <Text as="div" size="2" mb="2" weight="bold">
                New Password
              </Text>
              <TextField.Root size={"3"} type="password" />
            </label>
            <label>
              <Text as="div" size="2" mb="2" weight="bold">
                Confirm New Password
              </Text>
              <TextField.Root size={"3"} type="password" />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <Button type="submit">Upload</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ChangePasswordModal;
