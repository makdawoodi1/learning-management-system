import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "@/config/config";
import axios from "@/services/axios";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  // Hooks
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Functions
  const handleSubmit = (values) => {
    setSubmitting(true);

    try {
      axios
        .post(
          `${API_URL}/auth/reset-password`,
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
            toast.success("Your password has been succesfully reset!");
            navigate("/login");
          } else {
            console.error(response.data?.message);
            toast.error(response.data?.message);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error resetting password!:", error.message);
          toast.error(error.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured");
    }
  };

  return (
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
                <div className="my-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl text-gray-600 ">
                      Reset Password
                    </h3>
                  </div>

                  <div className="px-5 py-3 bg-green-500/10 border-2 border-green-500/30 rounded">
                    <p className="text-green-500 text-sm my-0 text-center">
                      You can reset your password below!
                    </p>
                  </div>

                  <Form
                    name="forgot-password-form"
                    onFinish={handleSubmit}
                    className="mt-4 pt-2"
                  >
                    <div className="mb-6">
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
                          className="w-full rounded ltr:rounded-r-none rtl:rounded-l-none [&>*]:placeholder:text-sm [&>*]:placeholder:text-gray-500 py-2 border-gray-500 "
                          placeholder="Confirm Password"
                        />
                      </Form.Item>
                    </div>

                    <div className="mb-4">
                      <Button
                        className={`btn border-transparent w-full text-white py-0 hover:text-white w-100 waves-effect waves-light shadow-md shadow-violet-200 `}
                        style={{
                          backgroundColor: "rgb(139 92 246 / 1)",
                        }}
                        htmlType="submit"
                        disabled={submitting}
                      >
                        {submitting ? "Processing..." : "Reset"}
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-12 text-center">
                    <p className="text-gray-500 ">
                      Remember It?&nbsp;
                      <Link
                        to="/login"
                        className="text-violet-500 font-semibold"
                        style={{
                          color: "rgb(139 92 246 / 1)",
                        }}
                      >
                        Sign In
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
                          lot more progressing fun than looking back. That's why
                          I ultricies enim at malesuada nibh diam on tortor
                          neaded to throw curve balls.”
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
                          lot more progressing fun than looking back. That's why
                          I ultricies enim at malesuada nibh diam on tortor
                          neaded to throw curve balls.”
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
                          lot more progressing fun than looking back. That's why
                          I ultricies enim at malesuada nibh diam on tortor
                          neaded to throw curve balls.”
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
  );
};

export default ResetPassword;
