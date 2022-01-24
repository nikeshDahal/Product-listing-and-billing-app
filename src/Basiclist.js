import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Particular from "./Particular";
import { sampleRecords } from "./Recordlists";

//component of records i.e particular starts here

//component of records i.e particular ends here

function Basiclist() {
  const [records, setRecords] = useState([]);
  // console.log(records);
  // console.log(setRecords);

  const [newRecordName, setNewRecordName] = useState("");
  const [newRecordPrice, setNewRecordPrice] = useState(0.0);

  const recordNameRef = useRef(null);
  const recordPriceRef = useRef(null);

  const [total, setTotal] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  useEffect(() => {
    const recordsStored = localStorage.getItem("record-stored");
    console.log(recordsStored);
    if (!!recordsStored) {
      setRecords(JSON.parse(recordsStored));
    }
  }, []);

  useEffect(() => {
    setTotal(records.reduce((a, v) => a + +v.price, 0));
  }, [records]);

  useEffect(() => {
    if (!editMode) {
      setNewRecordName("");
      setNewRecordPrice(0);
    }
  }, [editMode]);

  const addNewRecord = () => {
    setRecords([
      ...records,
      {
        id: new Date().getMilliseconds(),
        name: newRecordName,
        price: newRecordPrice,
      },
    ]);

    localStorage.setItem(
      "record-stored",
      JSON.stringify([
        ...records,
        {
          id: new Date().getMilliseconds(),
          name: newRecordName,
          price: newRecordPrice,
        },
      ])
    );

    setNewRecordName("");
    setNewRecordPrice(0);
    recordNameRef.current.focus();
  };

  const removeRecord = (e, name) => {
    setRecords(records.filter((x) => x.name !== name));
    localStorage.setItem(
      "record-stored",
      JSON.stringify(records.filter((x) => x.name !== name))
    );
  };

  const handlePressEnterAtRecordName = (e) => {
    if (e.code === "Enter") {
      recordPriceRef.current.focus();
    }
  };

  const handlePressEnterAtRecordPrice = (e) => {
    if (e.code === "Enter") {
      !editMode ? addNewRecord() : updateRecord(e, selectedRecordId);
    }
  };

  const handleEditRecord = (e, name, price, id) => {
    console.log(name);
    console.log(price);

    setNewRecordName(name);
    setNewRecordPrice(price);
    setEditMode(true);
    setSelectedRecordId(id);
    // console.log(id);
  };

  const updateRecord = (e, id) => {
    // console.log(name, price);
    // setNewRecordName(name);
    // setNewRecordPrice(price);
    // setEditMode(true);
    console.log("update button clicked");

    setRecords(
      records.map((r) => {
        if (r.id === id) {
          return {
            ...r,

            name: newRecordName,
            price: newRecordPrice,
          };
        }
        return r;
      })
    );
    localStorage.setItem(
      "record-stored",
      JSON.stringify(
        records.map((r) => {
          if (r.id === id) {
            return {
              ...r,

              name: newRecordName,
              price: newRecordPrice,
            };
          }
          return r;
        })
      )
    );
    setEditMode(false);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="records-container">
        <h3>List of Products </h3>  
        {records.map((r, index) => (
          <Particular
            title={r.name}
            price={r.price}
            key={r.name}
            serialNumber={index + 1}
            id={r.id}
            onRemove={removeRecord}
            onEdit={handleEditRecord}
          />
        ))}
        {records.length > 0 ? (
          <Particular title={"Total"} price={total} />
        ) : (
          <div>
            <span>No records found</span>
          </div>
        )}
      </div>
      <div className="input-container">
        <div className="name-input">
          <input
            ref={recordNameRef}
            type="text"
            placeholder="Record Name"
            value={newRecordName}
            onChange={(e) => setNewRecordName(e.target.value)}
            onKeyPress={handlePressEnterAtRecordName}
          />
        </div>
        <div className="price-input">
          <input
            ref={recordPriceRef}
            type="number"
            placeholder="Record Price"
            value={newRecordPrice}
            onChange={(e) => setNewRecordPrice(e.target.value)}
            onKeyPress={handlePressEnterAtRecordPrice}
          />
        </div>
        <div className="add-record">
          <button
            onClick={(e) =>
              !editMode ? addNewRecord() : updateRecord(e, selectedRecordId)
            }
          >
            <span>{`${editMode ? "Update" : "Add"} record`}</span>
          </button>

          {editMode && (
            <button onClick={(e) => setEditMode(false)}>
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Basiclist;
