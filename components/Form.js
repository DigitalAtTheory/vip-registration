import { useState } from "react";
import { useRouter } from "next/router";
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
  const [seating, setSeating] = useState();
  const [numberOfTickets, setNumberOfTickets] = useState(ticketOptions[0]);
  const [guests, setGuests] = useState([]);

  const router = useRouter();

  const handleConfirm = (e) => {
    e.preventDefault();

    const inputs = [...Array(numberOfTickets)].map((_, i) => {
      const input = {
        firstName: `guestFirstName-${i}`,
        lastName: `guestLastName-${i}`,
      };
      return input;
    });
    const values = inputs.map((input) => {
      const guest = {
        firstName: e.target[`${input.firstName}`].value,
        lastName: e.target[`${input.lastName}`].value,
        needsApproval: true,
        approved: null,
      };
      return guest;
    });

    setGuests(values);
    setStep(3);
  };

  const handleSubmit = () => {
    const submissionObject = {
      basicInfo,
      seating,
      numberOfTickets,
      guests,
    };

    console.log(submissionObject);
    router.push("/confirmation");
  };

  return (
    <div>
      {step === 1 ? (
        <StepOne
          setStep={setStep}
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          seating={seating}
          setSeating={setSeating}
          ticketOptions={ticketOptions}
          numberOfTickets={numberOfTickets}
          setNumberOfTickets={setNumberOfTickets}
        />
      ) : step === 2 ? (
        <StepTwo
          numberOfTickets={numberOfTickets}
          handleConfirm={handleConfirm}
          setStep={setStep}
        />
      ) : step === 3 ? (
        <StepThree
          guests={guests}
          basicInfo={basicInfo}
          seating={seating}
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
