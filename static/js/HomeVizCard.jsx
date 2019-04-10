import React from "react";

const HomeVizCard = ({ title, list,selectViz }) => (
  <div
    style={{
      background: `white`,
      maxWidth: `50%`,
      height: 600,
      overflowY: `scroll`,
      padding: 10,
      borderRadius: `5px`,
      boxShadow: `0 4px 4px -2px gray`,
      display:`grid`,
      gridTemplateRows:`60px auto`
    }}
  >
    <h2
      style={{
        fontFamily: `'Roboto', sans-serif`,
        fontSize: 24,
        fontWeight: 900,
        textAlign: `center`,
        textTransform: `uppercase`,
        textShadow: `1px 2px 1px rgba(128, 128, 128, 0.3)`,
        marginTop: `20px`,
      }}
    >
      {title}
    </h2>
    <div style={{position:`relative`, height:`100%`}}>
        {list.length > 0 ? 
                <div>
                    <div style={{display: `grid`,gridTemplateColumns: `20px 1fr`,padding: `6px 30px`,borderBottom: `1px solid #ff6868`}}>
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
                            onClick={() => selectViz(i)}>
                            <span style={{ textAlign: `center` }}>{i + 1}</span>
                            <span style={{ textAlign: `center` }}>{item[0]}</span>
                        </div>
                    ))}
                </div>
                : 
                <div style={{position:`absolute`, top:`45%`, left:`50%`, transform:`translate(-50%, -50%)`, display:`flex`, flexDirection:`column`, alignItems:`center`, justifyContent:`center`}}>
                    No Saved Visualization Yet!
                    <button style={{width:200,  display:`flex`, justifyContent:`center`, alignItems:`center`, marginTop:30}} onClick={() => window.location = "/visualisation"}>Create Visualization</button>
                </div>
            }
        </div>
    </div>
);

export default HomeVizCard;
