import About from "./components/About";
import Banner from "./components/Banner";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Partner from "./components/Partner";
import Portfolio from "./components/Portfolio";
import Resume from "./components/Resume";
import Service from "./components/Service";
import Testimonial from "./components/Testimonial";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <About />
      <Service />
      <Resume />
      <Portfolio />
      <Testimonial />
      <Partner />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
