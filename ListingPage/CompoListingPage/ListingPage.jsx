import { React } from "react";

function ListingPage({ onScroll, listInnerRef, userList }) {
  return (
    <div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "80vh", overflowY: "auto", minHeight:"80vh"}}
      >
        {userList.map((item, index) => {
          let classNameNew = index%2==0 ? "flex  flex-row gap-10 border-2 border-black  bg-neutral-300":" flex  flex-row gap-10 border-2  border-black  bg-neutral-50";
          return (
            <div key={index} className={classNameNew}>
              <div className="flex flex-col w-25" >
                <img style={{ height: "70px", with: "40px" }} src={item.Poster} alt={`N/A`} />
              </div>
              <div className="flex flex-col w-100 content-normal" >
                <div className="flex flex-row">
                  <p className="font-bold text-black text-2xl" >Title :</p>
                  <p className="font-ligh text-black text-2xl"> {item.Title}</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-bold text-black text-2xl" >Year :</p>
                  <p className="font-ligh text-black text-2xl"> {item.Year}</p>
                </div>
              </div>
              <div className="flex flex-col w-200 content-normal">
                <div className="flex flex-row">
                  <p className="font-bold text-black text-2xl" >Type :</p>
                  <p className="font-ligh text-black text-2xl"> {item.Type}</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-bold text-black text-2xl" >IMDB ID :</p>
                  <p className="font-ligh text-black text-2xl"> {item.imdbID}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListingPage;

