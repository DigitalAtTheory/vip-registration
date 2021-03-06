import { useState } from "react";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/db";
import { v4 as uuidv4 } from "uuid";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const ticketOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Form() {
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
  });
  const [numberOfTickets, setNumberOfTickets] = useState(ticketOptions[0]);
  const [guests, setGuests] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(
    "You must fill out each input for all ticket requests"
  );

  const router = useRouter();

  const handleConfirm = (e) => {
    e.preventDefault();

    const inputs = [...Array(numberOfTickets)].map((_, i) => {
      const input = {
        firstName: `guestFirstName-${i}`,
        lastName: `guestLastName-${i}`,
        company: `company-${i}`,
      };
      return input;
    });
    let localError = false;
    const values = inputs.map((input) => {
      const guest = {
        firstName: e.target[`${input.firstName}`].value,
        lastName: e.target[`${input.lastName}`].value,
        company: e.target[`${input.company}`].value,
        checkedIn: false,
        checkedInTime: null,
        id: uuidv4(),
      };
      if (!guest.firstName || !guest.lastName || !guest.company) {
        setError(true);
        localError = true;
      } else {
        setError(false);
        localError = false;
        return guest;
      }
    });
    if (!localError) {
      setGuests(values);
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    const confirmationNumber = getConfirmationNumber();
    const submissionObject = {
      basicInfo,
      numberOfTickets,
      guests,
      confirmationNumber,
      seating: null,
      needsApproval: true,
      approved: null,
    };

    const colRef = collection(db, "tickets");

    await addDoc(colRef, submissionObject);

    router.push("/confirmation");
  };

  function generateRandomNumber() {
    const minm = 100000;
    const maxm = 999999;
    const num = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return num;
  }

  function getRandomLetter() {
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }

  function getConfirmationNumber() {
    const number = generateRandomNumber();
    const firstLetter = getRandomLetter();
    const secondLetter = getRandomLetter();

    return `${firstLetter}${secondLetter}${number}`;
  }

  return (
    <div>
      {step === 1 ? (
        <StepOne
          setStep={setStep}
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          ticketOptions={ticketOptions}
          numberOfTickets={numberOfTickets}
          setNumberOfTickets={setNumberOfTickets}
        />
      ) : step === 2 ? (
        <StepTwo
          numberOfTickets={numberOfTickets}
          handleConfirm={handleConfirm}
          setStep={setStep}
          error={error}
          message={message}
        />
      ) : step === 3 ? (
        <StepThree
          guests={guests}
          basicInfo={basicInfo}
          numberOfTickets={numberOfTickets}
          setStep={setStep}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div>Something is wrong with the form</div>
      )}
    </div>
  );
}
