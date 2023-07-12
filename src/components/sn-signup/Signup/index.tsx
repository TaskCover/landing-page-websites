import { memo } from "react";
import MainSection from "./MainSection";
import Wrapper from "./Wrapper";
import Banner from "./Banner";

const Signup = () => {
  return (
    <Wrapper>
      <MainSection />
      <Banner />
    </Wrapper>
  );
};

export default memo(Signup);
