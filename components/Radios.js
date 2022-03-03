import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const seatingOptions = ["Trackside VIP", "Terrace VIP"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Radios({ seating, setSeating }) {
  return (
    <div>
      <RadioGroup value={seating} onChange={setSeating}>
        <RadioGroup.Label className="sr-only">
          Choose a seating area
        </RadioGroup.Label>
        <div className="grid grid-cols-2 gap-3">
          {seatingOptions.map((option) => (
            <RadioGroup.Option
              key={option}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  active ? "ring-2 ring-offset-2 ring-gold-500" : "",
                  checked
                    ? "bg-gold-600 border-transparent text-white"
                    : "bg-gray-50 shadow-md border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md py-1.5 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                )
              }
            >
              <RadioGroup.Label as="p">{option}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
