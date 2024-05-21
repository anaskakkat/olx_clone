import { createContext, useState } from "react";


 export const PostContext=createContext(null)



function Posts({children}){
const[postDetails,setPostDetails] =useState()
// console.log("cotext::",postDetails);

    return (

        <PostContext.Provider value={{postDetails,setPostDetails}}>
            {children}
        </PostContext.Provider>
    )
}

export default Posts