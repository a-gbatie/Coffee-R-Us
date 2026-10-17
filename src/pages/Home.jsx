import { Link } from "react-router-dom";
import CoffeeAssistant from "../components/CoffeeAssistant";
import "../styles/Home.css";

function Home() {
  return (
    <main>
      {/* Home page hero section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">Freshly Roasted. Deliciously Refreshing. Made for You.</p>

          <h1>Better Coffee, Better Mornings.</h1>

          <p className="hero-description">
            Discover rich flavors, quality beans, and your next
            favorite cup of coffee, latte, or smoothie. 
          </p>

          <Link to="/shop" className="hero-button">
            Shop Our Drinks
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="/images/headerimg.jpg"
            alt="Coffee and matcha"
          />
        </div>
      </section>

      {/* AI assistant section */}
      <CoffeeAssistant />
    </main>
  );
}

export default Home;