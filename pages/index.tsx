import type { NextPage } from "next";
import { PrincipalLayout } from "../components/layouts";
import { Principal } from "../components/ui";

// import PrincipalLayout from '../components/layouts'

const Home: NextPage = () => {
  return (
    <PrincipalLayout
      title="Alvcomer ecommerce"
      description="Alvcomer productos militares y otros"
    >
      <Principal />
    </PrincipalLayout>
  );
};

export default Home;
