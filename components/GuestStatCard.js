export default function GuestStatCard({
  title,
  guests,
  checkedin,
  remaining,
  trackside,
}) {
  return (
    <div className="bg-gray-50 text-gray-900 rounded overflow-hidden">
      <h2
        className={`${
          trackside ? "bg-gold-200 text-gold-700" : "bg-gray-800 text-gray-200"
        } text-center text-2xl py-2`}
      >
        {title}
      </h2>
      <div className="flex flex-col divide-y divide-gray-300 px-6">
        <div className="py-4 flex gap-8 items-center">
          <p className="uppercase text-lg">Total Guests:</p>
          <p className="text-xl font-bold bg-gold-500 text-gold-800 px-4 py-2 rounded">
            {guests.length}
          </p>
        </div>
        <div className="py-4 flex gap-8 items-center">
          <p className="uppercase text-lg">Guests Checked-in:</p>
          <p className="text-xl font-bold bg-green-400 text-green-800 px-4 py-2 rounded">
            {checkedin.length}
          </p>
        </div>
        <div className="py-4 flex gap-8 items-center">
          <p className="uppercase text-lg">Guests Needing to Check-in:</p>
          <p className="text-xl font-bold bg-red-400 text-red-900 px-4 py-2 rounded">
            {remaining.length}
          </p>
        </div>
      </div>
    </div>
  );
}
