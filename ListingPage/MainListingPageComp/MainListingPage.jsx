import React, { useRef, useEffect, useState, useMemo } from "react";
import ListingPage from "../CompoListingPage/ListingPage";
import { FixedSizeList as List } from "react-window";

function MainListingPage(props) {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [serviceError, setServiceError] = useState(false);
  const [query, setQuery] = useState("India");
  const [queryPre, setQueryPre] = useState("");
  const [tatalSearch, setTatalSearch] = useState(0);

  useEffect(() => {
    console.log("use Effect Start===========>");
    const fetchData = async () => {
        console.log("use Effect fetchData===========>");
      //const response = await fetch(
     //`https://api.instantwebtools.net/v1/passenger?page=${currPage}&size=10`
      //);
      
      const response = await fetch(
        // `https://jsonplaceholder.typicode.com/comments?postId=5` f84fc31d 26022025-583452b5 25022025-592848ae
        `http://www.omdbapi.com/?apikey=592848ae&s=${query}&page=${currPage}&size=10`

        );
    
     // console.log("use Effect===========>" + response.json()); data.Search[0].Title
      const data = await response.json();
       

    //   console.log(data)
      console.log(`MyLogs inside fetchData service call data-> ${data}`);
      console.log(data, "<<<");
      if (data.Response && data.Response === "False") { //response.data.data.length
        console.log(`MyLogs MAKING setServiceError as TRUE and Returing FALSE----------------------->>>>>>`);
        setServiceError(true);
        setTatalSearch(0);
        return;
      }else{
        setServiceError(false);
      }
      setPrevPage(currPage);
      setQueryPre(query);
      query !== queryPre ? setUserList(data.Search) : setUserList([...userList, ...data.Search]);
      setTatalSearch(data.totalResults);
    };
    console.log(`MyLogs Before calling fetchData : serviceError->${serviceError} prevPage->${prevPage} currPage->${currPage} userList->${userList.length}`);
    console.log(`MyLogs Before calling fetchData : query->${query} queryPre->${queryPre}`);
    if ((!serviceError && prevPage !== currPage) || (!serviceError && query !== queryPre)) {
       console.log(`MyLogs calling fetchData YYYYYY`);
      fetchData();
    }else{
        console.log(`MyLogs Not calling fetchData NNNNN`);
    }

    if (query.length > 30) {
        console.log(`MyLogs calling fetchData YYYYYY`);
       fetchData();
     }else{
         console.log(`MyLogs Not calling fetchData NNNNN`);
     }

  }, [currPage, serviceError, prevPage, userList, query]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + (clientHeight) === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <>
    <NavBar className="fixed">
        <SearchBar query={query} setQuery={setQuery} setServiceError={setServiceError}></SearchBar>
        <NumResults userList={userList} tatalSearch = {tatalSearch}></NumResults>
    </NavBar>

    {/*<input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => {setQuery(e.target.value); setServiceError(false)}}
    />*/}
    { !serviceError ?
        <ListingPage
            onScroll={onScroll}
            listInnerRef={listInnerRef}
            userList={userList}
            
        /> : <div style={{minHeight:"100vh"}}><h2 className="font-bold text-5xl">Movie Not Found Please enter valid char for search or please try after sometine</h2></div>
    }
    </>
  );
}

export default MainListingPage;

function NavBar({ children }) {
    return (<nav className="nav-bar">
      <Logo></Logo>
      {children}
    </nav>
    );
}

function SearchBar({ query, setQuery, setServiceError }) {
    //e.target.value && e.target.value.length > 2 &&
    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => { console.log("Search text==========>>" + e.target.value); setQuery(e.target.value); setServiceError(false);}}
      />
    )
  }
  
  function Logo() {
    return (
      <div className="logo">
        <span role="img">📽️</span>
        <h1>Movie List</h1>
      </div>
    );
  }
  
  function NumResults({ userList,tatalSearch }) {
    return (
      <p className="num-results">
        Found <strong>{tatalSearch}</strong> results
      </p>
    );
  }
  

const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
        RowNo {index}
    </div>
);

const AllRows = () => userList.map((i, index) =>
    <div className="flex flex-col content-normal">
        <h3>Title: {i.Title}</h3>
        <h2>Year: {i.Year}</h2>
        <h2>Type: {i.Type}</h2>
        <h2>imdbID: {i.imdbID}</h2>
    </div>

     /*<List className="List" height={150} itemCount={10} itemSize={25} width={300}>
        {AllRows}
    </List>
    </>*/

);