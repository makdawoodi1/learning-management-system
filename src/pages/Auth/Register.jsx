import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "@/services/axios";

// Icons
import { GoogleOutlined } from "@ant-design/icons";
import { API_URL } from "../../config/config";

const Register = () => {
  // Hooks
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  // Functions
  const handleSubmit = (values) => {
    setSubmitting(true);

    try {
      axios.post(
      `${API_URL}/auth/register`,
        JSON.stringify({
          data: {
            attributes: { ...values },
          },
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true          
        }
      ).then((response) => {
        if (response.data?.success) {
          console.log(response.data);
          navigate("/auth/dashboard");
        } else {
          toast.error(response.data?.error);
        }
      }).catch((error) => {
        if (error.response?.data) {
          return toast.error(error.response.data?.message)
        }
        console.error("Error logging in!:", error);
        toast.error("Error Registering user!");
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
              <div className="w-full bg-white xl:p-12 p-10 dark:bg-zinc-800">
                <div className="flex h-[90vh] flex-col">
                  <div className="mx-auto"></div>

                  <div className="my-auto">
                    <div className="text-center">
                      <h3 className="text-2xl text-gray-600 dark:text-gray-100">
                        {location.pathname === "/register"
                          ? "Register Student Account"
                          : "Register Admin Account"}
                      </h3>
                      <p className="text-gray-500 mt-1 dark:text-zinc-100/60">
                        Register your account now!
                      </p>
                    </div>

                    <Form
                      form={form}
                      name="register-form"
                      onFinish={handleSubmit}
                      className="mt-4 pt-2"
                      autoComplete="off"
                    >
                      <div className="my-4">
                        <Form.Item
                          name="firstname"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Firstname!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/60"
                            placeholder="Enter Firstname"
                          />
                        </Form.Item>
                      </div>
                      <div className="my-4">
                        <Form.Item
                          name="lastname"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Lastname!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/60"
                            placeholder="Enter Lastname"
                          />
                        </Form.Item>
                      </div>
                      <div className="my-4">
                        <Form.Item
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/60"
                            placeholder="Enter Username"
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-4">
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
                            className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/60"
                            placeholder="Enter Email"
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
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
                            className="w-full rounded ltr:rounded-r-none rtl:rounded-l-none [&>*]:placeholder:text-sm [&>*]:placeholder:text-gray-500 py-2 border-gray-500 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/60"
                            placeholder="Enter Password"
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <Form.Item
                          name="confirmPassword"
                          dependencies={["password"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("The two passwords do not match!")
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password
                            size="large"
                            className="w-full rounded ltr:rounded-r-none rtl:rounded-l-none [&>*]:placeholder:text-sm [&>*]:placeholder:text-gray-500 py-2 border-gray-500 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/60"
                            placeholder="Confirm Password"
                          />
                        </Form.Item>
                      </div>
                      <div className="row mb-6">
                        <div>
                          <p className="text-gray-600 dark:text-zinc-100/60">
                            By registering you agree to the
                            <a href="#" className="text-violet-500" style={{ color: 'rgb(139 92 246 / 1)' }}>
                              &nbsp;Terms of Use
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <Button
                          className={`btn border-transparent bg-violet-500 w-full text-white hover:text-white w-100 waves-effect py-0 waves-light shadow-md shadow-violet-200 dark:shadow-zinc-600 `}
                          style={{
                            backgroundColor: 'rgb(139 92 246 / 1)'
                          }}
                          htmlType="submit"
                          disabled={
                            submitting || 
                            !form.isFieldsTouched(true) || 
                            form.getFieldsError().some(({ errors }) => errors.length)}
                        >
                          {submitting ? "Processing..." : "Register"}
                        </Button>
                      </div>
                    </Form>

                    <div className="mt-4 pt-2 text-center">
                      <div>
                        <hr />
                        <h6 className="text-14 my-3 text-gray-500 font-medium dark:text-zinc-100/60">
                          Sign in with
                        </h6>
                      </div>

                      <div className="flex justify-center gap-3">
                        <a className="h-9 w-9 py-0 bg-violet-500 rounded-full cursor-pointer flex justify-center">
                          <GoogleOutlined className="text-white text-xl" />
                        </a>
                        <a className="h-9 w-9 py-0 bg-sky-500 rounded-full cursor-pointer flex justify-center">
                          <GoogleOutlined className="text-white text-xl" />
                        </a>
                        <a className="h-9 w-9 py-0 bg-red-400 rounded-full cursor-pointer flex justify-center">
                          <GoogleOutlined className="text-white text-xl" />
                        </a>
                      </div>
                    </div>

                    <div className="mt-12 text-center">
                      <p className="text-gray-500 dark:text-zinc-100/60">
                        Already have an account?&nbsp;
                        <Link
                          to="/login"
                          className="text-violet-500 font-semibold underline cursor-pointer"
                          style={{
                            color: 'rgb(139 92 246 / 1)'
                          }}
                        >
                          Login
                        </Link>
                      </p>
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
                            <div className="flex-1 ltr:ml-3 rtl:mr-3 mb-4">
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
                            <div className="flex-1 ltr:ml-3 rtl:mr-3 mb-4">
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
                            <div className="flex-1 ltr:ml-3 rtl:mr-3 mb-4">
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

export default Register;
