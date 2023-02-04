import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MkdSDK from '../utils/MkdSDK';
import Card from './Card';
import Navbar from './Navbar';
import {
  FaAngleDoubleLeft,
  FaAngleDown,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import { useCallback } from 'react';
import update from 'immutability-helper';

const AdminDashboardPage = () => {
  let sdk = new MkdSDK();
  const [cards, setCards] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      sdk.setTable('video');
      const data = await sdk.callRestAPI(
        {
          payload: {},
          page: pageCount,
          limit: 10,
        },
        // 'GET'
        'PAGINATE'
      );
      // console.log(data);
      setTotalPage(Math.ceil(+data.total / 10));
      setCards(data.list);
    };
    fetchData();
  }, [pageCount]);
  // console.log([...Array(totalPage).keys()]);
  // console.log(Math.min([...Array(totalPage).keys()]) + 1);
  // console.log();

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards(prevCards =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const renderCard = useCallback((singleData, index, pageCount) => {
    return (
      <Card
        moveCard={moveCard}
        index={index}
        key={singleData.id}
        singleData={singleData}
        pageCount={pageCount}
      ></Card>
    );
  }, []);

  return (
    <>
      {cards?.length > 0 ? (
        <div className="w-full flex items-center flex-col bg-[#111111] h-screen overflow-y-scroll py-12">
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
                <tr className="w-full flex justify-start items-center text-[#666666] text-base font-thin px-1 my-2">
                  <th className="w-1/12 text-center">#</th>
                  <th className="w-5/12 flex items-center justify-start">
                    <span>Title/Image</span>
                  </th>
                  <th className="w-2/12 flex items-center justify-start">
                    <span>Avatar/Author</span>
                  </th>
                  <th className=" w-4/12 flex items-center justify-end">
                    <span></span>
                    Most Liked{' '}
                    <FaAngleDown className="text-[#696969] ml-[5px] text-xl" />
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                {cards.map((singleData, index) =>
                  renderCard(singleData, index, pageCount)
                )}
              </tbody>
            </table>
          </div>
          {+pageCount > 0 && (
            <div className="space-x-3 my-12 text-lg font-semibold flex items-center">
              <button
                disabled={
                  pageCount === Math.min(...[...Array(totalPage).keys()]) + 1
                }
                onClick={() => setPageCount(pageCount - 1)}
                className="border-2 border-[#9BFF00] py-[9px] px-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-0 cursor-pointer duration-300 disabled:border-transparent disabled:bg-opacity-20 disabled:opacity-50"
              >
                <FaAngleDoubleLeft />
              </button>
              {[...Array(totalPage).keys()].map(page => (
                <button
                  key={page}
                  onClick={() => setPageCount(page + 1)}
                  className={`${
                    pageCount === page + 1
                      ? 'bg-[#9BFF00] bg-opacity-100 text-[#696969]'
                      : ''
                  } border-2 border-[#9BFF00] py-1 px-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-0 cursor-pointer duration-300 `}
                >
                  {page + 1}
                </button>
              ))}
              <button
                disabled={
                  pageCount === Math.max(...[...Array(totalPage).keys()]) + 1
                }
                onClick={() => setPageCount(pageCount + 1)}
                className="border-2 border-[#9BFF00] py-[9px] px-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-0 cursor-pointer duration-300 disabled:border-transparent disabled:bg-opacity-20 disabled:opacity-50"
              >
                <FaAngleDoubleRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Nothing to show</h2>
        </div>
      )}
    </>
  );
};

export default AdminDashboardPage;
