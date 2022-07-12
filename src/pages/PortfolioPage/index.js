import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { TickerTape } from "react-tradingview-embed";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./styles.css";
import AssetForm from "./AssetForm";

export default function PortfolioPage() {
  const [postAssetMode, setPostAssetMode] = useState(false);

  return (
    <>
      <div className="portfolioPageContainer">
        <div className="portfolioPageContent">
          <Card
            text="white"
            bg="dark"
            style={{ width: "50rem", color: "black" }}
          >
            <Card.Body>
              <div className="cardTitles">
                <div className="currentValue">
                  <Card.Subtitle className="mb-2 text-muted">
                    Current Value
                  </Card.Subtitle>
                  <Card.Title>$19,462.48</Card.Title>
                </div>
                <div className="changeInPercentage">
                  <Card.Subtitle className="mb-2 text-muted">
                    24h change
                  </Card.Subtitle>
                  <Card.Title>25%</Card.Title>
                </div>
              </div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Price</th>
                    <th>Holdings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BTC</td>
                    <td>$19,462.48</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
            <Button
              className="addAssetButton"
              variant="primary"
              onClick={() => setPostAssetMode(!postAssetMode)}
            >
              {postAssetMode ? "Close" : "Add Transaction"}
            </Button>
            <div className="addAsset">
              {postAssetMode ? <AssetForm /> : null}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
