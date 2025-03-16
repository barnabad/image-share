import { Button, Card, Heading, Text, TextField } from "@radix-ui/themes";
import { Link as RouterLink, Navigate } from "react-router-dom";
import Page from "../components/Page";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authService } from "../services/auth.service";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAccessToken } from "../store/authSlice";

interface LoginFormData {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  const login: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await authService.login(data);
      if (res?.status === 200) {
        dispatch(
          loginUser({ accessToken: res.data.accessToken, userId: res.data._id })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      // TODO: Custom error handling
      console.log(error);
    }
  };

  // Redirect user to homepage is already logged in
  if (accessToken) {
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
            type={showPw ? "text" : "password"}
            placeholder="Password"
            size="3"
            className="relative"
          >
            <button
              className="px-2"
              style={{ color: "var(--gray-9)" }}
              type="button"
              onClick={() => setShowPw(!showPw)}
            >
              {!showPw ? (
                <EyeIcon className="size-5" />
              ) : (
                <EyeSlashIcon className="size-5" />
              )}
            </button>
          </TextField.Root>

          {errors.password && (
            <Text color="ruby">{errors.password.message}</Text>
          )}
          <Button type="submit" size="3" className="cursor-pointer">
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
