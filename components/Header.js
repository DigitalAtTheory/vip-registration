import Image from "next/image";
import lockup from "../public/Mobil-1-AAP-Lockup-2022.svg";
import eventLogo from "../public/Badges.png";

export default function Header({ badges }) {
  return (
    <div>
      <div className="bg-black text-center py-4 px-8 border-b-8 border-gold-500">
        <Image
          src={lockup}
          alt="Mobil 1 and Advance Auto Parts Logo"
          priority
        />
      </div>
      {badges && (
        <div className="w-2/3 md:w-1/3 mx-auto">
          <Image src={eventLogo} alt="Sebring VIP Badge" />
        </div>
      )}
    </div>
  );
}
