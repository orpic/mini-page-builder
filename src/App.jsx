import { useEffect, useRef, useState } from "react";

import {
  BOX_LIST_LOCAL_STORAGE_KEY,
  FROM_BLOCKS,
  FROM_DROPPED,
  initialValueDialogs,
} from "./constants";
import { DialogBox, SideBar, TheBox } from "./components";

function App() {
  const containerRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValues, setDialogValues] = useState(initialValueDialogs);

  // {
  //   uid: "",
  //   id: "",
  //   text: "",
  //   xCoord: "",
  //   yCoord: "",
  //   fontSize: "",
  //   fontWeight: "",
  // }
  const [boxList, setBoxList] = useState(() => {
    const savedBoxList = localStorage.getItem(BOX_LIST_LOCAL_STORAGE_KEY);
    return savedBoxList ? JSON.parse(savedBoxList) : [];
  });

  useEffect(() => {
    localStorage.setItem(BOX_LIST_LOCAL_STORAGE_KEY, JSON.stringify(boxList));
  }, [boxList]);

  const [selectedElementUID, setSelectedElementUID] = useState("");
  const [movingElementUID, setMovingElementUID] = useState("");

  const importBoxList = (file) => {
    console.log(file);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const importedList = JSON.parse(content);
        setBoxList(importedList);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Error importing boxList:", error);
    }
  };

  const exportBoxList = () => {
    try {
      const jsonContent = JSON.stringify(boxList);
      const blob = new Blob([jsonContent], { type: "application/json" });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "boxList.json";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting boxList:", error);
    }
  };

  return (
    <>
      {dialogOpen && (
        <DialogBox
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          dialogValues={dialogValues}
          setDialogValues={setDialogValues}
          setBoxList={setBoxList}
        />
      )}
      <div className="h-screen w-screen bg-green-500 flex relative">
        <div
          ref={containerRef}
          id="pagedropzone"
          className="w-96 flex-grow bg-[#F3F3F3]"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnter={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            // console.log("onDrop", e);
            e.preventDefault();
            e.stopPropagation();

            // change to copy for plus sign
            e.dataTransfer.dropEffect = "copy";

            // get the coordinates for prefiling in the modal form
            const container = containerRef.current;
            // console.log(container);
            const rect = container.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            // console.log("x: ", offsetX, "y : ", offsetY);

            // get the tranffer data for which elment was dropped

            const someData = e.dataTransfer.getData("application/json");
            const parsedData = JSON.parse(someData);
            // console.log("parsedData", parsedData);

            // console.log(
            //   parseInt(offsetX) - parseInt(parsedData?.mouseOffsetLeft)
            // );

            if (parsedData?.from === FROM_BLOCKS) {
              console.log(parsedData?.id);
              setDialogValues({
                id: parsedData?.id,
                placeholder:
                  parsedData?.id === "label"
                    ? "Label heading"
                    : parsedData?.id === "input"
                    ? "Input placeholder"
                    : parsedData?.id === "button" && "Button name",
                dialogHeading: parsedData?.heading,
                xCoord:
                  parseInt(offsetX) - parseInt(parsedData?.mouseOffsetLeft),
                yCoord:
                  parseInt(offsetY) - parseInt(parsedData?.mouseOffsetTop),
                text: "",
                fontSize: "",
                fontWeight: "",
              });
              setDialogOpen(true);
            }

            if (parsedData?.from === FROM_DROPPED) {
              //
              setBoxList((prev) => {
                // const theBxo = prev.find((box) => box.uid === parsedData?.id);
                // console.log(theBxo);
                // console.log(prev);
                const boxIndex = prev.findIndex(
                  (box) => box.uid === parsedData?.id
                );

                if (boxIndex !== -1) {
                  const newBox = {
                    ...prev[boxIndex],
                    xCoord:
                      parseInt(offsetX) - parseInt(parsedData?.mouseOffsetLeft),
                    yCoord:
                      parseInt(offsetY) - parseInt(parsedData?.mouseOffsetTop),
                  };
                  const newList = [
                    ...prev.slice(0, boxIndex),
                    newBox,
                    ...prev.slice(boxIndex + 1),
                  ];

                  return newList;
                }

                return prev;
              });
            }
          }}
        >
          {boxList.map((eachBox) => {
            {
              /* console.log(eachBox); */
            }
            return (
              <TheBox
                id={eachBox.id}
                uid={eachBox.uid}
                text={eachBox?.text}
                key={eachBox.uid}
                xCoord={eachBox.xCoord}
                yCoord={eachBox.yCoord}
                onDragEndHandler={() => {
                  setMovingElementUID("");
                }}
                onDragStartHandler={(e) => {
                  setMovingElementUID(eachBox.uid);
                  const container = e.target;
                  const rect = container.getBoundingClientRect();
                  // console.log("rect", rect, e.clientX - rect.left, e.clientY - rect.top);
                  // const id = eachBlock.id;

                  e.dataTransfer.setData(
                    "application/json",
                    JSON.stringify({
                      id: eachBox.uid,
                      from: FROM_DROPPED,
                      mouseOffsetLeft: e.clientX - rect.left,
                      mouseOffsetTop: e.clientY - rect.top,
                    })
                  );
                }}
                selected={selectedElementUID === eachBox.uid}
                moving={movingElementUID === eachBox.uid}
                onClickHandler={() => {
                  setSelectedElementUID(eachBox.uid);
                }}
                onKeyDownHandler={(e) => {
                  // console.log(e.key);
                  // Enter
                  // Delete
                  // console.log(e);
                  const presedKey = e.key;
                  if (presedKey === "Enter") {
                    let text = "";
                    if (eachBox?.id === "label") {
                      text = "This is a label";
                    }
                    if (eachBox?.id === "input") {
                      text = "Input Box";
                    }
                    if (eachBox?.id === "button") {
                      text = "Button name";
                    }

                    let textHeading = "";
                    if (eachBox?.id === "label") {
                      textHeading = "Label";
                    }
                    if (eachBox?.id === "input") {
                      textHeading = "Input";
                    }
                    if (eachBox?.id === "button") {
                      textHeading = "Button";
                    }
                    console.log(eachBox);
                    setDialogValues({
                      ...initialValueDialogs,
                      uid: eachBox.uid,
                      text: eachBox.text,
                      id: eachBox.id,
                      dialogHeading: textHeading,
                      xCoord: eachBox.xCoord,
                      yCoord: eachBox.yCoord,
                      placeholder: text,
                    });
                    setDialogOpen(true);
                  }

                  if (presedKey === "Delete") {
                    //
                    setBoxList((prev) => {
                      const updatedList = prev.filter(
                        (box) => box.uid !== eachBox?.uid
                      );
                      return updatedList;
                    });
                  }
                }}
              />
            );
          })}
        </div>
        <div className="w-[326px] bg-[#2D2D2D] h-full flex flex-col px-6">
          <SideBar
            exportBoxList={exportBoxList}
            importBoxList={importBoxList}
          />
          {/*  */}
        </div>
      </div>
    </>
  );
}

export default App;
