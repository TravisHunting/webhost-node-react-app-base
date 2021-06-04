import React, {useState} from "react";
import axios from "axios";

function Quotes() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");


function getQuote() {
    axios.get("/app-base/quote",  { crossdomain: true }).then(response => {
      setText(response.data.text);
      setAuthor(response.data.author);
      console.log(response.data);
    });
  }

return (
    <div>

      <button onClick={getQuote} className="btn btn-primary" style={{paddingLeft: "20px", paddingRight: "20px" }}> 
        Load Quotation
      </button>
      
      <h1 className="center-flex-1" style={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "30px", paddingBottom: "15px" }}>{text}</h1>
      <div id='author'>{author}</div>

    </div>
  )
}


export default Quotes;