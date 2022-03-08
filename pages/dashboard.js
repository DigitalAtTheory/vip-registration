import { useState, useEffect } from "react";
import Header from "../components/Header";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/db";
import DashboardTicket from "../components/DashboardTicket";

export async function getStaticProps() {
  const colRef = collection(db, "tickets");
  const snapshot = await getDocs(colRef);
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), ref: doc.id }));
  const initialTotalTickets = [];
  const approvedNumberOfTickets = [];
  const deniedNumberOfTickets = [];
  data.forEach((doc) => {
    initialTotalTickets.push(...doc.guests);
    if (doc.approved) {
      approvedNumberOfTickets.push(doc.numberOfTickets);
    } else if (!doc.approved) {
      deniedNumberOfTickets.push(doc.numberOfTickets);
    }
  });

  const totalApprovedTickets = approvedNumberOfTickets.reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  const totalDeniedTickets = deniedNumberOfTickets.reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  return {
    props: {
      data,
      initialTotalTickets,
      initialTotalApprovedTickets: totalApprovedTickets,
      initialTotalDeniedTickets: totalDeniedTickets,
    },
  };
}

export default function DashboardPage({
  data,
  initialTotalTickets,
  initialTotalApprovedTickets,
  initialTotalDeniedTickets,
}) {
  const [tickets, setTickets] = useState(data);
  const [totalTickets, setTotalTickets] = useState(initialTotalTickets);
  const [totalApprovedTickets, setTotalApprovedTickets] = useState(
    initialTotalApprovedTickets
  );
  const [totalDeniedTickets, setTotalDeniedTickets] = useState(
    initialTotalDeniedTickets
  );

  useEffect(() => {
    const colRef = collection(db, "tickets");
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      let updatedTickets = [];
      let updatedTicketTotal = [];
      let updatedApprovedTickets = [];
      let updatedDeniedTickets = [];
      querySnapshot.forEach((doc) => {
        let ticket = { ...doc.data(), ref: doc.id };
        updatedTickets = [ticket, ...updatedTickets];
        updatedTicketTotal = [...ticket.guests, ...updatedTicketTotal];
        if (ticket.approved) {
          updatedApprovedTickets = [
            ticket.numberOfTickets,
            ...updatedApprovedTickets,
          ];
        } else if (ticket.approved === null) {
          return;
        } else if (!ticket.approved) {
          updatedDeniedTickets = [
            ticket.numberOfTickets,
            ...updatedDeniedTickets,
          ];
        }
      });

      updatedTickets.sort((a, b) => {
        if (a.needsApproval) {
          return -1;
        }
        if (b.approved) {
          return 1;
        }
      });
      setTickets(updatedTickets);
      setTotalTickets(updatedTicketTotal);
      setTotalApprovedTickets(
        updatedApprovedTickets.reduce((partialSum, a) => partialSum + a, 0)
      );
      setTotalDeniedTickets(
        updatedDeniedTickets.reduce((partialSum, a) => partialSum + a, 0)
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="mb-24">
      <Header badges={false} />
      <div className="mt-24 mx-auto max-w-4xl px-4 md:px-0">
        <div className="bg-white py-4 px-4 shadow-xl rounded text-gray-800 flex items-center gap-8 md:w-max mx-auto mb-6">
          <p className="uppercase text-lg">
            Total Number of Tickets Requested:
          </p>
          <p className="text-xl font-bold bg-gold-500 text-gold-800 px-4 py-2 rounded">
            {totalTickets.length}
          </p>
        </div>
        <div className="bg-white py-4 px-4 shadow-xl rounded text-gray-800 flex items-center gap-8 w-max mx-auto mb-6">
          <p className="uppercase text-lg">Total Approved Tickets:</p>
          <p className="text-xl font-bold bg-green-400 text-green-800 px-4 py-2 rounded">
            {totalApprovedTickets}
          </p>
        </div>
        <div className="bg-white py-4 px-4 shadow-xl rounded text-gray-800 flex items-center gap-8 w-max mx-auto mb-24">
          <p className="uppercase text-lg">Total Denied Tickets:</p>
          <p className="text-xl font-bold bg-red-400 text-red-900 px-4 py-2 rounded">
            {totalDeniedTickets}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tickets.map((ticket) => (
            <DashboardTicket key={ticket.confirmationNumber} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
