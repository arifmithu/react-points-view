import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const mouseDownPositionRef = useRef({ x: 0, y: 0, isDown: false });
  const [viewBoxPosition, setViewBoxPosition] = useState({ x: 0, y: 0 });
  const points = [
    [4, 5],
    [20, 55],
    [40, 15],
    [32, 50],
    [45, 70],
    [400, 100],
    [300, 500],
    [402, 79],
    [320, 500],
    [450, 701],
    [409, 1000],
    [380, 501],
  ];

  const onMouseDown = (event) => {
    mouseDownPositionRef.current = {
      x: event.clientX,
      y: event.clientY,
      isDown: true,
    };
  };
  const onMouseMove = (event) => {
    if (mouseDownPositionRef.current.isDown) {
      const currentX = event.clientX;
      const currentY = event.clientY;
      const { x, y } = mouseDownPositionRef.current;
      setViewBoxPosition({
        x: viewBoxPosition.x + x - currentX,
        y: viewBoxPosition.y + y - currentY,
      });
      mouseDownPositionRef.current.x = currentX;
      mouseDownPositionRef.current.y = currentY;
    }
  };
  const onMouseUp = (event) => {
    const currentX = event.clientX;
    const currentY = event.clientY;
    setViewBoxPosition({
      x: viewBoxPosition.x + mouseDownPositionRef.current.x - currentX,
      y: viewBoxPosition.y + mouseDownPositionRef.current.y - currentY,
    });
    mouseDownPositionRef.current.isDown = false;
  };

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return (
    <div>
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox={`${viewBoxPosition.x} ${viewBoxPosition.y} 200 200`}
        width="200"
        height="200"
        className="border"
      >
        {points.map((point, index) => (
          <circle key={index} cx={point[0]} cy={point[1]} r="2" fill="red" />
        ))}
      </svg>
    </div>
  );
}

export default App;
