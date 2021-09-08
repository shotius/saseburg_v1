import ActiveUsers from "src/components/organizms/ActiveUsers";
import React from "react";
import Sidebar from "../components/shared/molecules/Sidebar";
import Stories from "../components/shared/molecules/Stories";
import Header from "../components/organizms/Header";
import PostsOnHome from "../components/organizms/PostsOnHome";
import { HomeTemplate } from "../components/templates/HomeTemplate";

const Home: React.FC = () => {
  return (
    <HomeTemplate
      Sidebar={Sidebar}
      Posts={PostsOnHome}
      Header={Header}
      Stories={Stories}
      ActiveUsers={ActiveUsers}
    />
  );
};
export default Home;
