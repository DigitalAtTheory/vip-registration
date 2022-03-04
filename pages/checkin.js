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
  data.forEach((ticket) => {
    let generalTicketInfo = {
      ref: ticket.ref,
      confirmationNumber: ticket.confirmationNumber,
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
      initialTickets = [...initialTickets, ...newTicketArray];
    } else {
      return;
    }
  });

  return {
    props: {
      initialTickets,
    },
  };
}

export default function CheckinPage({ initialTickets }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="max-w-4xl mx-auto mt-24">
        <div className="mb-24">
          <Search searchQuery={searchQuery} handleSearch={handleSearch} />
        </div>
        <div>
          {tickets.map((ticket, i) => (
            <Ticket key={ticket.id} ticket={ticket} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
