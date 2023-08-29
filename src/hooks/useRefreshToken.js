import axios from "@/services/axios";
import useAuth from "@/hooks/useAuth";
import { API_URL } from "../config/config";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`${API_URL}/auth/refresh`, {
      withCredentials: true,
    });
    setAuth({ 
      username: response.data.user.username, 
      role: response.data?.user.role, 
      accessToken: response.data?.access_token 
    });
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
