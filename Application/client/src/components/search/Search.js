import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AnimatedCard from "../motionComponents/AnimatedCard.js";

function Search({ spotify }) {
  const history = useHistory();
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState();
  const [sliderVal, setSliderVal] = useState(50);

  const searchSubmitHandler = (e) => {

    e.preventDefault();
    if (!spotify) {
      console.log("empty access token");
      return;
    }
    let artistIds = [];
    let str = "";
    spotify.getMyTopArtists().then(
      (data) => {
        for(let i = 0; i < 5; i++){
          const str = data.body.items[i].id
          artistIds.push(str)
      }
        str = artistIds.join(",");
        console.log(artistIds);
        spotify.getRecommendations({
          seed_artists: str,
          max_popularity: (sliderVal+5 < 100 ? sliderVal+5 : 100),
          min_popularity: (sliderVal-20 > 0 ? sliderVal-20 : 0),
          limit: 100
        }).then(
          (data) => {
            console.log(data);
            setResult(data.body.tracks);
            setIsLoading(false);
          },
          (err) => {
            console.error(err);
          }
        );
      }
    );
  };

  return (
    <>
      <div className="flex flex-col items-center ml-1 ">
        <div className="flex flex-col items-center p-2 m-2 min-w-full">
          <h1 className="text-slate-100 pb-2">How popular should it be?</h1>
          <h1 className="text-slate-100 pb-2">{sliderVal}% Popularity</h1>
          <div className="flex flex-col items-center">
            <input className="min-w-96" id="slider" type="range" onChange={(val) => setSliderVal(val.target.value)}/>
          </div>
          <form className="h-9" onSubmit={searchSubmitHandler}>
            <button className="bg-slate-100 text-slate-900 h-full p-1 rounded-3xl px-3 ">
              <img className="" src="search.svg" width={12} alt="search" />
            </button>
          </form>
        </div>
        <div className="  min-h-3/4 min-w-full flex items-center justify-center ">
          {isLoading ? (
            ""
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 m-w-full sm:w-3/4 lg:gird-cols-7 gap-6">
              {result.map((item) => {
                let imgUrl;
                if (!item.album.images[0]) {
                  imgUrl = "playlist.png";
                } else {
                  imgUrl = item.album.images[0].url;
                }
                return (
                  //if you want an on click, put it in this divs properties
                  <div
                    className="flex justify-center"
                    key={item.id}
                  >
                    <AnimatedCard>
                      <div className=" flex flex-col items-center cursor-pointer justify-between w-28 shadow-md rounded-lg shadow-indigo-950 bg-blue-950">
                        <img className="rounded-md self-center" src={imgUrl} alt="album" width={100} />
                        <h1 className="text-slate-300 text-xs font-semibold">{item.name}</h1>
                        <h1 className="text-slate-300 text-xs font-semibold">by {item.artists[0].name}</h1>
                      </div>
                    </AnimatedCard>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Search;
