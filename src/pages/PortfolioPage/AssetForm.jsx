import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { postStory } from "../../store/user/actions";
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function AssetForm() {
  const dispatch = useDispatch();
  const [asset, setAsset] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
  );

  function submitForm(event) {
    event.preventDefault();

    // console.log(name, content, imageUrl);
    // dispatch(postAsset(name, content, imageUrl));
  }
  
  return (
    <Form as={Col} md={{ span: 6, offset: 3 }}>
      <h1 className="mt-5 mb-5">Add Transaction</h1>

      <Form.Group>
        <Form.Label>Class</Form.Label>
      <Form.Select
      value={asset}
      placeholder="Asset Type"
      onChange={event => setAsset(event.target.value)}
      required
      >
  <option>Asset Type</option>
  <option value="BTC">Bitcoin</option>
  <option value="ETH">Ethereum</option>
  <option value="AAPL">Apple Stock</option>
</Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          value={content}
          onChange={event => setContent(event.target.value)}
          type="text"
        />
      </Form.Group>

      <Form.Group className="buySellButtons">
        <ToggleButton variant="success">Buy</ToggleButton>
        <ToggleButton variant="danger">Sell</ToggleButton>
      </Form.Group>

      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Add Transaction
        </Button>
      </Form.Group>
    </Form>
  );
}