import React, { useContext, useState } from "react";
import "./create.css";
import Navbar from "../components/Navbar";
import { AuthContext, FirebaseContext } from "../store/FirebaseContext";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setname] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
const navigate=useNavigate()


  const handleSubmit = async () => {
    if (!name || !category || !price || !image) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const storage = getStorage();
      const filePath = `images/${name}-${Date.now()}`; // Ensure unique file path
      const fileRef = ref(storage, filePath);

      //   uploadBytes(fileRef, image)
      //     .then((response) =>{
      //         console.log(response)
      //     } )
      //     .catch((err) => console.log("err: ", err));

      const uploadResult = await uploadBytes(fileRef, image);
      console.log("Upload result:", uploadResult);

      const imageUrl = await getDownloadURL(fileRef);
      // Store the metadata in Firestore
      const docRef =  addDoc(collection(db, "products"), {
        name,
        category,
        price,
        imageUrl,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });
      console.log("Document written with ID:", docRef.id);
      console.log("Product created successfully");
      navigate('/')

      //   alert("Product created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col justify-center items-center h-screen flex-1">
  <div className="flex flex-col justify-center items-center border-2 mt-8 p-4">
    <label htmlFor="name" className="mb-2">Name</label>
    <input
      className="input mb-4 border rounded px-3 py-2 w-full"
      type="text"
      id="name"
      name="name"
      defaultValue="John"
      value={name}
      onChange={(e) => setname(e.target.value)}
    />

    <label htmlFor="category" className="mb-2">Category</label>
    <input
      className="input mb-4 border rounded px-3 py-2 w-full"
      type="text"
      id="category"
      name="category"
      defaultValue="John"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    />

    <label htmlFor="price" className="mb-2">Price</label>
    <input
      className="input mb-4 border rounded px-3 py-2 w-full"
      type="number"
      id="price"
      name="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />

    {image ? (
      <img
        alt="Posts"
        className="mb-4 w-48 h-48 object-cover"
        src={image ? URL.createObjectURL(image) : ""}
      />
    ) : null}

    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-4" />

    <button onClick={handleSubmit} className="uploadBtn bg-green-950 hover:bg-green-700-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Upload and Submit
    </button>
  </div>
</div>


  </>
  
  );
};

export default Create;
