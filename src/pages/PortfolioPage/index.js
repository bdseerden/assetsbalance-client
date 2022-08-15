import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./styles.css";
import AssetForm from "./AssetForm";
import { useParams, Link } from "react-router-dom";
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
                    Total Value
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
                    !amznInfo ||
                    !assetAmount
                      ? null
                      : (
                          assetAmount[4].amount * btcInfo.bitcoin.usd +
                          assetAmount[5].amount * ethInfo.ethereum.usd +
                          assetAmount[7].amount * ltcInfo.litecoin.usd +
                          assetAmount[0].amount * aaplInfo.c +
                          assetAmount[1].amount * abnbInfo.c +
                          assetAmount[2].amount * amdInfo.c +
                          assetAmount[3].amount * amznInfo.c +
                          assetAmount[9].amount * xrpInfo.ripple.usd
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
                    <th>Value</th>
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
                        if (holding.amount <= 0) {
                          return null;
                        }

                        return (
                          <tr key={holding.id}>
                            <td>
                              {holding.asset === "BTC" && holding.amount > 0 ? (
                                <Link
                                  className="assetLink"
                                  to={`/details/${holding.asset}`}
                                >
                                  {" "}
                                  Bitcoin (BTC){" "}
                                </Link>
                              ) : null}
                              {holding.asset === "ETH" && holding.amount > 0 ? (
                                <Link
                                  className="assetLink"
                                  to={`/details/${holding.asset}`}
                                >
                                  {" "}
                                  Ethereum (ETH){" "}
                                </Link>
                              ) : null}
                              {holding.asset === "LTC" && holding.amount > 0 ? (
                                <Link
                                  className="assetLink"
                                  to={`/details/${holding.asset}`}
                                >
                                  {" "}
                                  Litecoin (LTC){" "}
                                </Link>
                              ) : null}

                              {holding.asset === "XRP" && holding.amount > 0 ? (
                                <Link
                                  className="assetLink"
                                  to={`/details/${holding.asset}`}
                                >
                                  {" "}
                                  Ripple (XRP){" "}
                                </Link>
                              ) : null}

                              {holding.asset === "AAPL" &&
                              holding.amount > 0 ? (
                                <Link
                                  className="assetLink"
                                  to={`/details/${holding.asset}`}
                                >
                                  {" "}
                                  Apple Stock (AAPL){" "}
                                </Link>
                              ) : null}

                              {holding.asset === "ABNB" &&
                              holding.amount > 0 ? (
                                <Link
                                  className="assetLink"
                                  to={`/details/${holding.asset}`}
                                >
                                  {" "}
                                  Airbnb Stock (ABNB){" "}
                                </Link>
                              ) : null}

                              {holding.asset === "AMD" && holding.amount > 0 ? (
                                <Link
                                  className="assetLink"
                                  to={`/details/${holding.asset}`}
                                >
                                  {" "}
                                  AMD Stock (AMD){" "}
                                </Link>
                              ) : null}
                              {holding.asset === "AMZN" &&
                              holding.amount > 0 ? (
                                <Link
                                  className="assetLink"
                                  to={`/details/${holding.asset}`}
                                >
                                  {" "}
                                  Amazon Stock (AMZN){" "}
                                </Link>
                              ) : null}
                            </td>
                            <td>
                              {" "}
                              $
                              {holding.asset === "BTC" && holding.amount > 0
                                ? btcInfo.bitcoin.usd.toLocaleString("en-US")
                                : null}
                              {holding.asset === "ETH" && holding.amount > 0
                                ? ethInfo.ethereum.usd.toLocaleString("en-US")
                                : null}
                              {holding.asset === "LTC" && holding.amount > 0
                                ? ltcInfo.litecoin.usd.toLocaleString("en-US")
                                : null}
                              {holding.asset === "XRP" && holding.amount > 0
                                ? xrpInfo.ripple.usd.toLocaleString("en-US")
                                : null}
                              {holding.asset === "AAPL" && holding.amount > 0
                                ? aaplInfo.c.toLocaleString("en-US")
                                : null}
                              {holding.asset === "ABNB" && holding.amount > 0
                                ? abnbInfo.c.toLocaleString("en-US")
                                : null}
                              {holding.asset === "AMD" && holding.amount > 0
                                ? amdInfo.c.toLocaleString("en-US")
                                : null}
                              {holding.asset === "AMZN" && holding.amount > 0
                                ? amznInfo.c.toLocaleString("en-US")
                                : null}
                            </td>
                            <td>{holding.amount}</td>
                            <td>
                              $
                              {holding.asset === "BTC" && holding.amount > 0
                                ? (
                                    btcInfo.bitcoin.usd * holding.amount
                                  ).toLocaleString("en-US")
                                : null}
                              {holding.asset === "ETH" && holding.amount > 0
                                ? (
                                    ethInfo.ethereum.usd * holding.amount
                                  ).toLocaleString("en-US")
                                : null}
                              {holding.asset === "LTC" && holding.amount > 0
                                ? (
                                    ltcInfo.litecoin.usd * holding.amount
                                  ).toLocaleString("en-US")
                                : null}
                              {holding.asset === "XRP" && holding.amount > 0
                                ? (
                                    xrpInfo.ripple.usd * holding.amount
                                  ).toLocaleString("en-US")
                                : null}
                              {holding.asset === "AAPL" && holding.amount > 0
                                ? (aaplInfo.c * holding.amount).toLocaleString(
                                    "en-US"
                                  )
                                : null}
                              {holding.asset === "ABNB" && holding.amount > 0
                                ? (abnbInfo.c * holding.amount).toLocaleString(
                                    "en-US"
                                  )
                                : null}
                              {holding.asset === "AMD" && holding.amount > 0
                                ? (amdInfo.c * holding.amount).toLocaleString(
                                    "en-US"
                                  )
                                : null}
                              {holding.asset === "AMZN" && holding.amount > 0
                                ? (amznInfo.c * holding.amount).toLocaleString(
                                    "en-US"
                                  )
                                : null}
                            </td>
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
