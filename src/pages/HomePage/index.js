import { TickerTape } from "react-tradingview-embed";
import "./styles.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import backgroundImage from "./AssetsBalanceBackground.png";

export default function HomePage() {
  return (
    <>
      <TickerTape />
      <div className="header-section">
        <div className="header-content">
          <h1 className="homepageTitle">
            Why should you create an investment portfolio?
          </h1>
          <br></br>
          <p>
            If you save up over many years, you won't earn enough interest to
            cover the increasing cost of living. When your cash fails to keep up
            with inflation, it loses relative value and you'll end up with less
            buying power. Investing ensures present and future financial
            security. It allows you to grow your wealth and at the same time
            generate inflation-beating returns. You also benefit from the power
            of compounding.
          </p>
          <p className="homepageParagraph">
            Your portfolio might include any combination of financial assets,
            such as stocks, cryptocurrencies, bonds, mutual funds and
            exchange-traded funds (ETFs). Keeping track of all these assets can
            be a challenging, if not daunting, task. It's important to routinely
            know what’s going on with all your investments—not just once a year
            when you get your tax forms.
          </p>
          <Link to="/signup">
            <Button variant="primary">Sign up to create a new portfolio</Button>
          </Link>
        </div>
        <img
          className="header-image"
          src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="plant"
          height="450rem"
        ></img>
      </div>
    </>
  );
}
