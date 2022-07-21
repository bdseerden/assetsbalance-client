import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useDispatch } from "react-redux";
import { updateAssetHolding } from "../../store/user/actions";
import "./styles.css" 

export default function AssetForm(props) {  
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [buyTransaction, setBuyTransaction] = useState(null)
  const dispatch = useDispatch()

  console.log(asset)
  console.log(amount)
  console.log(buyTransaction)

  function submitForm(event) {
    event.preventDefault();

    buyTransaction ? 
    dispatch(updateAssetHolding(asset, parseInt(amount))) :  dispatch(updateAssetHolding(asset, parseInt(-amount)))
   
  }

  function refreshPage() {
    setTimeout(function(){
      window.location.reload();
   }, 250);
  }

  function submitButton(event) {
    submitForm(event)
    refreshPage()
  }

  return (
    <>
    <Form className="assetform" as={Col} md={{ span: 6, offset: 3 }}>

      <Form.Group className="assetInput">
        <Form.Label>Asset</Form.Label>
      <Form.Select
      value={asset}
      placeholder="Asset Type"
      onChange={event => setAsset(event.target.value)}
      required
      >
  <option>Asset Type</option>
  <option value="BTC">Bitcoin (BTC)</option>
  <option value="ETH">Ethereum (ETH)</option>
  <option value="LTC">Litecoin (LTC)</option>
  <option value="XRP">Ripple (XRP)</option>
  <option value="AAPL">Apple Stock (AAPL)</option>
  <option value="ABNB">Airbnb Stock (ABNB)</option>
  <option value="AMD">AMD Stock (AMD)</option>
  <option value="AMZN">Amazon Stock (AMZN)</option>



</Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Amount</Form.Label>
<Form.Control
          value={amount}
          onChange={event => setAmount(event.target.value)}
          type="number"
        /> 
      </Form.Group>

      <Form.Group className="buySellButtons">
        <ToggleButton onClick={() => setBuyTransaction(true)} variant="success">Buy</ToggleButton>
        <ToggleButton onClick={() => setBuyTransaction(false)} variant="danger">Sell</ToggleButton>
      </Form.Group>

      <Form.Group className="addtransaction">
        <Button variant="primary" type="submit" onClick={submitButton} >
          Add Transaction
        </Button>
      </Form.Group>
    </Form>

   
       </>
  );
}