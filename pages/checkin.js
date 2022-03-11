/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { db } from "../firebase/db";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import Ticket from "../components/Ticket";
import Search from "../components/Search";

export async function getStaticProps() {
  const colRef = collection(db, "tickets");
  const snapshot = await getDocs(colRef);
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), ref: doc.id }));
  let initialTickets = [];
  let initialNoTickets;

  data.forEach((ticket) => {
    let generalTicketInfo = {
      ref: ticket.ref,
      confirmationNumber: ticket.confirmationNumber,
      seating: ticket.seating,
    };
    if (ticket.approved) {
      const newTicketArray = ticket.guests.map((guest, i) => {
        const newTicket = {
          ...guest,
          ...generalTicketInfo,
          index: i,
        };
        return newTicket;
      });
      initialNoTickets = false;
      initialTickets = [...initialTickets, ...newTicketArray];
    } else {
      initialNoTickets = true;
    }
  });
  return {
    props: {
      initialTickets,
      initialNoTickets,
    },
  };
}

export default function CheckinPage({ initialTickets, initialNoTickets }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [noTickets, setNoTickets] = useState(initialNoTickets);

  useEffect(() => {
    if (tickets.length > 0) {
      setNoTickets(false);
    }
  }, [tickets]);

  useEffect(() => {
    setTickets(
      tickets.filter((ticket) =>
        ticket.confirmationNumber.includes(searchQuery.toUpperCase())
      )
    );
    if (!searchQuery) {
      setTickets(initialTickets);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Header badges={false} />
      <div className="max-w-4xl px-4 md:px-2 mx-auto mt-24">
        <div className="mb-24">
          <Search searchQuery={searchQuery} handleSearch={handleSearch} />
        </div>
        {noTickets ? (
          <p className="text-center text-3xl">
            No tickets have been approved at this time
          </p>
        ) : (
          <div>
            {tickets.map((ticket, i) => (
              <Ticket key={ticket.id} ticket={ticket} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
