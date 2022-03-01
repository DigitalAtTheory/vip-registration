import Image from "next/image";
import lockup from "../public/Mobil-1-AAP-Lockup-2022.svg";
import badges from "../public/Badges.png";

export default function Header() {
  return (
    <div>
      <div className="bg-black text-center py-4 border-b-8 border-gold-500">
        <Image
          src={lockup}
          alt="Mobil 1 and Advance Auto Parts Logo"
          priority
        />
      </div>
      <div className="w-1/3 mx-auto">
        <Image src={badges} alt="Sebring VIP Badge" />
      </div>
    </div>
  );
}
