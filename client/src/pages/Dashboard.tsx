import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import Stat from "../components/Stat";
import Card from "../components/Card";
import ScoreLineChart from "../components/Chart";

const Dashboard: React.FC = () => {
  return (
    <div className="mt-16 lg:mt-0">
      <DashboardHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        <Stat bg="primary" />
        <Stat bg="secondary" />
        <Stat bg="carton" />
        <Stat bg="lilac" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 mt-5">
        {/* <div className="card card-border bg-base-100 shadow lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts. Last
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div> */}
        <div className="shadow lg:col-span-2">
          <ScoreLineChart />
        </div>

        <Card>
          <h2 className="card-title">Card Title</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </Card>
        <div className="card card-border bg-base-100 shadow lg:row-span-2">
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts. Third
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card card-border bg-base-100 shadow lg:col-span-3">
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts. Last
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
