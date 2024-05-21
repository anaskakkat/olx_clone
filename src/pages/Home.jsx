import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CardLists from "../components/CardLists";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Banner />
      <CardLists />
      <Footer />
    </>
  );
};

export default Home;
