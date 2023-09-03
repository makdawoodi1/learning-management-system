import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div class="container-fluid">
      <div class="bg-gray-50/20 h-screen flex items-center justify-center">
        <div>
          <div class="container mx-auto pt-12">
            <div class="grid grid-cols-12 justify-center pt-12">
              <div class="col-span-12">
                <div class="text-center">
                  <h1 class="text-8xl text-gray-600 mb-3 ">
                    4<span class="text-violet-500 mx-2">0</span>1
                  </h1>
                  <h4 class="uppercase mb-2 text-gray-600 text-[21px] ">
                    OOPS!, You are not authorized to view this page!
                  </h4>
                </div>
                <div class="mt-12 text-center">
                  <Link
                    to="/auth/dashboard"
                    class="btn bg-violet-500 border-transparent focus:ring focus:ring-violet-50 py-2 text-white"
                    style={{
                      backgroundColor: "rgb(139 92 246 / 1)",
                    }}
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </div>
              <div class="col-span-8 col-start-3">
                <div class="pt-12">
                  <img
                    src="assets/images/error-img.png"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
