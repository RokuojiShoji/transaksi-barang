import React from "react";
import '../App.css'

function Divider(props) {
    
    return (
    <div style={{
        display: "flex",
        flexDirection: "row",
        height: `${props.height}`,
        width: `${props.width}`,
        borderRadius: `${props.radius}`,
        backgroundColor: `${props.color}`,
        margin: `${props.margin}`,
    }}>

    </div>
  );
}

export default Divider;
