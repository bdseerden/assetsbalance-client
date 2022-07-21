import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./styles.css";
import AssetForm from "./AssetForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHoldingsById,
  fetchBtcInfo,
  fetchEthInfo,
  fetchLtcInfo,
  fetchXrpInfo,
  fetchAaplInfo,
  fetchAbnbInfo,
  fetchAmdInfo,
  fetchAmznInfo,
} from "../../store/user/actions";
import {
  selectHoldings,
  selectBtcInfo,
  selectEthInfo,
  selectLtcInfo,
  selectXrpInfo,
  selectAaplInfo,
  selectAbnbInfo,
  selectAmdInfo,
  selectAmznInfo,
  selectToken,
} from "../../store/user/selectors";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function PortfolioPage() {
  const [postAssetMode, setPostAssetMode] = useState(false);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const { id } = useParams();
  const BTC = "BTC";
  const ETH = "ETH";
  const LTC = "LTC";
  const XRP = "XRP";
  const AAPL = "AAPL";
  const ABNB = "ABNB";
  const AMD = "AMD";
  const AMZN = "AMZN";

  const holding = useSelector(selectHoldings);
  const btcInfo = useSelector(selectBtcInfo);
  const ethInfo = useSelector(selectEthInfo);
  const ltcInfo = useSelector(selectLtcInfo);
  const xrpInfo = useSelector(selectXrpInfo);
  const aaplInfo = useSelector(selectAaplInfo);
  const abnbInfo = useSelector(selectAbnbInfo);
  const amdInfo = useSelector(selectAmdInfo);
  const amznInfo = useSelector(selectAmznInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(fetchHoldingsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchBtcInfo(BTC));
  }, [dispatch, BTC]);

  useEffect(() => {
    dispatch(fetchEthInfo(ETH));
  }, [dispatch, ETH]);

  useEffect(() => {
    dispatch(fetchLtcInfo(LTC));
  }, [dispatch, LTC]);

  useEffect(() => {
    dispatch(fetchXrpInfo(XRP));
  }, [dispatch, XRP]);

  useEffect(() => {
    dispatch(fetchAaplInfo(AAPL));
  }, [dispatch, AAPL]);

  useEffect(() => {
    dispatch(fetchAbnbInfo(ABNB));
  }, [dispatch, ABNB]);

  useEffect(() => {
    dispatch(fetchAmdInfo(AMD));
  }, [dispatch, AMD]);

  useEffect(() => {
    dispatch(fetchAmznInfo(AMZN));
  }, [dispatch, AMZN]);

  const assetAmount = holding.holdings;

  function refreshPage() {
    setTimeout(function () {
      window.location.reload();
    }, 300);
  }

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
                  <Card.Title>
                    $
                    {!ethInfo ||
                    !btcInfo ||
                    !ltcInfo ||
                    !xrpInfo ||
                    !aaplInfo ||
                    !abnbInfo ||
                    !amdInfo ||
                    !amznInfo
                      ? null
                      : (
                          assetAmount[4].amount * btcInfo.result.price +
                          assetAmount[5].amount * ethInfo.result.price +
                          assetAmount[7].amount * ltcInfo.result.price +
                          assetAmount[0].amount * aaplInfo.result.price +
                          assetAmount[1].amount * abnbInfo.result.price +
                          assetAmount[2].amount * amdInfo.result.price +
                          assetAmount[3].amount * amznInfo.result.price +
                          assetAmount[9].amount * xrpInfo.result.price
                        ).toLocaleString("en-US")}
                  </Card.Title>
                </div>
                <div className="changeInPercentage">
                  <Card.Subtitle className="mb-2 text-muted">
                    Update
                  </Card.Subtitle>
                  <Card.Title>
                    {" "}
                    <button onClick={refreshPage}>
                      <FiRefreshCw />
                    </button>
                  </Card.Title>
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
                  {!ethInfo ||
                  !btcInfo ||
                  !ltcInfo ||
                  !xrpInfo ||
                  !aaplInfo ||
                  !abnbInfo ||
                  !amdInfo ||
                  !amznInfo
                    ? console.log("NO DATA YET")
                    : holding.holdings?.map((holding) => {
                        if (holding.amount === 0) {
                          return null;
                        }

                        return (
                          <tr key={holding.id}>
                            <td>
                              {holding.asset === "BTC" && holding.amount > 0
                                ? "Bitcoin (BTC)"
                                : null}
                              {holding.asset === "ETH" && holding.amount > 0
                                ? "Ethereum (ETH)"
                                : null}
                              {holding.asset === "LTC" && holding.amount > 0
                                ? "Litecoin (LTC)"
                                : null}

                              {holding.asset === "XRP" && holding.amount > 0
                                ? "Ripple (XRP)"
                                : null}

                              {holding.asset === "AAPL" && holding.amount > 0
                                ? "Apple Stock (AAPL)"
                                : null}

                              {holding.asset === "ABNB" && holding.amount > 0
                                ? "Airbnb Stock (ABNB)"
                                : null}

                              {holding.asset === "AMD" && holding.amount > 0
                                ? "AMD Stock (AMD)"
                                : null}
                              {holding.asset === "AMZN" && holding.amount > 0
                                ? "Amazon Stock (AMZN)"
                                : null}
                            </td>
                            <td>
                              {" "}
                              $
                              {holding.asset === "BTC" && holding.amount > 0
                                ? btcInfo.result.price.toLocaleString("en-US")
                                : null}
                              {holding.asset === "ETH" && holding.amount > 0
                                ? ethInfo.result.price.toLocaleString("en-US")
                                : null}
                              {holding.asset === "LTC" && holding.amount > 0
                                ? ltcInfo.result.price.toLocaleString("en-US")
                                : null}
                              {holding.asset === "XRP" && holding.amount > 0
                                ? xrpInfo.result.price.toLocaleString("en-US")
                                : null}
                              {holding.asset === "AAPL" && holding.amount > 0
                                ? aaplInfo.result.price.toLocaleString("en-US")
                                : null}
                              {holding.asset === "ABNB" && holding.amount > 0
                                ? abnbInfo.result.price.toLocaleString("en-US")
                                : null}{" "}
                              {holding.asset === "AMD" && holding.amount > 0
                                ? amdInfo.result.price.toLocaleString("en-US")
                                : null}
                              {holding.asset === "AMZN" && holding.amount > 0
                                ? amznInfo.result.price.toLocaleString("en-US")
                                : null}
                            </td>
                            <td>{holding.amount}</td>
                          </tr>
                        );
                      })}
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
