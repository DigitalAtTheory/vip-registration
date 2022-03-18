/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/db";
import Radios from "./Radios";

export default function DashboardTicket({ ticket }) {
  const [seating, setSeating] = useState(ticket.seating);

  useEffect(async () => {
    if (!ticket.seating) {
      switch (ticket.confirmationNumber) {
        case "AV340885":
          setSeating("Terrace VIP");
          break;
        case "KP309612":
          setSeating("Trackside VIP");
          break;
        case "RA979966":
          setSeating("Trackside VIP");
          break;
        default:
          break;
      }
    }

    const docRef = doc(db, "tickets", ticket.ref);

    try {
      await updateDoc(docRef, {
        seating: seating,
      });
    } catch (error) {
      console.log(error);
    }
  }, [seating]);

  const handleApproveDeny = async (approved) => {
    const docRef = doc(db, "tickets", ticket.ref);
    if (approved) {
      await updateDoc(docRef, {
        approved: true,
        needsApproval: false,
      });
    } else if (!approved) {
      await updateDoc(docRef, {
        approved: false,
        needsApproval: false,
      });
    }
  };

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
        <div className="flex flex-col gap-2 md:flex-row md:gap-8 md:items-center mb-4 md:mb-2">
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
              className="grid grid-cols-1 mb-3 md:mb-0 md:grid-cols-3 md:gap-x-2 items-center"
            >
              <div className="flex items-center gap-2 mb-2 col-span-2">
                <p className="border-2 border-gold-500 text-gold-500 font-bold px-2 rounded">
                  {i + 1}
                </p>
                <div>
                  <p className="">
                    {guest.firstName} {guest.lastName}
                  </p>
                  <p className="text-xs uppercase text-ellipsis whitespace-nowrap max-w-max w-52 overflow-hidden text-gray-800 font-bold bg-gray-200 px-2 rounded-full">
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
                  <p className="text-xs bg-green-200 font-bold text-center py-1 text-green-600 uppercase px-2 rounded-full">
                    Checked In: {guest.checkedInTime}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {ticket.needsApproval && (
        <div className="-mt-px flex divide-x-2 divide-gray-400 border-t border-gray-400">
          <div className="w-0 flex-1 flex">
            <button
              onClick={() => handleApproveDeny(true)}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-50 uppercase font-bold bg-emerald-400 hover:bg-emerald-200 border border-transparent rounded-bl hover:text-emerald-600"
            >
              Approve
            </button>
          </div>
          <div className="w-0 flex-1 flex">
            <button
              onClick={() => handleApproveDeny(false)}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-white uppercase bg-red-400 font-bold border border-transparent rounded-br hover:bg-red-200 hover:text-red-600"
            >
              Deny
            </button>
          </div>
        </div>
      )}
      {!ticket.needsApproval && ticket.approved && (
        <div className="rounded-b bg-green-300 py-2 text-center">
          <p className="font-bold uppercase text-sm text-green-700">Approved</p>
          <p className="text-green-700 font-bold">
            <span className="font-normal text-sm mr-1">Confirmation #:</span>{" "}
            {ticket.confirmationNumber}
          </p>
        </div>
      )}
      {!ticket.needsApproval && !ticket.approved && (
        <div className="rounded-b bg-red-300 py-2 text-center">
          <p className="font-bold uppercase text-sm text-red-700">
            Ticket Request Denied
          </p>
        </div>
      )}
    </div>
  );
}
