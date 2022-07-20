import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./styles.css";
import AssetForm from "./AssetForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHoldingsById, fetchBtcInfo } from "../../store/user/actions";
import {
  selectHoldings,
  selectBtcInfo,
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
  const AAPL = "AAPL";
  const AMZN = "AMZN";
  const AMD = "AMD";

  const holding = useSelector(selectHoldings);
  const btcInfo = useSelector(selectBtcInfo);
  // const ethInfo = useSelector(selectEthInfo);
  // const ltcInfo = useSelector(selectLtcInfo);
  // const aaplInfo = useSelector(selectAaplInfo);
  // const amznInfo = useSelector(selectAmznInfo);
  // const amdInfo = useSelector(selectAmdInfo);

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

  // useEffect(() => {
  //   dispatch(fetchEthInfo(ETH));
  // }, [dispatch, ETH]);

  // useEffect(() => {
  //   dispatch(fetchLtcInfo(LTC));
  // }, [dispatch, LTC]);

  // useEffect(() => {
  //   dispatch(fetchAaplInfo(AAPL));
  // }, [dispatch, AAPL]);

  // useEffect(() => {
  //   dispatch(fetchAmznInfo(AMZN));
  // }, [dispatch, AMZN]);

  // useEffect(() => {
  //   dispatch(fetchAmdInfo(AMD));
  // }, [dispatch, AMD]);

  const assetAmount = holding.holdings;

  function refreshPage() {
    setTimeout(function () {
      window.location.reload();
    }, 200);
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
                    {btcInfo
                      ? (
                          assetAmount[0].amount * btcInfo.result.price
                        ).toLocaleString("en-US")
                      : 0}
                    {/* // assetAmount[1].amount * ethInfo.result.price + //
                    assetAmount[2].amount * ltcInfo.result.price + //
                    assetAmount[3].amount * aaplInfo.result.price + //
                    assetAmount[4].amount * amznInfo.result.price + //
                    assetAmount[5].amount * amdInfo.result.price */}
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
                  {!holding
                    ? null
                    : holding.holdings?.map((holding) => {
                        if (holding.amount === 0) {
                          return null;
                        }

                        if (btcInfo === null) {
                          return null;
                        }

                        return (
                          <tr key={holding.id}>
                            <td>{holding.asset}</td>
                            <td>
                              {" "}
                              $
                              {holding.asset === "BTC"
                                ? btcInfo.result.price.toLocaleString("en-US")
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
