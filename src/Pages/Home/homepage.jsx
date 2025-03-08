import { Routes, Route } from "react-router-dom"
import Header from '../../Component/Header'
import Home from './Home'
import Contact from './Contact'
import Error from "./Error"

import ItemPage from "./itemPage"
import ProductPage from "./productPage"
import ProductView from "./poductView"
import CartPage from "./cartPage"




export default function HomePage() {


    return (
        <div>


            <Header />

            <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center ">
                <Routes path="/*" >

                    <Route path="/" element={<Home/>} />  
                   
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="*" element={<Error/>} />
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/item" element={<ItemPage/>}/>
                    <Route path="/products/:key" element={<ProductView/>}/>
                    <Route path="/cart" element={<CartPage/>} />

                   
                </Routes>



            </div>


        </div>

    )
}