import GuestInputs from "./GuestInputs";

export default function StepTwo({ numberOfTickets, handleConfirm, setStep }) {
  return (
    <div className="mb-24">
      <h2 className="font-medium text-lg">
        Enter the names for your tickets (including yourself)
      </h2>
      <form onSubmit={handleConfirm}>
        <div>
          {[...Array(numberOfTickets)].map((_, i) => (
            <GuestInputs key={`guestInputs-${i}`} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-12">
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
      </form>
    </div>
  );
}
