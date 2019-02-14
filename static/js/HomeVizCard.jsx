import React from "react";

const HomeVizCard = ({ title, list,selectViz }) => (
  <div
    style={{
      background: `white`,
      maxWidth: 600,
      height: 300,
      overflowY: `scroll`,
      padding: 10,
      borderRadius: `5px`,
      boxShadow: `0 4px 4px -2px gray`
    }}
  >
    <h2
      style={{
        fontFamily: `'Roboto', sans-serif`,
        fontSize: 24,
        fontWeight: 900,
        textAlign: `center`,
        textTransform: `uppercase`,
        textShadow: `1px 2px 1px rgba(128, 128, 128, 0.3)`
      }}
    >
      {title}
    </h2>
    <div>
      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `20px 1fr`,
          padding: `6px 30px`,
          borderBottom: `1px solid #ff6868`
        }}
      >
        <span style={{ textAlign: `center` }}>No.</span>
        <span style={{ textAlign: `center` }}>Saved At</span>
      </div>
      {list.map((item, i) => (
        <div
          key={i}
          style={{
            border: `0.5px dotted #ff6868`,
            padding: `12px 30px`,
            display: `grid`,
            gridTemplateColumns: `20px 1fr`,
            marginTop: 5,
            cursor: `pointer`
          }}
          className="SavedVizCardItem"
          onClick={() => selectViz(i)}
        >
          <span style={{ textAlign: `center` }}>{i + 1}</span>
          <span style={{ textAlign: `center` }}>{item[0]}</span>
        </div>
      ))}
    </div>
  </div>
);

export default HomeVizCard;
