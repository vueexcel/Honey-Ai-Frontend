import { Character } from "@/types/character";
import Button from "../ui/Button";
import WandIcon from "../icons/WandIcon";
import { ArrowLeft, Camera, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import PersonalityIcon from "../icons/PersonalityIcon";
import OccupationIcon from "../icons/OccupationIcon";
import HobbiesIcon from "../icons/HobbiesIcon";
import RelationshipIcon from "../icons/RelationshipIcon";
import AgeIcon from "../icons/AgeIcon";
import ZodiacIcon from "../icons/ZodiacIcon";
const sarahMitchellProfile = {
  personality: [
    { title: "Personality", value: "Driven and professional", icon: PersonalityIcon },
    { title: "Occupation", value: "Lawyer", icon: OccupationIcon },
    { title: "Hobbies", value: "Reading • Hiking", icon: HobbiesIcon },
    { title: "Relationship", value: "Married", icon: RelationshipIcon },
  ],
  physical: [
    { title: "Age", value: "32", icon: AgeIcon },
    { title: "Zodiac Sign", value: "Pisces", icon: ZodiacIcon },
  ],
};

interface ProfileSidebarProps {
  characterId: string;
  activeCharacter: Character;
  toggleProfileSideBar: () => void;
}

const AttributeItem = ({ title, value, icon: Icon }) => (
  <li className="flex items-start gap-4 h-full">
    <div className="text-[var(--pink)] self-center">{Icon && <Icon size={20} />}</div>
    <div>
      <p className="text-lg font-bold text-[rgb(223,_186,_245)]">{title}</p>
      <p className="font-medium text-sm text-white gap-2">{value}</p>
    </div>
  </li>
);

export default function ProfileSidebar({ characterId, activeCharacter, toggleProfileSideBar }: ProfileSidebarProps) {
  const router = useRouter();
  return (
    <aside className="w-full h-full xl:w-[368px] bg-[var(--secondary)] flex flex-col xl:border-l xl:border-gray-700 xl:space-y-6 overflow-y-auto">
      <button
        className="flex xl:hidden py-3 px-6  items-center bg-transparent cursor-pointer text-white gap-2"
        onClick={toggleProfileSideBar}
      >
        <ArrowLeft size={24} />
        Back
      </button>
      <div className="max-w-[425px] max-h-[470px] xl:max-h-[400px] xl:max-w-full self-center">
        <img src={activeCharacter?.resized_images[0].default_url} alt="Profile" />
      </div>
      <div className="-top-8 bg-[var(--main)] p-6 rounded-t-4xl">
        <div>
          <h1 className="text-2xl font-bold mb-[3px]">
            {activeCharacter && <span>{`${activeCharacter.first_name} ${activeCharacter.last_name}`}</span>}
          </h1>
          <h3 className="text-base text-[var(--gray)] mb-3">{activeCharacter?.description}</h3>
        </div>
        <div className="space-y-3">
          <Button
            variant="gradient"
            className="w-full h-12 rounded-xl flex items-center justify-center text-base font-bold shadow-lg gap-2"
            onClick={() => router.push("/create-character")}
          >
            <WandIcon size={22} />
            Create Your Own Character
          </Button>
          <button className="w-full text-[18px] text-white hover:bg-linear-[91deg,_rgb(101,_223,_113),_rgb(68,_144,_76)] bg-linear-[91deg,_rgb(116,_255,_130),_rgb(81,_165,_90)] font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 cursor-pointer">
            <Phone fill="white" size={24} strokeWidth={0.5} />
            Call Me
          </button>
          <button
            onClick={() => router.push(`/ai-girlfriend-generator?character=${characterId}`)}
            className="w-full flex items-center justify-center gap-2 border border-pink-400 text-pink-400 font-semibold py-3 rounded-lg hover:bg-pink-400/10 transition-colors"
          >
            <Camera size={20} /> Generate Photo
          </button>
        </div>
        <div className="space-y-6 mt-8">
          <div>
            <h2 className="font-bold mb-4 text-xl">Personality Attributes</h2>
            <ul className="space-y-4 text-sm">
              {sarahMitchellProfile.personality.map((attr) => (
                <AttributeItem key={attr.title} {...attr} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-xl">Physical Attributes</h3>
            <ul className="space-y-4">
              {sarahMitchellProfile.physical.map((attr) => (
                <AttributeItem key={attr.title} {...attr} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
