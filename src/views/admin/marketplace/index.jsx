import React, { useEffect, useState } from 'react';
import NftCard from "components/card/NftCard";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import TopCreatorTable from "./components/TableTopCreators";

const Marketplace = () => {
  const [news, setNews] = useState([]);
  const [cateNews, setcateNews] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [cate, setcate] = useState('');

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
  
      // Fetch data from backend with user_id in request body
      const response = await fetch('http://localhost:5000/top_headlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user_id": user_id })
      });
  
      // Handle response
      if (response.ok) {
        const jsonData = await response.json();
        setNews(jsonData.articles); 
        console.log('Data fetched:', jsonData.articles);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Group articles by category
  const groupedNews = news.reduce((acc, article) => {
    const category = article.category.charAt(0).toUpperCase() + article.category.slice(1); // Capitalize first letter of category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {});

  const toggleShowCategory = async (category) => {
    setShowCategory(!showCategory);
    setcate(category.toLowerCase())
    if (category != null) {
      try {
        const user_id = localStorage.getItem('user_id');
        const response = await fetch('http://localhost:5000/cate_post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "user_id": user_id, "category": category.toLowerCase() })
        });
        if (response.ok) {
          const jsonData = await response.json();
          setcateNews(jsonData.categry_articles);
          console.log('Data fetched:', jsonData.categry_articles);
          // Handle the fetched data here
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        

<div>
  {showCategory ? (    
    <>
    <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            {cate} {/* Display category name */}
          </h4>
          <hr className=" border-b border-navy-700 dark:border-white" /> {/* Full-width underline */}
          <button onClick={() => toggleShowCategory(null)} className="text-brand-500 font-medium hover:underline focus:outline-none">
            Back
          </button>
        </div>
    <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {cateNews.map((article, index) => (
            <NftCard
              key={index}
              title={article.title}
              author={article.source.name}
              image={article.urlToImage}
              description={article.description}
              url={article.url}
            />
          ))}
        </div>
      
    </>
  ) : (
    Object.entries(groupedNews).map(([category, articles]) => (
      <div key={category}>
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            {category} {/* Display category name */}
          </h4>
          <hr className=" border-b border-navy-700 dark:border-white" /> {/* Full-width underline */}
          <button onClick={() => toggleShowCategory(category)} className="text-brand-500 font-medium hover:underline focus:outline-none">
            Read More
          </button>
        </div>
        {/* NFTs trending card for each category */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {articles.map((article, index) => (
            <NftCard
              key={index}
              title={article.title}
              author={article.source.name}
              image={article.urlToImage}
              description={article.description}
              url={article.url}
            />
          ))}
        </div>
      </div>
    ))
  )}
</div>


      </div>

      {/* right side section */}
      {/* Include your TopCreatorTable and HistoryCard components here */}
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
      </div>
    </div>
  );
};

export default Marketplace;
