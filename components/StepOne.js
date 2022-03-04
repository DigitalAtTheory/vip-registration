import { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function StepOne({
  setStep,
  basicInfo,
  setBasicInfo,
  ticketOptions,
  numberOfTickets,
  setNumberOfTickets,
}) {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        setBasicInfo((prevState) => ({
          ...prevState,
          firstName: e.target.value,
        }));
        break;
      case "lastName":
        setBasicInfo((prevState) => ({
          ...prevState,
          lastName: e.target.value,
        }));
        break;
      case "email":
        setBasicInfo((prevState) => ({
          ...prevState,
          email: e.target.value,
        }));
        break;
      case "zipCode":
        setBasicInfo((prevState) => ({
          ...prevState,
          zipCode: e.target.value,
        }));
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    if (!basicInfo.firstName) {
      setError(true);
      setMessage("You must enter your first name.");
    } else if (!basicInfo.lastName) {
      setError(true);
      setMessage("You must enter your last name.");
    } else if (!basicInfo.email) {
      setError(true);
      setMessage("You must enter your email.");
    } else if (!basicInfo.zipCode) {
      setError(true);
      setMessage("You must enter your zip code.");
    } else {
      if (error) {
        setError(false);
      }
      setStep(2);
    }
  };

  return (
    <div>
      <Input
        name="firstName"
        type="text"
        label="First Name"
        placeholder="Please enter your first name"
        value={basicInfo.firstName}
        handleChange={handleChange}
      />
      <Input
        name="lastName"
        type="text"
        label="Last Name"
        placeholder="Please enter your last name"
        value={basicInfo.lastName}
        handleChange={handleChange}
      />
      <Input
        name="email"
        type="email"
        label="E-mail"
        placeholder="Please enter your email"
        value={basicInfo.email}
        handleChange={handleChange}
      />
      <Input
        name="zipCode"
        type="text"
        label="Zip Code"
        placeholder="Please enter your zip code"
        value={basicInfo.zipCode}
        handleChange={handleChange}
      />
      <Select
        ticketOptions={ticketOptions}
        numberOfTickets={numberOfTickets}
        setNumberOfTickets={setNumberOfTickets}
      />
      <div className="my-12">
        <button
          className="font-medium bg-gold-500 hover:bg-gold-200 hover:text-gold-800 text-gray-900 block w-full md:w-1/2 mx-auto rounded py-2 px-4"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div className="mb-24 text-center">
        {error && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
}
