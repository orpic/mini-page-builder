import { images } from "../assets/images";
import { initialValueDialogs } from "../constants";
import { getUID } from "../utils";

export const DialogBox = ({
  dialogOpen,
  setDialogOpen,
  dialogValues,
  setDialogValues,
  setBoxList,
}) => {
  return (
    <dialog
      open={dialogOpen}
      onKeyDown={(e) => {
        // console.log(e);
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
              placeholder={dialogValues?.placeholder}
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
              let text = "";
              if (dialogValues?.id === "label") {
                text = "This is a label";
              }
              if (dialogValues?.id === "input") {
                text = "Input Box";
              }
              if (dialogValues?.id === "button") {
                text = "Button name";
              }
              //
              // console.log("ddd");
              //editing saved ]
              if (dialogValues.uid) {
                setBoxList((prev) => {
                  const boxIndex = prev.findIndex(
                    (box) => box.uid === dialogValues?.uid
                  );

                  if (boxIndex !== -1) {
                    const newBox = {
                      ...prev[boxIndex],
                      text: dialogValues?.text || text,
                      xCoord: dialogValues.xCoord,
                      yCoord: dialogValues.yCoord,
                      fontSize: dialogValues?.fontSize,
                      fontWeight: dialogValues?.fontWeight,
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
                setDialogOpen(false);
                return;
              }
              // new creation
              setBoxList((prev) => [
                ...prev,
                {
                  uid: getUID(),
                  id: dialogValues?.id,
                  text: dialogValues?.text || text,
                  xCoord: dialogValues?.xCoord,
                  yCoord: dialogValues?.yCoord,
                  fontSize: dialogValues?.fontSize,
                  fontWeight: dialogValues?.fontWeight,
                },
              ]);
              setDialogOpen(false);
              setDialogValues(initialValueDialogs);
            }}
            className="py-2 px-4 bg-[#0044C1] text-white rounded-[2px]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
};
