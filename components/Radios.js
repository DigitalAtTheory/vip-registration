import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const seatingOptions = ["Trackside VIP", "Terrace VIP"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Radios({ seating, setSeating }) {
  return (
    <div className="mt-8">
      <div>
        <h2 className="text-sm font-medium text-gray-50 uppercase">
          Seating Area (Select One)
        </h2>
      </div>
      <RadioGroup value={seating} onChange={setSeating} className="mt-2">
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
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
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
