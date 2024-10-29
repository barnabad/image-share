import { Link as RouterLink } from "react-router-dom";
import Page from "../components/Page";
const ProfilePage = () => {
  return (
    <Page>
      <RouterLink
        className="hover:underline text-center"
        style={{ color: "var(--accent-9)" }}
        to="/"
      >
        Home Page
      </RouterLink>
    </Page>
  );
};

export default ProfilePage;
