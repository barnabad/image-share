import { Button, Card, Heading, Text, TextField } from "@radix-ui/themes";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authService } from "../services/auth.service";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(schema) });

  const signup: SubmitHandler<SignUpFormData> = async (data) => {
    const res = await authService.signup(data);
    if (res?.status === 201) {
      toast.success(res.data.message);
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <Page>
      <Card size="3" className="max-w-[400px] mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(signup)}>
          <Heading as="h2" align="center">
            Sign Up
          </Heading>
          <TextField.Root
            {...register("email")}
            type="email"
            placeholder="Email"
            size="3"
          />
          {errors.email && <Text color="ruby">{errors.email.message}</Text>}
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
          <TextField.Root
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm password"
            size="3"
          />
          {errors.confirmPassword && (
            <Text color="ruby">{errors.confirmPassword.message}</Text>
          )}
          <Button type="submit" size="3" className="cursor-pointer">
            Sign Up
          </Button>

          <RouterLink
            className="hover:underline"
            style={{ color: "var(--accent-9)" }}
            to="/login"
          >
            Already have an account?
          </RouterLink>
        </form>
      </Card>
    </Page>
  );
};

export default SignUpPage;
