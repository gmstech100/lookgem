import React from "react";
export const cellWebsiteLink = (params) => {
    return (
      <>
        <a
          style={{
            textDecoration: "underline",
            color: "#0a53bf",
            cursor: "pointer",
          }}
          onClick={() => window.open(params.url != undefined ? params.url : params.value , "_blank")}
        >
          {params.value}
        </a>
      </>
    );
  };