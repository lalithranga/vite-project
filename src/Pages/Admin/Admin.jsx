import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgAdd } from "react-icons/cg";
import AddProduct from "./addProduct";
import Product from "./product";
import UpdateProduct from "./updateProduct";



export default function Admin() {

    


    return (
        <div className="w-full h-screen flex">

<div className="w-[250px] h-full bg-blue-100 flex flex-col p-4">
    <Link to="/admin/booking" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center mb-4 mt-2">Dashboard</Link>
    <Link to="/admin/user" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center mb-4">Users</Link>
    <Link to="/admin/product" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center mb-4">Product</Link>
    <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center mb-4">Bookings</button>
</div>

            <div className="w-[calc(100%-250px)] h-full relative" >
           <Link to="/admin/AddProduct"><CgAdd className="absolute right-4 bottom-6 text-[60px] hover:text-blue-600 hover:text-7xl " /></Link> 

            <Routes>
                <Route path="/AddProduct/" element={<AddProduct/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/product/edit" element={<UpdateProduct/>}/>
                
                


            </Routes>
            </div>

          
        </div>
    )
}