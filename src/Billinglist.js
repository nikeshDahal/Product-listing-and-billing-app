import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Particular from "./Particular";
import { sampleRecords } from "./Recordlists";

//component of records i.e particular starts here

//component of records i.e particular ends here

function Billinglist() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [entry, setEntry] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProduct, setselectedProduct] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const[grandtotal,setGrandTotal]=useState(0);
  const[discountpercentage,setDiscountPercentage]=useState(0);
  const[vatpercentage,setVatPercentage]=useState(0);

  // console.log(records);
  // console.log(setRecords);

  useEffect(() => {
    const productsStored = localStorage.getItem("record-stored");
    if (!!productsStored) {
      setProducts(JSON.parse(productsStored));
    }
  }, []);

  useEffect(() => {
    if (!!selectedProductId) {
      const foundProduct = products.find((p) => p.id == selectedProductId);
      console.log(foundProduct, selectedProductId, products);
      setselectedProduct(foundProduct);
    }
  }, [selectedProductId]);

  useEffect(() => {
    //for subtotal
    setSubTotal(
      entry.reduce(
        (accumulator, currentvalue) =>
          accumulator + +currentvalue.quantity * +currentvalue.product.price,
        0
      )
    );
  }, [entry]);

  useEffect(()=>{
    setGrandTotal(subTotal*(1-discountpercentage/100)*(1+vatpercentage/100))
  },[discountpercentage, subTotal, vatpercentage])


 


  // console.log(entry,"test-entry");

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="records-container">
        {entry.map((en) => (
          <div key={en.product?.id} className="record">
            <div className="record-name">
              <span>{en.product?.name}</span>
            </div>
            <div className="record-price">
              <span>{en.quantity}</span>
            </div>
            <div className="record-price">
              <span>{`Rs ${en.product?.price}`}</span>
            </div>

            <div className="record-price">
              <span>{+en.quantity * +en.product.price}</span>
            </div>
          </div>
        ))}
        {/* for subtotal */}
        <div className="record">
          <div className="record-name">
            <span>Sub Total</span>
          </div>
          <div className="record-price">
            <span></span>
          </div>
          <div className="record-price">
            <span></span>
          </div>
          <div className="record-price">
            <span>Rs{new Intl.NumberFormat().format(subTotal)}</span>
          </div>
        </div>
        {/* for subtotal finished*/}

        {/* for discount */}

        <div class="record">
          <div class="record-name">
            <span>Discount amount</span>
          </div>
          <div class="record-price">
            <span></span>
          </div>
          <div class="record-price">
            <span></span>
          </div>
          <div class="record-price">
            <span>-Rs {(subTotal*discountpercentage)/100}</span>
          </div>
        </div>
        {/* for discount finished */}

        {/* for vat amount */}

        <div class="record">
          <div class="record-name">
            <span>Vat amount</span>
          </div>
          <div class="record-price">
            <span></span>
          </div>
          <div class="record-price">
            <span></span>
          </div>
          <div class="record-price">
            <span>+Rs {(subTotal*vatpercentage)/100}</span>
          </div>
        </div>
        {/* for vat amount finished */}

        {/* for grand total */}

        <div class="record">
          <div class="record-name">
            <span>Grand Total</span>
          </div>
          <div class="record-price">
            <span></span>
          </div>
          <div class="record-price">
            <span>{}</span>
          </div>
          <div class="record-price">
            <span>Rs{new Intl.NumberFormat().format(grandtotal.toFixed(3))}</span>
          </div>
        </div>
        {/* for grandtotal finished */}

        {/* {entry.map((mappingObj, productId) => (
          <Particular
            title={mappingObj.name}
            price={r.price}
            key={r.name}
            serialNumber={index + 1}
            id={r.id}
            onRemove={removeRecord}
            onEdit={handleEditRecord}
          />
        ))} */}
        {/* {records.length > 0 ? (
          <Particular title={"Total"} price={total} />
        ) : (
          <div>
            <span>No records found</span>
          </div>
        )} */}
      </div>
      <div className="input-container">
        <div className="name-input">
          <select
            // ref={recordNameRef}
            type="text"
            placeholder="Product Name"
            // value={quantity}
            onChange={(e) => setSelectedProductId(e.target.value)}
            // onKeyPress={handlePressEnterAtRecordName}
          >
            {products.map((recordforlabel) => (
              <option key={recordforlabel.id} value={recordforlabel.id}>
                {recordforlabel.name}
              </option>
            ))}
          </select>
        </div>
        <div className="price-input">
          <input
            // ref={recordPriceRef}
            type="number"
            placeholder="Quantity"
            // value={newRecordPrice}
            onChange={(e) => setQuantity(e.target.value)}
            // onKeyPress={handlePressEnterAtRecordPrice}
          />
        </div>
        <div className="add-record">
          <button
            onClick={(event) =>
              setEntry([...entry, { product: selectedProduct, quantity }])
            }
            // onClick={(e) =>
            //   !editMode ? addNewRecord() : updateRecord(e, selectedRecordId)
            // }
          >
            <span>{`Add entry`}</span>
          </button>
          <div className="price-input">
            <input
              // ref={recordPriceRef}
              type="number"
              placeholder="Discount %"
              value={discountpercentage}
              min={0}
              max={100}
              
              onChange={(e) => setDiscountPercentage(e.target.value)}
              // onKeyPress={handlePressEnterAtRecordPrice}
            />
            <input
              // ref={recordPriceRef}
              type="number"
              placeholder="vat %"
              value={vatpercentage}
              min={0}
              max={100}
              onChange={(e) => setVatPercentage(e.target.value)}
              // onKeyPress={handlePressEnterAtRecordPrice}
            />
          </div>

          {/* {editMode && (
            <button onClick={(e) => setEditMode(false)}>
              <span>Cancel</span>
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Billinglist;
