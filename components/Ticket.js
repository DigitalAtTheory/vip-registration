/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { db } from "../firebase/db";
import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";

export default function Ticket({ ticket, index }) {
  const [localTicket, setLocalTicket] = useState(ticket);

  useEffect(() => {
    const docRef = doc(db, "tickets", ticket.ref);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      let newTicket = {
        ref: ticket.ref,
        confirmationNumber: ticket.confirmationNumber,
        seating: ticket.seating,
      };
      const addedIndex = data.guests.map((guest, i) => {
        return {
          ...guest,
          index: i,
        };
      });
      const guestInfo = addedIndex.find((guest) => guest.id === ticket.id);
      newTicket = { ...newTicket, ...guestInfo };
      setLocalTicket(newTicket);
    });

    return () => unsubscribe();
  }, []);

  const handleCheckIn = async () => {
    const time = getCurrentTime();
    const docRef = doc(db, "tickets", ticket.ref);
    const currentDoc = await getDoc(docRef);
    const guests = currentDoc.data().guests.map((guest, i) => {
      return {
        ...guest,
        index: i,
      };
    });

    guests.forEach((guest, i) => {
      if (localTicket.index === guest.index) {
        guest.checkedIn = true;
        guest.checkedInTime = time;
      }
    });

    await updateDoc(docRef, {
      guests: [...guests],
    });
  };

  const getCurrentTime = () => {
    const time = new Date();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const day = time.getDate();
    const clockTime = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const timeString = `${month}/${day}/${year} - ${clockTime}`;

    return timeString;
  };

  return (
    <div className="bg-white pt-2 my-4 rounded shadow">
      <div className="px-2 mb-4 flex justify-between items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold text-gray-800 mb-1">
              {localTicket.firstName} {localTicket.lastName}
            </h2>
            <p className="max-w-max w-52 text-ellipsis overflow-hidden whitespace-nowrap uppercase text-xs font-bold text-gray-700 bg-gray-200 px-2 rounded-full">
              {localTicket.company}
            </p>
          </div>
          <div className="bg-slate-200 text-slate-700 text-center font-medium py-1 px-3 rounded flex items-center justify-center max-w-max">
            {localTicket.seating}
          </div>
        </div>
        <div>
          {localTicket.checkedIn ? (
            <p className="bg-gold-200 text-gold-600 px-3 py-2 rounded">
              Checked In: {localTicket.checkedInTime}
            </p>
          ) : (
            <button
              onClick={handleCheckIn}
              className="bg-gold-500 text-gray-800 px-3 py-2 rounded"
            >
              Check In
            </button>
          )}
        </div>
      </div>
      <div className="bg-green-200 px-2 py-2 rounded-b text-green-600 font-bold">
        <p>
          <span className="text-sm uppercase">Confirmation #:</span>{" "}
          {localTicket.confirmationNumber}
        </p>
      </div>
    </div>
  );
}
