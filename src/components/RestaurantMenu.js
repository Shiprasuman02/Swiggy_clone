// import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
// import { MENU_API } from "../utils/constants";


const RestaurantMenu = () => {
    //  const [resData, setResData] = useState(null);

    const { resId } = useParams();


    /*   useEffect(() => {
           fetchMenu();
       }, []);
   
       const fetchMenu = async () => {
           const data = await fetch(MENU_API + resId);
           const json = await data.json();
   
   
           setResData(json.data);
   
       };*/
    const resData = useRestaurantMenu(resId);

    if (resData === null) return
    <Shimmer />;


    const { name, cuisines, costForTwoMessage } = resData?.cards[0]?.card?.card?.info;

    const { itemCards } = resData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    //   console.log(resData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
    console.log(itemCards);
    return (

        <div className="menu">
            <h1>{name}</h1>
            <p>
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            <h2>Menu</h2>
            <ul>
                {itemCards.map((item) => (
                    <li key={item.card.info.id}>
                        {item.card.info.name}- {"Rs."}
                        {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default RestaurantMenu;
