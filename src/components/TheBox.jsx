export const TheBox = ({
  id,
  uid,
  xCoord,
  yCoord,
  text,
  fontSize,
  fontWeight,
  onDragStartHandler,
  onDragEndHandler,
  onClickHandler,
  selected = false,
  onKeyDownHandler,
  moving = false,
}) => {
  if (id === "label") {
    return (
      <p
        tabIndex={0}
        onKeyDown={onKeyDownHandler}
        onClick={onClickHandler}
        id={uid}
        draggable
        style={{
          left: `${xCoord || 0}px`,
          top: `${yCoord || 0}px`,
        }}
        className={`cursor-grab absolute outline-none ${
          moving ? "opacity-50" : ""
        } ${selected ? "ring-2 ring-[#D95409]" : ""}`}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
      >
        {text}
      </p>
    );
  }
  if (id === "input") {
    return (
      <input
        onKeyDown={onKeyDownHandler}
        onClick={onClickHandler}
        id={uid}
        placeholder={text}
        draggable
        style={{
          left: `${xCoord || 0}px`,
          top: `${yCoord || 0}px`,
        }}
        className={`cursor-grab absolute w-72 p-3 outline-none ${
          moving ? "opacity-50" : ""
        } ${selected ? "ring-2 ring-[#D95409]" : "ring-1 ring-[#D9D9D9]"}`}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
      />
    );
  }
  if (id === "button") {
    return (
      <button
        onKeyDown={onKeyDownHandler}
        onClick={onClickHandler}
        id={uid}
        draggable
        style={{
          left: `${xCoord || 0}px`,
          top: `${yCoord || 0}px`,
        }}
        className={`cursor-grab absolute bg-[#0044C1] p-3 text-white ${
          moving ? "opacity-50" : ""
        } ${selected ? "ring-2 ring-[#D95409]" : ""}`}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
      >
        {text}
      </button>
    );
  }
};
