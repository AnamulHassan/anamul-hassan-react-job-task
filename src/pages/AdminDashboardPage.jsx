import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MkdSDK from '../utils/MkdSDK';
import Card from './Card';
import Navbar from './Navbar';

const AdminDashboardPage = () => {
  let sdk = new MkdSDK();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      sdk.setTable('video');
      const data = await sdk.callRestAPI(
        {
          payload: {},
          page: 1,
          limit: 10,
        },
        'GET'
      );
      setData(data.list);
    };
    fetchData();
  }, []);
  // console.log(data);
  return (
    <>
      {data?.length > 0 ? (
        <div className="w-full flex items-center flex-col bg-[#111111] h-screen ">
          <Navbar />
          <div className="w-[1216px] flex justify-between items-center mt-[92px]">
            <h2 className="text-[40px] font-thin leading-[48px]">
              Today&#39;s leaderboard
            </h2>
            <div className="flex items-center leading-5 justify-center text-base font-thin bg-[#1D1D1D] w-[418px] h-[56px] rounded-2xl">
              <p>30 May 2022</p>
              <span className="block w-1 h-1 rounded-full bg-[#696969] ml-2 mr-[26px] "></span>
              <p className="bg-[#9BFF00] py-1 px-[10px] uppercase text-[#000000] rounded-lg text-[14px] leading-[16.94px]">
                Submissions Open
              </p>
              <span className="block w-1 h-1 leading-5 rounded-full bg-[#696969]  ml-[13px] mr-4 "></span>
              <p>11:24</p>
            </div>
          </div>

          <div className="w-[1216px] flex justify-between items-center">
            <table className="w-full">
              <thead>
                <tr className="flex justify-between items-center text-base font-thin px-1 my-2">
                  <th className="w-1/12 text-center">#</th>
                  <th className="w-5/12">Title</th>
                  <th className="w-2/12">Author</th>
                  <th className="">Most Liked</th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                {data.map((singleData, index) => (
                  <Card
                    index={index}
                    key={singleData.id}
                    singleData={singleData}
                  ></Card>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default AdminDashboardPage;
