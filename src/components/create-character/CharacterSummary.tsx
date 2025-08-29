"use client";
import Button from "../ui/Button";
import PersonalityIcon from "../icons/PersonalityIcon";
import OccupationIcon from "../icons/OccupationIcon";
import HobbiesIcon from "../icons/HobbiesIcon";
import RelationshipIcon from "../icons/RelationshipIcon";
import AgeIcon from "../icons/AgeIcon";
import ZodiacIcon from "../icons/ZodiacIcon";
import EthnicityIcon from "../icons/EthnicityIcon";
import SlimBodyIcon from "../icons/SlimBodyIcon";
import { useUser } from "@/context/UserContextProvider";
import { useState } from "react";

const attributeMap = {
  Personality: { icon: PersonalityIcon, title: "Personality" },
  Occupation: { icon: OccupationIcon, title: "Occupation" },
  Hobbies: { icon: HobbiesIcon, title: "Hobbies" },
  Relationship: { icon: RelationshipIcon, title: "Relationship" },
  Age: { icon: AgeIcon, title: "Age" },
  Body_Type: { icon: SlimBodyIcon, title: "Body" },
  Ethnicity: { icon: EthnicityIcon, title: "Ethnicity" },
  Zodiac_Sign: { icon: ZodiacIcon, title: "Zodiac Sign" },
};

// Attribute item with icon
const AttributeItem = ({ title, value, icon: Icon }) => (
  <li className="flex items-start gap-4">
    <div className="text-[var(--pink)] self-center">{Icon && <Icon size={20} />}</div>
    <div>
      <p className="text-lg font-bold text-[rgb(223,_186,_245)]">{title}</p>
      <p className="font-medium text-sm text-white">{Array.isArray(value) ? value.join(" • ") : value}</p>
    </div>
  </li>
);

interface CharacterSummaryProps {
  attributes: Record<string, string | string[]>;
  name: string;
}

export default function CharacterSummary({ attributes, name }: CharacterSummaryProps) {
  const [loading, setLoading] = useState(true);
  const { newCharacterImage } = useUser();
  const personalityAttributes = ["Personality", "Occupation", "Hobbies", "Relationship"]
    .filter((key) => attributes[key])
    .map((key) => ({
      title: attributeMap[key].title,
      value: attributes[key],
      icon: attributeMap[key].icon,
    }));

  const physicalAttributes = ["Age", "Body_Type", "Zodiac_Sign", "Ethnicity"]
    .filter((key) => attributes[key])
    .map((key) => ({
      title: attributeMap[key].title,
      value: attributes[key],
      icon: attributeMap[key].icon,
    }));

  return (
    <div className="flex flex-wrap gap-3 max-w-[1200px]">
      <div className="flex gap-8">
        <div className="flex gap-6 flex-col">
          {!newCharacterImage ? (
            <div className="rounded-xl w-[400px] h-[500px] bg-gray-800 animate-pulse"></div>
          ) : (
            <img src={newCharacterImage} alt="character" className="rounded-xl w-[400px]" />
          )}
          <div className="bg-linear-[144deg,_#181818_1.24%,_#101010] text-[var(--gray)] p-4 rounded-xl flex gap-2 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.702 2.19463L19.702 4.81963C20.0833 4.96256 20.4119 5.21849 20.6438 5.55319C20.8758 5.88789 21.0001 6.28542 21 6.69263V12.0556C21 13.7271 20.5346 15.3655 19.6559 16.7873C18.7772 18.2091 17.52 19.3581 16.025 20.1056L12.671 21.7816C12.4627 21.8858 12.2329 21.9401 12 21.9401C11.7671 21.9401 11.5373 21.8858 11.329 21.7816L7.975 20.1046C6.48004 19.3571 5.22277 18.2081 4.34407 16.7863C3.46537 15.3645 2.99996 13.7261 3 12.0546V6.69363C2.99975 6.28625 3.12391 5.8885 3.35587 5.5536C3.58783 5.2187 3.91653 4.96262 4.298 4.81963L11.298 2.19463C11.7506 2.02497 12.2494 2.02497 12.702 2.19463ZM12 7.99963C11.7551 7.99966 11.5187 8.08959 11.3356 8.25235C11.1526 8.41511 11.0357 8.63938 11.007 8.88263L11 8.99963V10.9996H9C8.74512 10.9999 8.49997 11.0975 8.31463 11.2725C8.1293 11.4474 8.01777 11.6866 8.00283 11.941C7.98789 12.1955 8.07067 12.446 8.23426 12.6415C8.39786 12.8369 8.62991 12.9625 8.883 12.9926L9 12.9996H11V14.9996C11.0003 15.2545 11.0979 15.4997 11.2728 15.685C11.4478 15.8703 11.687 15.9819 11.9414 15.9968C12.1958 16.0117 12.4464 15.929 12.6418 15.7654C12.8373 15.6018 12.9629 15.3697 12.993 15.1166L13 14.9996V12.9996H15C15.2549 12.9993 15.5 12.9018 15.6854 12.7268C15.8707 12.5518 15.9822 12.3127 15.9972 12.0582C16.0121 11.8038 15.9293 11.5533 15.7657 11.3578C15.6021 11.1623 15.3701 11.0367 15.117 11.0066L15 10.9996H13V8.99963C13 8.73442 12.8946 8.48006 12.7071 8.29253C12.5196 8.10499 12.2652 7.99963 12 7.99963Z"
                fill="#9F9F9F"
              ></path>
            </svg>
            Your AI will remain private. Only you will see it
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex gap-2 flex-col">
            <Button variant="pink" className="xl:w-88 h-12">
              <span>Start Chatting</span>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-900 dark:text-white border border-transparent text-sm font-semibold px-6 py-3 bg-[#181818] hover:bg-[#24162c] hover:shadow-sm hover:border-[#ae52e7] hover:text-[#ae52e7]"
            >
              Create New
            </Button>
          </div>
          <div>
            <div className="space-y-6 mt-8 w-full max-w-[425px]">
              {physicalAttributes.length > 0 && (
                <div>
                  <h3 className="font-bold mb-4 text-xl">Physical Attributes</h3>
                  <ul className="space-y-4">
                    {physicalAttributes.map((attr) => (
                      <AttributeItem key={attr.title} {...attr} />
                    ))}
                  </ul>
                </div>
              )}

              {personalityAttributes.length > 0 && (
                <div>
                  <h2 className="font-bold mb-4 text-xl">Personality Attributes</h2>
                  <ul className="space-y-4">
                    {personalityAttributes.map((attr) => (
                      <AttributeItem key={attr.title} {...attr} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
