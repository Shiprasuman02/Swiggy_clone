import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
    const { resInfo } = props;
    const { loggedInUser } = useContext(UserContext);


    const { name, avgRating, cuisines, costForTwo } = resInfo?.info;
    return (
        <div className="m-5 p-2 w-[210px] rounded-lg bg-gray-100 hover:bg-gray-200 ">
            <img className="rounded-lg" alt="res-logo" src={CDN_URL + resInfo.info.cloudinaryImageId} />
            <h3 className="font-bold py-3 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo} </h4>
            <h4>{resInfo.info.sla.deliveryTime} minutes</h4>
            <h4>User : {loggedInUser}</h4>
        </div>
    );
};

// Higher Order Component 

//input - RestaurantCard => RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};
export default RestaurantCard;