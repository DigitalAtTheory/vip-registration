export default function GuestInputs({ index, numberOfTickets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
      <div className="md:mt-4">
        <label
          htmlFor={`guestFirstName-${index}`}
          className="block text-sm font-medium text-gray-50 uppercase"
        >
          First Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name={`guestFirstName-${index}`}
            placeholder="Enter your guest's first name"
            className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor={`guestLastName-${index}`}
          className="block text-sm font-medium text-gray-50 uppercase"
        >
          Last Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name={`guestLastName-${index}`}
            placeholder="Enter your guest's last name"
            className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
          />
        </div>
      </div>
      {index + 1 !== numberOfTickets && (
        <hr className="my-12 border-gold-500 w-1/2 border-2 mx-auto md:hidden" />
      )}
    </div>
  );
}
