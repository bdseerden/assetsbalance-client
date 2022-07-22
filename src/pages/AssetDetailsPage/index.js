import { useParams } from "react-router-dom";
import { AdvancedChart, TickerTape } from "react-tradingview-embed";
import "./styles.css";

export default function AssetDetailsPage() {
  const { asset } = useParams();

  return (
    <div className="detailContainer">
      {asset === "BTC" ? (
        <AdvancedChart
          widgetProps={{ theme: "dark", symbol: "BINANCE:BTCUSDT" }}
        />
      ) : null}
      {asset === "ETH" ? (
        <AdvancedChart
          widgetProps={{ theme: "dark", symbol: "BINANCE:ETHUSDT" }}
        />
      ) : null}
      {asset === "LTC" ? (
        <AdvancedChart
          widgetProps={{ theme: "dark", symbol: "COINBASE:LTCUSD" }}
        />
      ) : null}
      {asset === "XRP" ? (
        <AdvancedChart
          widgetProps={{ theme: "dark", symbol: "BINANCE:XRPUSDT" }}
        />
      ) : null}
      {asset === "AAPL" ? (
        <AdvancedChart widgetProps={{ theme: "dark", symbol: "NASDAQ:AAPL" }} />
      ) : null}
      {asset === "ABNB" ? (
        <AdvancedChart widgetProps={{ theme: "dark", symbol: "NASDAQ:ABNB" }} />
      ) : null}
      {asset === "AMD" ? (
        <AdvancedChart widgetProps={{ theme: "dark", symbol: "NASDAQ:AMD" }} />
      ) : null}
      {asset === "AMZN" ? (
        <AdvancedChart widgetProps={{ theme: "dark", symbol: "NASDAQ:AMZN" }} />
      ) : null}
    </div>
  );
}
