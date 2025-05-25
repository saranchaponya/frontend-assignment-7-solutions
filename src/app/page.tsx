"use client";

import { useRef, useState } from "react";

interface data {
  type: string;
  name: string;
}

export default function Home() {
  /* Variables */
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  /* States */
  const [list, setList] = useState<data[]>([
    { type: "Fruit", name: "Apple" },
    { type: "Vegetable", name: "Broccoli" },
    { type: "Vegetable", name: "Mushroom" },
    { type: "Fruit", name: "Banana" },
    { type: "Vegetable", name: "Tomato" },
    { type: "Fruit", name: "Orange" },
    { type: "Fruit", name: "Mango" },
    { type: "Fruit", name: "Pineapple" },
    { type: "Vegetable", name: "Cucumber" },
    { type: "Fruit", name: "Watermelon" },
    { type: "Vegetable", name: "Carrot" },
  ]);
  const [fruit, setFruit] = useState<data[]>([]);
  const [vegetable, setVegetable] = useState<data[]>([]);

  /* Functions */
  const moveToList = (item: data) => {
    if (item.type === "Fruit") {
      setFruit((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetable((prev) => prev.filter((i) => i.name !== item.name));
    }

    setList((prev) => [...prev, item]);

    const timeout = timeoutsRef.current.get(item.name);

    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(item.name);
    }
  };

  const onClickList = (item: data) => {
    setList((prev) => prev.filter((i) => i.name !== item.name));

    if (item.type === "Fruit") {
      setFruit((prev) => [...prev, item]);
    } else {
      setVegetable((prev) => [...prev, item]);
    }

    const timeout = setTimeout(() => {
      moveToList(item);
    }, 5000);

    timeoutsRef.current.set(item.name, timeout);
  };

  /* Render */
  return (
    <>
      <main>
        <div className="grid grid-cols-3 gap-2 p-[20px]">
          <div id="section-1">
            {list.map((item, index) => (
              <div
                key={index}
                className="border-1 border-solid cursor-pointer text-center mb-2"
                onClick={() => onClickList(item)}
              >
                {item.name}
              </div>
            ))}
          </div>

          <div id="section-2">
            <div className="border-1 border-solid border-b-0 text-center">
              <b>fruit</b>
            </div>

            <div className="border-1 border-solid cursor-pointer text-center mb-2 min-h-[340px]">
              {fruit.map((item, index) => (
                <div
                  key={index}
                  onClick={() => moveToList(item)}
                  className="border-1 border-solid cursor-pointer text-center m-2"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div id="section-3">
            <div className="border-1 border-solid border-b-0 text-center">
              <b>Vegetable</b>
            </div>

            <div className="border-1 border-solid cursor-pointer text-center mb-2 min-h-[340px]">
              {vegetable.map((item, index) => (
                <div
                  key={index}
                  onClick={() => moveToList(item)}
                  className="border-1 border-solid cursor-pointer text-center m-2"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer />
    </>
  );
}
