import { images } from "../assets/images";
import { FROM_BLOCKS, blocksData } from "../constants";

export const SideBar = ({ importBoxList, exportBoxList }) => {
  return (
    <>
      <h2 className="mt-4 mb-4 text-white font-bold">BLOCKS</h2>
      <ul className="flex flex-col gap-[9px]">
        {blocksData.map((eachBlock) => (
          <li
            key={eachBlock.id}
            id={eachBlock.id}
            className="cursor-grab active:cursor-grabbing w-full bg-white p-2 font-light flex items-center gap-[10px] rounded opacity-[0.99]"
            draggable
            onDragStart={(e) => {
              const container = e.target;
              const rect = container.getBoundingClientRect();
              // console.log(
              //   "rect",
              //   rect,
              //   e.clientX - rect.left,
              //   e.clientY - rect.top
              // );
              const id = eachBlock.id;
              const displayText = eachBlock.displayText;

              e.dataTransfer.setData(
                "application/json",
                JSON.stringify({
                  id: id,
                  heading: displayText,
                  from: FROM_BLOCKS,
                  mouseOffsetLeft: e.clientX - rect.left,
                  mouseOffsetTop: e.clientY - rect.top,
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
      <div className="flex flex-col mt-auto pb-4 gap-2">
        <button
          onClick={exportBoxList}
          className="bg-gray-400 py-2 rounded-md font-semibold text-lg"
        >
          Export current layout
        </button>
        <label
          //   id="importFile"
          htmlFor="importFile"
          className="bg-gray-400 py-2 rounded-md font-semibold text-lg text-center"
        >
          Import JSON File
        </label>
        <input
          type="file"
          id="importFile"
          className="hidden"
          placeholder="Import JSON File"
          onChange={(e) => {
            // console.log(e);
            if (e === undefined) return;
            const selectedFile = e.target.files[0];
            importBoxList(selectedFile);
          }}
        />
      </div>
    </>
  );
};
