import Input from "./Input";
import Radios from "./Radios";
import Select from "./Select";

export default function StepOne({
  setStep,
  basicInfo,
  setBasicInfo,
  seating,
  setSeating,
  ticketOptions,
  numberOfTickets,
  setNumberOfTickets,
}) {
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
      <Radios seating={seating} setSeating={setSeating} />
      <Select
        ticketOptions={ticketOptions}
        numberOfTickets={numberOfTickets}
        setNumberOfTickets={setNumberOfTickets}
      />
      <div className="mt-12 mb-24">
        <button
          className="font-medium bg-gold-500 hover:bg-gold-200 hover:text-gold-800 text-gray-900 block w-full md:w-1/2 mx-auto rounded py-2 px-4"
          onClick={() => setStep(2)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
