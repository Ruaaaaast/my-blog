import React, { useState, useEffect, FunctionComponent } from "react";
import {
  InfiniteLoader,
  Table,
  Index,
  IndexRange,
  Column,
  TableHeaderProps
} from "react-virtualized";
import Draggable from "react-draggable";
import "./InfTable.css";

const columnList = [
  { name: "column1", length: 20 },
  { name: "column2", length: 20 },
  { name: "column3", length: 20 },
  { name: "column4", length: 20 },
  { name: "column5", length: 20 }
];

const InfTable: FunctionComponent = () => {
  function isRowLoaded({ index }: Index) {
    return !!list[index];
  }

  function loadMoreRows({ startIndex, stopIndex }: IndexRange) {
    console.log("Loading from " + startIndex + " to " + stopIndex);
    return new Promise((resolve, reject) => {
      let newList = [...list].concat(generateRow(10, list.length));
      setList(newList);
      resolve();
    });
  }

  function makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generateRow(count: number, len: number) {
    let newList = [];
    for (let i = 0; i < count; i++) {
      let row = columnList.reduce(
        (pre, cur) =>
          Object.assign(
            {
              [cur.name]: makeid(cur.length)
            },
            pre
          ),
        {}
      );
      newList.push(Object.assign({ index: i + len }, row));
    }
    return newList;
  }

  function nextKey(dataKey: string): string {
    for (let i = 0; i < columnList.length; i++) {
      if (dataKey === columnList[i].name) {
        return columnList[(i + 1) % columnList.length].name;
      }
    }
    return "";
  }

  function rowClassName({ index }: Index) {
    if (index < 0) {
      return "headerRow";
    } else {
      return index % 2 === 0 ? "evenRow" : "oddRow";
    }
  }

  function onRowClick({ index }: Index) {
    console.log("You click " + index);
  }

  function calculateRatio(
    list: { name: string; length: number }[]
  ): { [key: string]: number } {
    let totalLength = 0;
    for (let i = 0; i < list.length; i++) {
      totalLength += list[i].length;
    }
    let ratioMap = list.reduce(
      (pre, cur) =>
        Object.assign({ [cur.name]: cur.length / totalLength }, pre),
      {}
    );
    return ratioMap;
  }

  function columnHeaderRender({ dataKey, label }: TableHeaderProps) {
    return (
      <React.Fragment key={dataKey}>
        <span
          className="ReactVirtualized__Table__headerTruncatedText"
          key="label"
        >
          {label}
        </span>
        <Draggable
          axis="x"
          handle=".handle"
          key="drag-icon"
          onStart={(e, data) => {
            setLastX(data.x);
          }}
          position={{ x: 0, y: 0 }}
          onStop={(e, data) => {
            let deltaRatio = (data.x - lastX) / 1200;
            let newColumnRatio = {
              ...columnRatio,
              [dataKey]: columnRatio[dataKey] + deltaRatio,
              [nextKey(dataKey)]: columnRatio[nextKey(dataKey)] - deltaRatio
            };
            setColumnRatio(newColumnRatio);
          }}
        >
          <div
            key={dataKey}
            className="handle"
            style={{ display: "inline-block", float: "right" }}
          >
            :
          </div>
        </Draggable>
      </React.Fragment>
    );
  }

  const [list, setList] = useState(generateRow(10, 0));

  const [columnRatio, setColumnRatio] = useState(calculateRatio(columnList));

  const [lastX, setLastX] = useState(0);

  console.log(columnRatio);

  return (
    <div>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={1000}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            width={1270}
            height={800}
            headerHeight={40}
            rowHeight={40}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
            onRowsRendered={onRowsRendered}
            onRowClick={onRowClick}
            rowClassName={rowClassName}
            headerClassName="headerColumn"
            ref={registerChild}
          >
            <Column label="Index" dataKey="index" width={50} />
            {columnList.map(column => (
              <Column
                label={column.name}
                dataKey={column.name}
                width={1200 * columnRatio[column.name]}
                key={column.name}
                headerRenderer={columnHeaderRender}
              ></Column>
            ))}
          </Table>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default InfTable;
