import { useState } from "react";
import Radios from "./Radios";

export default function DashboardTicket({ ticket }) {
  const [seating, setSeating] = useState(ticket.seating);
  return (
    <div className="bg-white shadow-lg flex flex-col justify-between rounded text-gray-900">
      <div className="px-4 py-4">
        <div className="text-center mb-6">
          <p className="font-bold">
            {ticket.basicInfo.firstName} {ticket.basicInfo.lastName}
          </p>
          <p className="font-medium mt-1">{ticket.basicInfo.email}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold uppercase text-sm flex items-center gap-2">
            Number of Tickets:{" "}
            <span className="bg-gold-500 text-gold-700 text-lg py-1 px-3 rounded">
              {ticket.numberOfTickets}
            </span>
          </p>
        </div>
        <div className="flex gap-8 items-center mb-2">
          <p className="font-bold uppercase text-sm">Seating:</p>
          <Radios seating={seating} setSeating={setSeating} />
        </div>
        <div className="flex items-center gap-8 mb-1">
          <p className="font-bold uppercase text-sm">Tickets:</p>
        </div>
        <div>
          {ticket.guests.map((guest, i) => (
            <div
              key={`${guest.firstName}-${i}`}
              className="grid grid-cols-2 items-center"
            >
              <div className="flex items-center gap-2 mb-2">
                <p className="border-2 border-gold-500 text-gold-500 font-bold px-2 rounded">
                  {i + 1}
                </p>
                <div>
                  <p className="">
                    {guest.firstName} {guest.lastName}
                  </p>
                  <p className="text-xs uppercase text-gray-800 font-bold bg-gray-200 px-2 rounded-full">
                    {guest.company}
                  </p>
                </div>
              </div>
              <div>
                {!guest.checkedIn ? (
                  <p className="text-xs bg-red-200 font-bold text-center py-1 text-red-600 uppercase px-2 rounded-full">
                    Not Checked In
                  </p>
                ) : (
                  <p>Checked In</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {ticket.needsApproval && (
        <div className="-mt-px flex divide-x-2 divide-gray-400 border-t border-gray-400">
          <div className="w-0 flex-1 flex">
            <button className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-50 uppercase font-bold bg-emerald-400 hover:bg-emerald-200 border border-transparent rounded-bl hover:text-emerald-600">
              Approve
            </button>
          </div>
          <div className="w-0 flex-1 flex">
            <button className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-white uppercase bg-red-400 font-bold border border-transparent rounded-br hover:bg-red-200 hover:text-red-600">
              Deny
            </button>
          </div>
        </div>
      )}
    </div>
  );
}