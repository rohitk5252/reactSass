import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { STATUSES } from "../store/features/newsSlice";
import { fetchNews } from "../store/features/newsSlice";
import Cookies from "js-cookie";

const Home = () => {
  const localUser = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: articles, status } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const handleCheckboxFilter = (e) => {
    console.log("lll")
    if(e.target.checked) {
      const newsOutletFilter = e.target.labels[0].innerText
      const searchApi = `http://localhost:4000/api/articles/outlet/${newsOutletFilter}`;
      dispatch(fetchNews([searchApi, token]));
    }
  }
  const handleSearch = () => {
    if (!searchQuery) return;
    const searchApi = `http://localhost:4000/api/articles/${searchQuery}`;
    dispatch(fetchNews([searchApi, token]));
  };

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
        {!localUser.username && <p>Login First</p>}
        <div className="sourceFiler">
          <div>
            <input type="checkbox" id="ht" onChange={(e) => handleCheckboxFilter(e)}/>
            {/* <input type="checkbox" id="ht" onChange={(e) => console.log(e.target.checked)}/> */}
            {/* <input type="checkbox" id="ht" onChange={(e) => console.log(e.target.labels[0].innerText)}/> */}
            <label htmlFor="ht">Hindustan Times</label>
          </div>
          <div>
            <input type="checkbox" id="te" onChange={(e) => handleCheckboxFilter(e)}/>
            <label htmlFor="te">Tech Explorist</label>
          </div>
          <div>
            <input type="checkbox" id="ie" onChange={(e) => handleCheckboxFilter(e)}/>
            <label htmlFor="ie">The Indin Express</label>
          </div>
          <div>
            <input type="checkbox" id="lm" onChange={(e) => handleCheckboxFilter(e)}/>
            <label htmlFor="lm">Live Mint</label>
          </div>
        </div>
        <div className="searchbar">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search"
          />
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
              <div key={_id} className="articleCard">
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
                <a href={url} target="_blank">
                  Read More
                </a>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Home;
