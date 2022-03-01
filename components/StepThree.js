export default function StepThree({
  guests,
  basicInfo,
  seating,
  numberOfTickets,
  setStep,
  handleSubmit,
}) {
  return (
    <div>
      <h2 className="text-center text-2xl font-medium mb-4">
        Confirm your submission details
      </h2>
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-3">Basic Information:</h3>
        <div className="flex gap-12 mb-2">
          <div>
            <p className="font-bold uppercase text-sm text-gold-500">
              First Name:
            </p>
            <p className="text-lg">{basicInfo.firstName}</p>
          </div>
          <div>
            <p className="font-bold uppercase text-sm text-gold-500">
              Last Name:
            </p>
            <p className="text-lg">{basicInfo.lastName}</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="font-bold uppercase text-sm text-gold-500">E-mail:</p>
          <p className="text-lg">{basicInfo.email}</p>
        </div>
        <div>
          <p className="font-bold uppercase text-sm text-gold-500">Zip Code:</p>
          <p className="text-lg">{basicInfo.zipCode}</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-3">Seating Area:</h3>
        <p className="font-bold text-xl bg-gold-200 text-gold-800 uppercase py-2 px-4 rounded inline-block">
          {seating}
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-3">
          Number of Tickets:{" "}
          <span className="bg-gold-200 py-2 px-3 ml-2 text-xl text-gold-800 rounded">
            {numberOfTickets}
          </span>
        </h3>
      </div>
      <div className="mb-12">
        <h3 className="font-bold text-xl mb-3">Ticket Holders:</h3>
        <ul className="flex gap-12">
          {guests.map((guest, i) => (
            <li className="text-lg" key={`${guest.firstName}-${i}`}>
              {guest.firstName} {guest.lastName}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-12">
        <button
          onClick={() => setStep(2)}
          className="font-medium bg-gold-500 hover:bg-gold-200 hover:text-gold-800 text-gray-900 block w-full mx-auto rounded py-2 px-4"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="font-medium bg-gold-500 hover:bg-gold-200 hover:text-gold-800 text-gray-900 block w-full mx-auto rounded py-2 px-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
