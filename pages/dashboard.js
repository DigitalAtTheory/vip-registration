import { useState, useEffect } from "react";
import Header from "../components/Header";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/db";
import DashboardTicket from "../components/DashboardTicket";

export async function getStaticProps() {
  const colRef = collection(db, "tickets");
  const snapshot = await getDocs(colRef);
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), ref: doc.id }));
  return {
    props: {
      data,
    },
  };
}

export default function DashboardPage({ data }) {
  const [tickets, setTickets] = useState(data);

  useEffect(() => {
    const colRef = collection(db, "tickets");
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      let updatedTickets = [];
      querySnapshot.forEach((doc) => {
        let ticket = { ...doc.data() };
        updatedTickets = [ticket, ...updatedTickets];
      });
      setTickets(updatedTickets);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header badges={false} />
      <div className="mt-24 mx-auto max-w-4xl">
        <div className="flex flex-wrap gap-8">
          {tickets.map((ticket) => (
            <DashboardTicket key={ticket.confirmationNumber} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
