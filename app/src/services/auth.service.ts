import axios from "../config/axios.config";

interface SignupModel {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface LoginModel {
  username: string;
  password: string;
}

class AuthService {
  async signup({ email, username, password, confirmPassword }: SignupModel) {
    const data = {
      email,
      username,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post("auth/signup", data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async login({ username, password }: LoginModel) {
    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post("auth/login", data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      await axios.post("auth/logout");
    } catch (error) {
      console.error(error);
    }
  }
}

export const authService = new AuthService();
