import React from "react";
import { v4 as uuid } from "uuid";
import SearchBar from "./SearchBar";
var Highlight = require("react-highlighter");

import { firstCapital } from "../util/PrettyText";

/**
 * A table component using flexbox.
 *
 * @param data the data being displayed, as an array of same objects
 * @param rowClickCallback callback function that get called when a row is
 * clicked, with the data object of that row being passed-in.
 * @returns react component
 */
export default function table({ data, rowClickCallback }) {
  const [elemWidth, setElemWidth] = React.useState(100);
  const [searchKey, setSearchKey] = React.useState(null);
  const [searchString, setSearchString] = React.useState("");

  React.useEffect(() => {
    setElemWidth((1 / Object.keys(data[0]).length) * 100 + "%");
  }, data);

  React.useEffect(() => {
    if (searchString) {
    }
  }, [searchString]);

  return (
    <div className="table">
      <div className="head">
        {Object.keys(data[0]).map((key) => (
          <span
            key={key}
            style={{ minWidth: elemWidth }}
            onClick={() => {
              if (searchKey === key) {
                setSearchKey(null);
                setSearchString("");
              } else {
                setSearchKey(key);
              }
            }}
          >
            {firstCapital(key)}
            {searchKey === key ? (
              <SearchBar
                searchString={searchString}
                setSearchString={setSearchString}
                size={elemWidth}
              />
            ) : (
              <></>
            )}
          </span>
        ))}
      </div>

      {data.map((item) => (
        <div
          key={uuid()}
          onClick={() => {
            if (rowClickCallback) rowClickCallback(item);
          }}
        >
          {Object.entries(item).map(([key, value]) => (
            <span key={uuid()} style={{ minWidth: elemWidth }}>
              <Highlight
                key={uuid()}
                search={searchKey === key ? searchString : ""}
              >
                {(isNaN(value)
                  ? value
                  : Math.round(value * 100) / 100
                ).toString()}
              </Highlight>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
