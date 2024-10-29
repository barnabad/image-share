import { Button, Card, Heading, Text, TextField } from "@radix-ui/themes";
import { Link as RouterLink, Navigate } from "react-router-dom";
import Page from "../components/Page";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authService } from "../services/auth.service";
import useStore from "../store";
import toast from "react-hot-toast";

interface LoginFormData {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { isAuthenticated, authUser } = useStore();
  //const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  const login: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await authService.login(data);
      if (res?.status === 200) {
        authUser(res.data.accessToken, res.data.username);
        toast.success(res.data.message);
      }
    } catch (error) {
      // TODO: Custom error handling
      console.log(error);
    }
  };

  // Redirect user to homepage is already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Page>
      <Card size="3" className="max-w-[400px] mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
          <Heading as="h2" align="center">
            Login
          </Heading>
          <TextField.Root
            {...register("username")}
            placeholder="Username"
            size="3"
          />
          {errors.username && (
            <Text color="ruby">{errors.username.message}</Text>
          )}
          <TextField.Root
            {...register("password")}
            type="password"
            placeholder="Password"
            size="3"
          />
          {errors.password && (
            <Text color="ruby">{errors.password.message}</Text>
          )}
          <Button type="submit" size="3">
            Login
          </Button>

          <RouterLink
            className="hover:underline"
            style={{ color: "var(--accent-9)" }}
            to="/signup"
          >
            Don't have an account?
          </RouterLink>
        </form>
      </Card>
    </Page>
  );
};

export default LoginPage;
