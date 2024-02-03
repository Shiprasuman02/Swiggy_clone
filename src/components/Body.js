import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
// import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
    // Local State Variable - Super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);


    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    //  console.log("Body Rendered", listOfRestaurants);

    useEffect(() => {
        fetchData();

    }, []);
    //Normal JS Variable
    //  let listOfRestaurants=null;
    const fetchData = async () => {

        const data = await fetch("https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();

        console.log(json);

        //optional chaining
        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) return (
        <h1>
            Looks like you're offline!! Please check your internet connection;
        </h1>
    );

    const { loggedInUser, setUserName } = useContext(UserContext);

    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (



        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input
                        type="text" className="border border-solid border-black" value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }} />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
                        onClick={() => {
                            //Filter the restaurant cards and update the UI
                            //searchText
                            console.log(searchText);

                            const filteredRestaurant = listOfRestaurants.filter(
                                (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );
                            setFilteredRestaurant(filteredRestaurant);

                        }}
                    >
                        Search
                    </button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <button
                        className="px-4 py-2 bg-gray-100 rounded-lg"
                        onClick={() => {

                            const filteredList = listOfRestaurants?.filter(
                                (res) => res.info.avgRating > 4
                            );
                            setListOfRestaurants(filteredList);

                        }}

                    >
                        Top Rated Restaurant
                    </button>
                    <div className="m-10">
                        <label >UserName : </label>
                        <input className="border border-black p-2"
                            value={loggedInUser}
                            onChange={(e) => setUserName(e.target.value)} />
                    </div>
                </div>

            </div>
            <div className="flex flex-wrap">
                {filteredRestaurant.map((restaurant) => (
                    <Link
                        key={restaurant.info.id}
                        to={"/restaurants/" + restaurant.info.id}
                    >
                        {restaurant.info.promoted ? (
                            <RestaurantCardPromoted resInfo={restaurant} />
                        ) : (
                            <RestaurantCard resInfo={restaurant} />
                        )}

                    </Link>
                ))}


            </div>
        </div>
    );
};

export default Body;