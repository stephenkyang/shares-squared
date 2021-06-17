import React, { useState, useRef, useEffect } from "react";
import { Table as BootstrapTable, InputGroup, Button, FormControl, Form } from "react-bootstrap";
import { API, Auth } from "aws-amplify";

import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";

/**
 * tableData is the data to construct the table
 * getWatchlists is your call to make after you update anything in a watchlist to refresh the data.
 * Sample usage: watchlists.map(elem => <Table tableData={elem} getWatchlists={getWatchlists} />)
 */
export default function Table({ tableData, getWatchlists}) {

  const [privacy, setPrivacy] = useState(tableData.privacy.charAt(0) + tableData.privacy.toLowerCase().slice(1));
  const formRef = useRef(null);

  const [actualUserId, setActualUserId] = useState("");

  useEffect(() => {
    Auth.currentUserInfo().then(res => setActualUserId(res.id));
  }, [actualUserId])

  const isUserTable = actualUserId === tableData.userId;

  const handleTableChange = (event) => {

  }

  const addSymbol = (symbol, watchlist) => {

  }

  const removeSymbol = (symbol, watchlist) => {

  }

  const deleteWatchlist = (watchlist) => {

  }

  return (
    <React.Fragment key={tableData.watchlistId}>
      <h2>{tableData.watchlistId}</h2>
      <BootstrapTable striped bordered hover>
        <thead>
          <tr>
            <th>Symbol</th>
            {isUserTable &&
                  <td>
                    <Button variant="danger" onClick={removeSymbol.bind(this, tableData.symbol, tableData.watchlistId)}>
                      X
                      </Button>
                  </td>
                }
          </tr>
        </thead>
        <tbody>
        {tableData.symbols.map(item => {
            return item === null ?
              null
              :
              <tr key={item.symbol}>
                <td>{item.symbol}</td>
                <td>{item.longName}</td>
                <td>{item.bid}</td>
                <td>{item.fiftyDayAverage}</td>
                <td>{item.regularMarketChange}</td>
                <td>{item.regularMarketChangePercent}</td>
                <td>{item.pegRatio}</td>
                <td>{item.dividendYield}</td>
                {isUserTable &&
                  <td>
                    <Button variant="danger" onClick={removeSymbol.bind(this, item.symbol, tableData.watchlistId)}>
                      X
                      </Button>
                  </td>
                }
              </tr>
          })}
        {isUserTable &&
            <tr>
              <td>
                <InputGroup className="mb-3">
                  <FormControl
                    ref={formRef}
                    placeholder="Add Symbol"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <LoaderButton isLoading={false} onClick={() => addSymbol(formRef.current.value, tableData.watchlistId)}>Add</LoaderButton>
                  </InputGroup.Append>
                </InputGroup>
              </td>
              <td>
                <Button variant="danger" onClick={deleteWatchlist.bind(this, tableData.watchlistId)}>
                  Delete
                  </Button>
              </td>
            </tr>
          }
        </tbody>
      </BootstrapTable>
    </React.Fragment>
  )
}
