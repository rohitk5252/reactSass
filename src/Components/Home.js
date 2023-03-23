import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { STATUSES } from "../store/features/newsSlice";
import { fetchNews } from "../store/features/newsSlice";
import Cookies from "js-cookie";

const Home = () => {
  const localUser = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const [searchQuery, setSearchQuery] = useState("")
  const { data: articles, status } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const handleSearch = () => {
      if(!searchQuery) return 
      console.log("seached")
      const searchApi = `http://localhost:4000/api/articles/${searchQuery}`
      console.log("seached", searchApi)

      dispatch(fetchNews([searchApi, token]));
  }

  const [newsApi, setNewsApi] = useState(
    "http://localhost:4000/api/articles/all"
  );


  useEffect(() => {
    if (localUser.username) {
      dispatch(fetchNews([newsApi, token]));
    }
  }, []);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>ERROR</h2>;
  }
 
  return (
    <div className="homepage">
      <div className="homeHead">
      {localUser.username && <h1>Welcome {localUser.username}</h1>}
      {!localUser.username && <p>Login First</p>}

      <div className="searchbar">
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search"/>
        <i onClick={handleSearch} class="fa-solid fa-magnifying-glass"></i>
      </div>
      </div>
      <div className="articleWrapper">

      {articles.map(
        ({
          _id,
          source,
          author,
          title,
          description,
          url,
          urlToImage,
          content,
          publishedAt,
        }) => {
          return (
              <div  key={_id} className="articleCard">
                <div className="articleHead">
                  <div>
                    <h1>{title}</h1> <span>By: {author}</span>
                  </div>
                  <div>
                    Originally published in <b>{source.name}</b>
                  </div>
                  <div>{publishedAt}</div>
                </div>
                <div className="articleBody">
                  <div className="image">{urlToImage}</div>
                  <img src="" alt="" />
                  <div className="description">{description}</div>
                  {/* <div className="email">{content}</div> */}
                </div>
                <a href={url} target="_blank">Read More</a>
              </div>
          );
        }
      )}
      </div>
    </div>
  );
};

export default Home;
