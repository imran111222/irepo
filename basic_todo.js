import { useState,useEffect } from "react";
import { render } from "react-dom";
import React from "react";
import "./index.css";

// const [ttxt, setTtxt] = useState([]);

// function fnc_add() {
//     let tx = document.getElementById("txt").value;
//     setTtxt((ttxt) => {
//       return [...ttxt, tx];
//     });
//   }
let i = 0;
function App() {
  const [ttxt, setTtxt] = useState([]);
  const [item, setItem] = useState("");
  const [searchValue, setSearchvalue] = useState("");
  useEffect(()=>{
    if(localStorage.getItem('ttxt')){
        setTtxt(JSON.parse(localStorage.getItem('ttxt')));
    }else
    localStorage.setItem('ttxt', JSON.stringify([]));
},[])
  function fnc_add() {
    if (!item || item.length == 0) {
      alert("enter something");
      return;
    }
    i = i + 1;
    // let tx = document.getElementById("txt").value;
    let x=
      // let p=document.getElementById('txt').value;
      [...ttxt, { id: i, text: item, done: false }];
    
    setTtxt(x);
    localStorage.setItem('ttxt',JSON.stringify(x));
    setItem("");
  }
  function make_check(index) {
    let x= ttxt.map((ttxt1) => {
      if (ttxt1.id == index) {
        if (ttxt1.done == true) {
          ttxt1.done = false;
        } else {
          ttxt1.done = true;
        }
      }
      return ttxt1
    });
    setTtxt(x);
    localStorage.setItem('ttxt',JSON.stringify(x));
  }
  function deleteTodo(id) {
    let y=ttxt.filter((ttxt) => {
      return ttxt.id !== id;
    })
    setTtxt(y);
    localStorage.setItem('ttxt',JSON.stringify(y));
  }
  let todoSrc = "";
  if (searchValue === "") {
    todoSrc = ttxt.map((ttxt1) => (
      <div>
        <input type="checkbox" onClick={() => make_check(ttxt1.id)}></input>
        {ttxt1.text}
        <a onClick={() => deleteTodo(ttxt1.id)}> Delete</a>
      </div>
    ));
  } else {
    todoSrc = ttxt.map((ttxt1) => {
      if (ttxt1.text.search(searchValue) !== -1) {
        return (
          <div>
            <input type="checkbox" onClick={() => make_check(ttxt1.id)}></input>
            {ttxt1.text}<a onClick={() => deleteTodo(ttxt1.id)}> Delete</a>
          </div>
        );
      }
    });
  }
  return (
    <>
    <div className="container">
    <div className="todo">my todo:</div>
      <div className="inner_todo">
      type todo:<input
        type="text"
        id="txt"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      ></input>
      <button onClick={fnc_add}>Add</button>
      </div>
      <p className="search_todo">
        {ttxt.map((ttxt1) => {
          return (
            <div >
              <input
                type="checkbox"
                onClick={() => make_check(ttxt1.id)}
              ></input>
              {ttxt1.text}
              <a onClick={() => deleteTodo(ttxt1.id)}> Delete</a>
            </div>
          );
        })}
      </p>
      <br></br>
      <div className="src_todo">Search todo:<input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchvalue(e.target.value)}
      ></input>{todoSrc}</div>
      
    </div>
      {/* <div></div> */}
    </>
  );
}

render(<App />, document.getElementById("root"));
