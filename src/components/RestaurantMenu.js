// import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
// import { MENU_API } from "../utils/constants";


const RestaurantMenu = () => {
    //  const [resData, setResData] = useState(null);

    const { resId } = useParams();

    const dummy = "Dummy Data";
    /*   useEffect(() => {
           fetchMenu();
       }, []);
   
       const fetchMenu = async () => {
           const data = await fetch(MENU_API + resId);
           const json = await data.json();
   
   
           setResData(json.data);
   
       };*/
    const resData = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

    if (resData === null) return
    <Shimmer />;


    const { name, cuisines, costForTwoMessage } = resData?.cards[0]?.card?.card?.info;

    const { itemCards } = resData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    console.log(resData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
    //  console.log(itemCards);

    const categories = resData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.["card"]?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    // console.log(categories);

    return (

        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            {/* <h2>Menu</h2>
            <ul>
                {itemCards.map((item) => (
                    <li key={item.card.info.id}>
                        {item.card.info.name}- {"Rs."}
                        {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                    </li>

                ))}
            </ul>  */}
            {/** categories accordions */}
            {categories.map((category, index) => (
                // controlled component
                <RestaurantCategory
                    key={category?.card?.card?.title}
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false}
                    setShowIndex={() => setShowIndex(index)}
                    dummy={dummy}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;
