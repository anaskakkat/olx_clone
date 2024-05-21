import React, { useContext, useEffect, useState } from "react";
import "./viewPost.css";
import Navbar from "../components/Navbar";
import { PostContext } from "../store/PostContext";
import { FirebaseContext } from "../store/FirebaseContext";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const ViewPost = () => {
  const [userDetails, setUserDetails] = useState(0);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        try {
          const q = query(
            collection(db, "users"),
            where("uid", "==", postDetails.userId)
          );

          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.log("No matching documents for userId:", postDetails.userId);
            return;
          }

          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [postDetails]);

  useEffect(() => {
    console.log("userDetails:", userDetails);
    // Place any logic that depends on userDetails being updated here
  }, [userDetails]);

  return (
    <>
    {console.log(userDetails)}
      <Navbar />
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img src={postDetails.imageUrl} alt={postDetails.title} />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9;{postDetails.price}</p>
            <span>{postDetails.title}</span>
            <p>{postDetails.category}</p>
            <span>{new Date(postDetails.createdAt).toDateString()}</span>
          </div>
          <div className="contactDetails">
            <p>Seller details</p>
            {userDetails && (
              <>
                <p>{userDetails.userName.toUpperCase() || "No name"}</p>
                <p>{userDetails.phone || "No phone number"}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPost;
