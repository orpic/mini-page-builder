import { useEffect, useState } from "react";
import { images } from "./assets/images";

const FROM_BLOCKS = "blocks";
const blocksData = [
  {
    id: "label",
    displayText: "Label",
  },
  {
    id: "input",
    displayText: "Input",
  },
  {
    id: "button",
    displayText: "Button",
  },
];

function App() {
  const initialValueDialogs = {
    dialogHeading: "Label",
    text: "",
    xCoord: "",
    yCoord: "",
    fontSize: "",
    fontWeight: "",
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValues, setDialogValues] = useState(initialValueDialogs);

  return (
    <>
      {dialogOpen && (
        <dialog
          open={dialogOpen}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key.toString() === "Escape") {
              // console.log("hi escape");
              setDialogOpen(false);
            }
          }}
          className=" z-10 absolute h-screen w-screen flex items-center justify-center bg-black/50 "
        >
          <div className="w-[96vw] h-[661px] xs:w-[424px] bg-white rounded-[5px]">
            <div className="flex justify-between items-center pl-[21px] pr-[23px] pt-[18px] pb-[22px] border-b border-opacity-5 ">
              <h2 className="text-xl font-semibold font-openSansFont">
                Edit {dialogValues.dialogHeading}
              </h2>
              <img
                onClick={() => {
                  setDialogValues(initialValueDialogs);
                  setDialogOpen(false);
                }}
                className="cursor-pointer"
                src={images.crossOne}
                alt="close"
              />
            </div>
            <div className="mt-[25px] ml-[21px] mr-[24px]">
              <div className="w-full mb-[33px]">
                <p className="mb-[2px]">Text</p>
                <input
                  value={dialogValues.text}
                  onChange={(e) => {
                    //
                    setDialogValues((prev) => ({
                      ...prev,
                      text: e.target.value,
                    }));
                  }}
                  className="h-10 ring-1 ring-[#D9D9D9] w-full rounded-[1px] placeholder:text-[#595959] placeholder:w-full  px-3 outline-none"
                  placeholder="This is a label"
                />
              </div>
              <div className="w-full mb-[33px]">
                <p className="mb-[2px]">X</p>
                <input
                  value={dialogValues.xCoord}
                  onChange={(e) => {
                    //
                    const input = e.target.value;
                    const numericValue = input.replace(/[^0-9]/g, "");
                    setDialogValues((prev) => ({
                      ...prev,
                      xCoord: numericValue,
                    }));
                  }}
                  className="h-10 ring-1 ring-[#D9D9D9] w-full rounded-[1px] placeholder:text-[#595959] placeholder:w-full  px-3 outline-none"
                  placeholder=""
                />
              </div>
              <div className="w-full mb-[33px]">
                <p className="mb-[2px]">Y</p>
                <input
                  value={dialogValues.yCoord}
                  onChange={(e) => {
                    //
                    const input = e.target.value;
                    const numericValue = input.replace(/[^0-9]/g, "");
                    setDialogValues((prev) => ({
                      ...prev,
                      yCoord: numericValue,
                    }));
                  }}
                  className="h-10 ring-1 ring-[#D9D9D9] w-full rounded-[1px] placeholder:text-[#595959] placeholder:w-full  px-3 outline-none"
                  placeholder=""
                />
              </div>
              <div className="w-full mb-[33px]">
                <p className="mb-[2px]">Font Size</p>
                <input
                  value={dialogValues.fontSize}
                  onChange={(e) => {
                    //
                    setDialogValues((prev) => ({
                      ...prev,
                      fontSize: e.target.value,
                    }));
                  }}
                  className="h-10 ring-1 ring-[#D9D9D9] w-full rounded-[1px] placeholder:text-[#595959] placeholder:w-full  px-3 outline-none"
                  placeholder=""
                />
              </div>
              <div className="w-full mb-[41px]">
                <p className="mb-[2px]">Font Weight</p>
                <input
                  value={dialogValues.fontWeight}
                  onChange={(e) => {
                    //
                    setDialogValues((prev) => ({
                      ...prev,
                      fontWeight: e.target.value,
                    }));
                  }}
                  className="h-10 ring-1 ring-[#D9D9D9] w-full rounded-[1px] placeholder:text-[#595959] placeholder:w-full  px-3 outline-none"
                  placeholder=""
                />
              </div>
              <button
                onClick={() => {
                  //
                  setDialogOpen(false);
                }}
                className="py-2 px-4 bg-[#0044C1] text-white rounded-[2px]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </dialog>
      )}
      <div className="h-screen w-screen bg-green-500 flex relative">
        <div
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

            // change to copy for plus sign
            e.dataTransfer.dropEffect = "copy";

            // get the coordinates for prefiling in the modal form
            const container = e.target;
            const rect = container.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            // console.log("x: ", offsetX, "y : ", offsetY);

            // get the tranffer data for which elment was dropped

            const someData = e.dataTransfer.getData("application/json");
            const parsedData = JSON.parse(someData);
            console.log("parsedData", parsedData);

            if (parsedData?.from === FROM_BLOCKS) {
              setDialogValues({
                ...initialValueDialogs,
                dialogHeading: parsedData?.heading,
                xCoord: offsetX,
                yCoord: offsetY,
              });
              setDialogOpen(true);
            }
          }}
        >
          {/* <p
            style={{
              left: `${dialogValues.xCoord || 0}px`,
              top: `${dialogValues.yCoord || 0}px`,
            }}
            className={`absolute`}
          >
            This is a label
          </p> */}
          <input className="w-72 p-3 ring-1 ring-[#D9D9D9] outline-none" />
        </div>
        <div className="w-[326px] bg-[#2D2D2D] h-full px-6">
          <h2 className="mt-4 mb-4 text-white font-bold">BLOCKS</h2>
          <ul className="flex flex-col gap-[9px]">
            {blocksData.map((eachBlock) => (
              <li
                key={eachBlock.id}
                id={eachBlock.id}
                className="cursor-grab active:cursor-grabbing w-full bg-white p-2 font-light flex items-center gap-[10px] rounded opacity-[0.99]"
                draggable
                onDragStart={(e) => {
                  const id = eachBlock.id;
                  const displayText = eachBlock.displayText;
                  e.dataTransfer.setData(
                    "application/json",
                    JSON.stringify({
                      id: id,
                      heading: displayText,
                      from: FROM_BLOCKS,
                    })
                  );
                }}
              >
                <img
                  draggable={false}
                  src={images.gripVertical}
                  alt="grip vertical "
                />
                <p className="">{eachBlock.displayText}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
