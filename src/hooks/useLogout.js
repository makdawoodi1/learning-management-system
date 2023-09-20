import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const logout = () => {
    try {
      axios.post(`${API_URL}/auth/logout`, {
        withCredentials: true,
      }).then(response => {
        if (response?.status) { 
          toast.success("Logout Successful");
          setAuth({});
          navigate('/login');
        } else {
          toast.error(response?.data.message);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  return logout;
};

export default useLogout;
