import Header from "@/components/Header";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const GetInvolvedPage = () => (
  <>
    <Helmet>
      <title>Get Involved |The Wise Trunk</title>

      <meta
        name="description"
        content="WiseTrunk Edu Foundation empowers young people with skills, resources, and support through peer-based learning programmes in Mumbai, India."
      />

      <meta name="keywords"
        content="wise trunk, education foundation, social emotional learning, youth programs, NGO India"
      />

      <meta property="og:title" content="The Wise Trunk" />
      <meta property="og:url" content="https://thewisetrunk.com" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/social-banner.png" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="md:mt-15">
        <GetInvolved />
      </main>
      <Footer />
    </div>
  </>
);

export default GetInvolvedPage;