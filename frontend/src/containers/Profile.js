import React, { useState, useEffect, useRef } from "react";
import { API } from "aws-amplify";
import { Table, InputGroup, Button, FormControl } from "react-bootstrap";
import _ from "lodash";

import { onError } from "../libs/errorLib";
import "./Profile.css";
import LoaderButton from "../components/LoaderButton";


export default function Profile() {

  const addDataRef = useRef(null);

  const [isAddLoading, setIsAddLoading] = useState(false);

  const [watchlists, setWatchlists] = useState([]);

  const getWatchlists = () => {
    API.get("stonks", "/watchlist/")
    .then(res => {
      console.log(res);
      setWatchlists(res);
    })
    .catch(err => {
      console.log(err);
      onError(err);
    });
  }

  useEffect(() => {
    getWatchlists();
  }, []);

  const [data, setData] = useState([{
    shortName: "Tesla",
    symbol: "TSLA",
    bid: "The Moon",
  },
  {
    shortName: "Apple",
    symbol: "AAPL",
    bid: 123,
  },
  {
    shortName: "Microsoft",
    symbol: "MSFT",
    bid: 235,
  },
  {
    shortName: "PayPal",
    symbol: "PYPL",
    bid: 189,
  },]);

  const getData = () => {
    API.get("stonks", `/market?symbols=${addDataRef ? addDataRef.current.value : ""}`)
    .then(data => {
      console.log(data);
      setData(data.quoteResponse.result);
    })
    .catch(err => onError(err))
    .finally(() => setIsAddLoading(false));
  }

  return (
    <div className="Profile">
      <div className="">
        <h1>Stonks</h1>
        <p className="">Welcome to your profile!</p>
      </div>
      <InputGroup>
        <FormControl
          ref={addDataRef}
          placeholder="Symbols in format AAPL,IBM,TSLA"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <LoaderButton isLoading={isAddLoading} onClick={() => {
            setIsAddLoading(true);
            getData();
          }}>
            Get Info!
          </LoaderButton>
        </InputGroup.Append>
      </InputGroup>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Bid</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            return <tr>
                <td>{item.shortName}</td>
                <td>{item.symbol}</td>
                <td>{item.bid}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>
  );
}
