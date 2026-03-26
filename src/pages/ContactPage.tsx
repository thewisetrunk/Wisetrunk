import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact | The Wise Trunk</title>

      <meta
        name="description"
        content="WiseTrunk Edu Foundation empowers young people with skills, resources, and support through peer-based learning programmes in Mumbai, India."
      />

      <meta name="keywords"
        content="wise trunk, Seos - social emotional learning in Mumbai,  Life skills for youth in Mumbai, SEL in Mumbai, Workshops for youth, SEL based NGOs in India"
      />

      <meta property="og:title" content="The Wise Trunk" />
      <meta property="og:url" content="https://thewisetrunk.com" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/social-banner.png" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  </>
);

export default ContactPage;