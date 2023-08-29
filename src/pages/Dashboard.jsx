import React from "react";

const Dashboard = () => {
  return (
    <div class="main-content ">
      <div class="page-content dark:bg-zinc-700">
        <div class="container-fluid px-[0.625rem]"> 
          {/* Page-Title */}

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <div class="card dark:bg-zinc-800 dark:border-zinc-600">
              <div class="card-body">
                <div>
                  <div class="grid grid-cols-12 gap-5 items-center">
                    <div class="col-span-6">
                      <span class="text-gray-700 dark:text-zinc-100">
                        My Wallet
                      </span>
                      <h4 class="my-4 text-xl text-gray-800 dark:text-gray-100 ">
                        $
                        <span class="counter-value" data-target="865.2">
                          865.2
                        </span>
                        k
                      </h4>
                    </div>
                    <div class="col-span-6">
                      <div
                        id="mini-chart1"
                        data-colors='["#5156be"]'
                        class="apex-charts mb-2"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="text-xs py-[1px] px-1 bg-green-50/60 text-green-500 rounded font-medium dark:bg-green-500/30">
                    + $20.9k
                  </span>
                  <span class="ltr:ml-1.5 rtl:mr-1.5 text-gray-700 text-13 dark:text-zinc-100">
                    Since last week
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
