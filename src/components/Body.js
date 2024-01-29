import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
// import resList from "../utils/mockData";

const Body = () => {
    // Local State Variable - Super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

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

    };



    return (
        <div className="body">
            <div className="filter">
                <button className="filter-btn"
                    onClick={() => {

                        const filteredList = listOfRestaurants?.filter(
                            (res) => res.info.avgRating > 4
                        );
                        setListOfRestaurants(filteredList);

                    }}

                >
                    Top Rated Restaurant</button>
            </div>
            <div className="res-container">
                {listOfRestaurants?.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resInfo={restaurant} />
                ))}


            </div>
        </div>
    );
};

export default Body;