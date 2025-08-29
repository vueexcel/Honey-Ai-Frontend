"use client";
import React, { useState } from "react";
import { createCharacterSteps } from "@/constants/createCharacterSteps";
import Stepper from "./Stepper";
import ImageSelector from "./ImageSelector";
import OptionSelector from "./OptionSelector";
import Button from "../ui/Button";
import { ArrowRightIcon } from "lucide-react";
import VoiceSelector from "./VoiceSelector";
import NameSelector from "./NameSelector";
import CharacterSummary from "./CharacterSummary";
import { useUser } from "@/context/UserContextProvider";

type AnswerMap = Record<string, string | string[]>;
type Mode = "realistic" | "anime";
type MappingRule = {
  source: keyof AnswerMap;
  target: string;
  isArray?: boolean;
  pickFirst?: boolean;
  wrapArray?: boolean;
  forceArray?: boolean;
};

export default function CreateCharacterForm() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { generateNewCharacter } = useUser();
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [finished, setFinished] = useState(false);
  const [mappedAnswer, setMappedAnswer] = useState<Record<string, string | string[]> | {}>([]);
  const [name, setName] = useState<string>("");

  function getRandomAgeFromValue(value: string, name?: string): number {
    let target = value;
    if (!/^\d/.test(value) && name) {
      target = name;
    }

    const rangeMatch = /^(\d+)\s*-\s*(\d+)$/.exec(target);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1], 10);
      const max = parseInt(rangeMatch[2], 10);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const num = parseInt(target, 10);
    if (!isNaN(num)) return num;

    return Math.floor(Math.random() * (45 - 18 + 1)) + 18;
  }

  const handleNext = async () => {
    if (!mode) return;
    const steps = createCharacterSteps[mode];
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      console.log(answers, "answers");
      const answer = mapAnswersToAttributes(answers, mode);
      setMappedAnswer(answer);

      try {
        const age = getRandomAgeFromValue(answer?.Age || null);
        const fullName = (answer.Name || "") as string;
        const data = await generateNewCharacter(fullName, answer, age, mode === "anime");
      } catch (err) {
        console.error("❌ Failed to create character:", err);
      }

      setFinished(true);
    }
  };

  const handleBack = () => {
    if (!mode) return;

    const steps = createCharacterSteps[mode];
    const currentKey = steps[currentStepIndex]?.key;
    if (currentKey) {
      setAnswers((prev) => {
        const updated = { ...prev };
        delete updated[currentKey];
        return updated;
      });
    }

    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      setMode(null);
    }
  };

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    handleNext();
  };
  const handleToggleOption = (key: string, value: string) => {
    const currentOptionsSelected = (answers[key] as string[] | undefined) || [];

    const newOptions = currentOptionsSelected.includes(value)
      ? currentOptionsSelected.filter((h) => h !== value)
      : [...currentOptionsSelected, value];

    setAnswers((prev) => ({ ...prev, [key]: newOptions }));
    if (currentStep.mode == "single") {
      handleNext();
    }
  };

  const handleVoiceSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };
  const handleNameSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setName(value);
  };

  const animeMappings: MappingRule[] = [
    { source: "animeRace", target: "Ethnicity", forceArray: true },
    { source: "animeEyeColor", target: "Eye_Color" },
    { source: "animeHairStyle", target: "Hair_Style" },
    { source: "animeHairColor", target: "Hair_Color" },
    { source: "animeOccupation", target: "Occupation", forceArray: true },
    { source: "animeCharacterName", target: "Name" },
  ];

  const realisticMappings: MappingRule[] = [
    { source: "realisticAge", target: "Age" },
    { source: "realisticCharacterHobby", target: "Hobbies", forceArray: true },
    { source: "realisticBodyType", target: "Body_Type" },
    { source: "realisticEthnicity", target: "Ethnicity", forceArray: true },
    { source: "realisticOccupation", target: "Occupation", forceArray: true }, // keep array
    { source: "realisticPersonality", target: "Personality", forceArray: true },
    { source: "realisticZodiacSign", target: "Zodiac_Sign" },
    { source: "realisticMaritalStatus", target: "Relationship", forceArray: true }, // keep array
    { source: "realisticVoice", target: "Voice" },
    { source: "realisticEyeColor", target: "Eye_Color" },
    { source: "realisticHairColor", target: "Hair_Color" },
    { source: "realisticHairStyle", target: "Hair_Style" },
    { source: "realisticCharacterName", target: "Name" },
  ];

  const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const applyMappings = (answers: AnswerMap, mappings: MappingRule[]): Record<string, string | string[]> => {
    const result: Record<string, string | string[]> = {};
    for (const { source, target, forceArray } of mappings) {
      const val = (answers as any)[source];
      if (val === undefined || val === null) continue;
      if (Array.isArray(val)) {
        if (val.length === 0) continue;
        result[target] = val.map((v) => capitalize(String(v)));
      } else {
        if (forceArray) {
          result[target] = [capitalize(String(val))];
        } else {
          result[target] = capitalize(String(val));
        }
      }
    }
    return result;
  };
  const mapAnswersToAttributes = (answers: AnswerMap, mode: Mode) => {
    if (mode === "anime") return applyMappings(answers, animeMappings);
    if (mode === "realistic") return applyMappings(answers, realisticMappings);
    return {};
  };

  if (!mode) {
    return (
      <div className="h-full bg-black p-6">
        <div className="max-w-[600px] xl:max-w-[1060px] flex flex-col items-center justify-center mx-auto text-white">
          <div className="w-full">
            <Stepper
              onBack={() => handleBack()}
              totalSteps={1}
              currentStep={0}
              title="Choose Style"
              subtitle="Choose the character style you want to spend time with"
            />
          </div>
          <div className="flex gap-5 flex-wrap w-full ">
            <div className="flex flex-col flex-1 cursor-pointer group" onClick={() => setMode("realistic")}>
              <div className="overflow-hidden rounded-3xl border-4 border-transparent group-hover:border-pink-500 transition-colors">
                <img
                  src="https://get-honey.ai/assets/realistic-sf-DOjef88l.avif"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  alt="Realistic Style"
                />
              </div>
              <span className="text-center text-xl mt-3 font-semibold">Realistic</span>
            </div>
            <div className="flex flex-col flex-1 cursor-pointer group" onClick={() => setMode("anime")}>
              <div className="overflow-hidden rounded-3xl border-4 border-transparent group-hover:border-pink-500 transition-colors">
                <img
                  src="https://get-honey.ai/assets/anime-sf-BEZDS4ZK.avif"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  alt="Anime Style"
                />
              </div>
              <span className="text-center text-xl mt-3 font-semibold">Anime</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const steps = createCharacterSteps[mode];
  const currentStep = steps[currentStepIndex];
  const currentValue = answers[currentStep.key];

  const renderStepContent = () => {
    switch (currentStep.type) {
      case "images":
        return (
          <ImageSelector
            options={currentStep.options}
            selectedValue={(answers[currentStep.key] as string) ?? []}
            onSelect={(value) => handleSelect(currentStep.key, value)}
          />
        );
      case "options":
        return (
          <div>
            <OptionSelector
              options={currentStep.options.flat()} // Flatten for simplicity
              selectedValues={currentValue as string[]}
              onToggle={(value) => handleToggleOption(currentStep.key, value)}
              mode={currentStep?.mode}
            />
          </div>
        );
      case "voice":
        return (
          <div>
            <VoiceSelector
              options={currentStep.options.flat()}
              selectedValue={(answers[currentStep.key] as string) ?? []}
              onSelect={(value) => handleVoiceSelect(currentStep.key, value)}
            />
          </div>
        );
      case "name":
        return (
          <NameSelector
            handleNext={(value) => {
              handleNameSelect(currentStep.key, value);
              handleNext();
            }}
          />
        );
      default:
        return <div className="text-white">This step type is not configured yet.</div>;
    }
  };

  return (
    <div className="p-4 flex items-center justify-center bg-black h-[calc(100vh-138px)] xl:h-[calc(100vh-74px)]">
      {!finished ? (
        <div className="w-full max-w-[1060px] mx-auto text-white flex flex-col h-full">
          <div className="shrink-0">
            <Stepper
              onBack={() => handleBack()}
              totalSteps={steps.length}
              currentStep={currentStepIndex + 1}
              title={currentStep.title}
              subtitle={currentStep.subtitle}
            />
          </div>
          <div className="overflow-auto">{renderStepContent()}</div>
          {((currentStep.type === "options" && currentStep?.mode !== "single") || currentStep.type === "voice") && (
            <div className="flex justify-center">
              <Button
                variant="gradient"
                className="h-11.5 max-w-96 w-full mt-4 rounded-xl flex items-center justify-center shadow-lg"
                onClick={handleNext}
              >
                <span className="mr-3">Next</span>
                <ArrowRightIcon size={18} />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <CharacterSummary attributes={mappedAnswer} name={name} />
      )}
    </div>
  );
}
