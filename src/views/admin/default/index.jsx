import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import React, { useEffect, useState } from 'react';

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
      fetchDataFromBackend();
    }, []);
    const fetchDataFromBackend = async () => {
      try {
        // Get user_id from local storage
        const user_id = localStorage.getItem('user_id');
    
        // Make sure user_id is available before making the request
        if (!user_id) {
          console.error('User ID not found in local storage');
          return;
        }
    
        // Fetch data from backend with user_id in request headers
        const response = await fetch('http://localhost:5000/categories', {
          method:'POST', 
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({"user_id":user_id}), // body data type must match "Content-Type" header
        });
    
        // Handle response
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData.categories); 
          console.log('Data fetched:', jsonData);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">

        {data.map((category, index) => (
            <Widget
                key={index}
                subtitle={category}
            />
          ))}

        {/* <Widget
          icon={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT4j2Z4W5OWbDxV_fznNWY4Ajx9prcHFQ_IbujI37FqiWLGK72ZNOYh20iPRbDpC942Xk&usqp=CAU" alt="Business" className="h-12 w-12" />}
          subtitle={"Business"}
        />
        <Widget
          icon={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3arq6IXtvcLuDWzrkxBQSwGmTmCdCjVOilRDIFVLUw&s" alt="Politics" className="h-12 w-12" />}
          subtitle={"General"}
        />
        <Widget
          icon={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8SGE3wsUggKd7ejTkV3Rv8W-PtTjtCj-wbrRPeGwHZA&s" alt="Entertainment" className="h-12 w-12" />}
          subtitle={"Entertainment"}
        />
        <Widget
          icon={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWTqh7r91KJSOdqhU9_TNKJhHD20G14l5OmQPFRoiJr9PBANGUqv3iWwUyqM5qy_RNb4&usqp=CAU" alt="Sports" className="h-12 w-12" />}
          subtitle={"Sports"}
        />
        <Widget
          icon={<img src="https://www.shutterstock.com/image-vector/light-bulb-electronics-new-electronic-600nw-1921894430.jpg" alt="Technology" className="h-12 w-12" />}
          subtitle={"Technology"}
        />
        <Widget
          icon={<img src="https://png.pngitem.com/pimgs/s/678-6782268_health-icons-png-download-health-care-icon-png.png" alt="Health" className="h-12 w-12" />}
          subtitle={"Health"}
        />

        <Widget
            icon={<img src="https://png.pngitem.com/pimgs/s/678-6782268_health-icons-png-download-health-care-icon-png.png" alt="Health" className="h-12 w-12" />}
            subtitle={"Science"}
        /> */}
      </div>


      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
