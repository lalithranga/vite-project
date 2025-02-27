import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Product() {
    const [product, setProduct] = useState([]);
    const [productLoadeer, setProductLoadeer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (!productLoadeer) {
            const token = localStorage.getItem("token");
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => {
                    setProduct(res.data);
                    setProductLoadeer(true);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }, [productLoadeer]);

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
        axios.delete(`${import.meta.env.VITE_BACKEND_UR}/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setProduct(product.filter(item => item.key !== id));
            })
            .catch(err => console.error(err));
    };

    const handleEdit = (id) => {
        alert(`Edit product with key: ${id}`);
    };

    return (
        <div className="flex flex-col items-center ">
            {!productLoadeer && <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin bg-0 w-[100px] h-[100px] "></div>}
            <div className="container mx-auto mt-8">

                {productLoadeer && <table className="min-w-full leading-normal border border-gray-300">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Key</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Name</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Price</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Description</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Category</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Dimensions</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((item, index) => (
                            <tr key={item.key} className="border-b border-gray-300">
                                <td className="px-5 py-4 bg-white text-sm">{item.key}</td>
                                <td className="px-5 py-4 bg-white text-sm">{item.name}</td>
                                <td className="px-5 py-4 bg-white text-sm">{item.price}</td>
                                <td className="px-5 py-4 bg-white text-sm">{item.description}</td>
                                <td className="px-5 py-4 bg-white text-sm">{item.category}</td>
                                <td className="px-5 py-4 bg-white text-sm">{item.dimensions}</td>
                                <td className="px-5 py-4 bg-white text-sm">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700"
                                        onClick={() => {
                                            navigate(`/admin/product/edit`, { state: item })
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                        onClick={() => handleDelete(item.key)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    );
}
