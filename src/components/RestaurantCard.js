import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resInfo } = props;

    const { name, avgRating, cuisines, costForTwo } = resInfo?.info;
    return (
        <div className="m-5 p-2 w-[210px] rounded-lg bg-gray-100 hover:bg-gray-200 ">
            <img className="rounded-lg" alt="res-logo" src={CDN_URL + resInfo.info.cloudinaryImageId} />
            <h3 className="font-bold py-3 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo} </h4>
            <h4>{resInfo.info.sla.deliveryTime} minutes</h4>
        </div>
    );
};

export default RestaurantCard;