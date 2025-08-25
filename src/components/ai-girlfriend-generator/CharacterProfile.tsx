import { Character } from "@/types/character";
import ReplayIcon from "../icons/ReplayIcon";
import UserIcon from "../icons/UserIcon";
import MyAI from "../icons/MyAI";

type CharacterProfileProps = {
  onSelect?: () => void;
  curCharacter: Character | null;
};
const CharacterProfile = ({ onSelect, curCharacter }: CharacterProfileProps) => {
  return curCharacter ? (
    <div className="relative max-w-xs mx-auto w-[250px] h-[250px] overflow-hidden">
      <img
        src={curCharacter?.resized_images[0].default_url}
        alt={curCharacter?.first_name}
        className="rounded-xl object-cover"
      />
      <div className="absolute w-full bottom-0 left-0 p-4 text-white flex justify-between">
        <p className="font-semibold">{curCharacter?.first_name}</p>
        <button
          onClick={onSelect}
          className="bg-[#ffffff1a] rounded-lg border border-[rgba(255,255,255,0.1)] w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <ReplayIcon className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  ) : (
    <div className="relative w-full xl:w-[250px] h-[165px] flex flex-col justify-center items-center gap-6 rounded-xl border-4 border-dashed border-[#24162c] overflow-hidden shrink-0">
      <MyAI className="h-8 w-8 text-[#ccc]" />
      <button
        className="px-6 py-3 rounded-xl font-semibold text-base bg-[#1f1625] text-[var(--accent)]"
        onClick={onSelect}
      >
        Choose character
      </button>
    </div>
  );
};
export default CharacterProfile;
