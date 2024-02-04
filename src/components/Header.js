import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";


const Header = () => {
    const [btnNameReact, setBtnNameReact] = useState("Login");
    //  console.log("Header render");

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);
    //  console.log(loggedInUser);

    //if no dependency array=> useEffect is called on every component render 
    //if dependency array is empty = [] => useEffect is called on initial render(just once)
    //if dependency array is [btnNameReact] => called everytime btnNameReact is updated
    //   useEffect(() => {
    //     console.log("useEffect called");
    // }, [btnNameReact]);

    // Subscribing to the store using a Selector

    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    return (
        <div className="flex justify-between bg-pink-100 shadow-lg ">
            <div className="logo-container p-0.5 ">
                <img className="w-20" src={LOGO_URL}


                    alt=" not found" />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online Status: {onlineStatus ? "✅" : "❌"}
                    </li>
                    <li className="px-4">
                        <Link to="/"> Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about"> About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-4 font-bold text-xl">
                        <Link to="/cart">Cart - ({cartItems.length} items)</Link>
                    </li>
                    <button className="login"
                        onClick={() => {
                            btnNameReact === "Login"
                                ? setBtnNameReact("Logout")

                                : setBtnNameReact("Login");
                        }}
                    >
                        {btnNameReact}
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default Header;