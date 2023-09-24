// React, Redux & Router imports
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useRootDispatch, useRootSelector } from "../../context/store";
// import { authApi } from "../../api/auth/api";
import { API_URL } from "@/config/config";
// import { authSlice } from "../../features/auth/slice";
import useAuth from "@/hooks/useAuth";
import useToggle from "@/hooks/useToggle";
import axios from "@/services/axios";

// Ant Design & Toaster imports
import { Button, Checkbox, Form, Input } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowCircleLeft } from "react-icons/fa";

// Icons
import {
  GithubOutlined,
  GoogleCircleFilled,
  GoogleOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const Login = () => {
  // Form State
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [check, toggleCheck] = useToggle("persist", false);
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/";

  // TODO RTK Query
  // Access Token
  // const dispatch = useRootDispatch();
  // const loginResult = authApi.endpoints.login.useQuery(
  //   JSON.stringify({
  //     data: {
  //       attributes: { ...values },
  //     },
  //   }),
  //   {
  //     skip: !formState.hasValues,
  //   }
  // );
  // const { accss_token: accessToken } = loginResult;

  // useEffect(() => {
  //   if (!loginResult?.accessToken) return;

  //   dispatch(authSlice.actions.updateAccessToken(accessToken));
  // }, [dispatch, accessToken]);

  // Functions
  const handleSubmit = (values) => {
    setSubmitting(true);

    try {
      axios
        .post(
          `${API_URL}/auth/login`,
          JSON.stringify({
            data: {
              attributes: { ...values },
            },
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data?.success) {
            const fetchedData = response.data;
            const accessToken = fetchedData?.access_token;
            const role = fetchedData?.user.role;
            const { key, value } =
              role === "ADMIN"
                ? { key: "courses", value: fetchedData.user.courses }
                : { key: "enrollments", value: fetchedData.user.enrollments };
            setAuth({
              username: fetchedData.user.username,
              role,
              accessToken,
              profileImage: fetchedData.user.profile_picture,
              [key]: value,
            });
            toast.success("Login Successful");
            navigate("/auth/dashboard");
          } else {
            toast.error(response?.data.message);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error logging in!:", error.message);
          toast.error(error.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName="toaster-container"
          containerStyle={{}}
          toastOptions={{
            className: "text-sm",
            duration: 5000,
            style: {
              background: "#fff",
              color: "#363636",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <div className="h-screen md:overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 ">
            <div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3 relative z-50">
              <div className="w-full bg-white xl:p-12 p-10 ">
                <div className="flex h-[90vh] flex-col">
                  <div>
                    <Link to="/" className="d-flex align-items-center gap-2 " style={{ color: "#458cf0" }}>
                      <FaArrowCircleLeft size={32} color="#458cf0" /> Go Back
                    </Link>
                  </div>

                  <div className="my-auto">
                    <div className="text-center">
                      <h3 className="text-2xl text-gray-600 ">Welcome Back!</h3>
                      <p className="text-gray-500 ">Sign in to continue.</p>
                    </div>

                    <Form
                      name="login-form"
                      onFinish={handleSubmit}
                      className="mt-4 pt-2"
                      initialValues={{
                        rememberMe: check ? true : false,
                      }}
                    >
                      <div className="my-4">
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                            {
                              type: "email",
                              message: "Please input valid email address!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                            placeholder="Enter Email"
                          />
                        </Form.Item>
                      </div>

                      <div className="mb-4">
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                        >
                          <Input.Password
                            size="large"
                            className="w-full rounded ltr:rounded-r-none rtl:rounded-l-none [&>*]:placeholder:text-sm [&>*]:placeholder:text-gray-500 py-2 border-gray-500 "
                            placeholder="Enter Password"
                          />
                        </Form.Item>
                      </div>

                      <div className="mb-6">
                        <Form.Item name="rememberMe" valuePropName="checked">
                          <Checkbox
                            className="bg-white checked:bg-violet-300 checked:border-bg-violet-300 focus:outline-none transition duration-200 mt-1 align-top ltr:float-left rtl:float-right ltr:mr-2 rtl:ml-2 cursor-pointer focus:ring-offset-0"
                            onChange={toggleCheck}
                            checked={check}
                          >
                            Remmber Me
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <div className="mb-3">
                        <Form.Item>
                          <Button
                            className={`btn border-transparent bg-violet-500 w-full py-0 text-white hover:text-white w-100 waves-effect waves-light shadow-md shadow-violet-200 `}
                            style={{
                              backgroundColor: "#458cf0",
                            }}
                            htmlType="submit"
                            disabled={submitting}
                          >
                            {submitting ? "Processing..." : "Login"}
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>

                    {/* <div className="mt-4 pt-2 text-center">
                      <div>
                        <hr />
                        <h6 className="text-14 my-3 text-gray-500 font-medium">
                          Sign in with
                        </h6>
                      </div>

                      <div className="flex justify-center gap-3">
                        <a className="h-9 w-9 py-0 bg-violet-500 rounded-full cursor-pointer flex justify-center">
                          <GoogleOutlined className="text-white text-xl" />
                        </a>
                        <a className="h-9 w-9 py-0 bg-sky-500 rounded-full cursor-pointer flex justify-center">
                          <LinkedinOutlined className="text-white text-xl" />
                        </a>
                        <a className="h-9 w-9 py-0 bg-red-400 rounded-full cursor-pointer flex justify-center">
                          <GithubOutlined className="text-white text-xl" />
                        </a>
                      </div>
                    </div> */}

                    <div className="mt-12 text-center">
                      <p className="text-gray-500 ">
                        Don't have an account?&nbsp;
                        <Link
                          to="/register"
                          className="text-violet-500 font-semibold underline cursor-pointer"
                          style={{
                            color: "#458cf0",
                          }}
                        >
                          Register
                        </Link>
                      </p>
                      {/* <p className="text-gray-500 ">
                        <Link
                          to="/forgot-password"
                          className="text-violet-500 font-semibold underline cursor-pointer"
                          style={{
                            color: "rgb(139 92 246 / 1)",
                          }}
                        >
                          Forgot Password?
                        </Link>
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">
              <div className="h-screen bg-cover relative p-5 bg-[url('../images/auth-bg.jpg')]">
                <div className="absolute inset-0 bg-violet-500/90"></div>

                <ul className="bg-bubbles absolute top-0 left-0 w-full h-full overflow-hidden animate-square">
                  <li className="h-10 w-10 rounded-3xl bg-white/10 absolute left-[10%] "></li>
                  <li className="h-28 w-28 rounded-3xl bg-white/10 absolute left-[20%]"></li>
                  <li className="h-10 w-10 rounded-3xl bg-white/10 absolute left-[25%]"></li>
                  <li className="h-20 w-20 rounded-3xl bg-white/10 absolute left-[40%]"></li>
                  <li className="h-24 w-24 rounded-3xl bg-white/10 absolute left-[70%]"></li>
                  <li className="h-32 w-32 rounded-3xl bg-white/10 absolute left-[70%]"></li>
                  <li className="h-36 w-36 rounded-3xl bg-white/10 absolute left-[32%]"></li>
                  <li className="h-20 w-20 rounded-3xl bg-white/10 absolute left-[55%]"></li>
                  <li className="h-12 w-12 rounded-3xl bg-white/10 absolute left-[25%]"></li>
                  <li className="h-36 w-36 rounded-3xl bg-white/10 absolute left-[90%]"></li>
                </ul>

                <div className="grid grid-cols-12 content-center h-screen">
                  <div className="col-span-8 col-start-3">
                    <div className="swiper login-slider">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <i className="bx bxs-quote-alt-left text-green-600 text-5xl"></i>
                          <h3 className="mt-4 text-white text-22">
                            “I feel confident imposing change on myself. It's a
                            lot more progressing fun than looking back. That's
                            why I ultricies enim at malesuada nibh diam on
                            tortor neaded to throw curve balls.”
                          </h3>
                          <div className="flex mt-6 mb-10 pt-4">
                            <div className="flex-1 ltr:ml-3 rtl:mr-2 mb-4">
                              <h5 className="font-size-18 text-white">
                                Ilse R. Eaton
                              </h5>
                              <p className="mb-0 text-white/50">Manager</p>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <i className="bx bxs-quote-alt-left text-green-600 text-5xl"></i>
                          <h3 className="mt-4 text-white text-22">
                            “I feel confident imposing change on myself. It's a
                            lot more progressing fun than looking back. That's
                            why I ultricies enim at malesuada nibh diam on
                            tortor neaded to throw curve balls.”
                          </h3>
                          <div className="flex mt-6 mb-10 pt-4">
                            <div className="flex-1 ltr:ml-3 rtl:mr-2 mb-4">
                              <h5 className="font-size-18 text-white">
                                Mariya Willam
                              </h5>
                              <p className="mb-0 text-white/50">Designer</p>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <i className="bx bxs-quote-alt-left text-green-600 text-5xl"></i>
                          <h3 className="mt-4 text-white text-22">
                            “I feel confident imposing change on myself. It's a
                            lot more progressing fun than looking back. That's
                            why I ultricies enim at malesuada nibh diam on
                            tortor neaded to throw curve balls.”
                          </h3>
                          <div className="flex mt-6 mb-10 pt-4">
                            <div className="flex-1 ltr:ml-3 rtl:mr-2 mb-4">
                              <h5 className="font-size-18 text-white">
                                Jiya Jons
                              </h5>
                              <p className="mb-0 text-white/50">Developer</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-pagination"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
