import React, {useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../store/PostContext";

const CardLists = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  console.log(products);
const {setPostDetails} =useContext(PostContext)


  useEffect(() => {
    getDocs(collection(db, "products"))
      .then((products) => {
        const productsData = products.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setProducts(productsData);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <h1 className="text-2xl font-semibold container mx-auto my-2 ">
        Fresh recommendations
      </h1>
      <div className="mx-32 grid md:grid-cols-2 lg:grid-cols-4 my-5 ">
        {products.map((product) => (
          <div 
            onClick={() => {
              setPostDetails(product);
              navigate(`/view`);
            }}
            key={product.id}
            className=" w-11/12  my-2 bg-white border border-black rounded-md shadow cursor-pointer"
          >
            <img className="p-2" src={product.imageUrl} alt="" />
            <div className="p-2 rounded-bl-md  border_card overflow-hidden ">
              <h5 className=" text-xl font-medium ">₹ {product.price}</h5>
              <p className="my-1 text-sm whitespace-nowrap overflow-hidden text-ellipsis ">
                {product.name}
              </p>
              <div className="flex justify-between">
                <p className=" text-sm ">{product.category}</p>{" "}
                <div>
                  <p className=" text-sm ">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardLists;
