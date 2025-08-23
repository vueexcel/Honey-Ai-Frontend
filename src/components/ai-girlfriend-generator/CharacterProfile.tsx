import { Character } from "@/types/character";
import ReplayIcon from "../icons/ReplayIcon";

type CharacterProfileProps = {
  onSelect?: () => void;
  curCharacter: Character | null;
};

const CharacterProfile = ({ onSelect, curCharacter }: CharacterProfileProps) => (
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
        className="bg-[#ffffff1a] rounded-lg border-1 border-[rgba(255,_255,_255,_.1)] w-8 h-8 flex items-center justify-center cursor-pointer"
      >
        <ReplayIcon color="white" />
      </button>
    </div>
  </div>
);

export default CharacterProfile;
