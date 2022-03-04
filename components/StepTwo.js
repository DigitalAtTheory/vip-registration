import GuestInputs from "./GuestInputs";

export default function StepTwo({
  numberOfTickets,
  handleConfirm,
  setStep,
  error,
  message,
}) {
  return (
    <div className="mb-24">
      <h2 className="font-medium text-lg mb-8 md:mb-4">
        Enter the names for your tickets (including yourself)
      </h2>
      <form onSubmit={handleConfirm}>
        <div>
          {[...Array(numberOfTickets)].map((_, i) => (
            <GuestInputs
              key={`guestInputs-${i}`}
              index={i}
              numberOfTickets={numberOfTickets}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 my-12">
          <button
            onClick={() => setStep(1)}
            type="button"
            className="font-medium bg-gold-500 hover:bg-gold-200 hover:text-gold-800 text-gray-900 block w-full mx-auto rounded py-2 px-4"
          >
            Back
          </button>
          <button
            type="submit"
            className="font-medium bg-gold-500 hover:bg-gold-200 hover:text-gold-800 text-gray-900 block w-full mx-auto rounded py-2 px-4"
          >
            Confirm
          </button>
        </div>
        <div className="mb-24 text-center">
          {error && <p className="text-red-500">{message}</p>}
        </div>
      </form>
    </div>
  );
}
