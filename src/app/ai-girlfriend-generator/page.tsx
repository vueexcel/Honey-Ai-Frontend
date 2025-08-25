"use client";
import { Layout } from "@/components";
import CharacterProfile from "@/components/ai-girlfriend-generator/CharacterProfile";
import PromptInput from "@/components/ai-girlfriend-generator/PromptInput";
import GenerationSettings from "@/components/ai-girlfriend-generator/GenerationSettings";
import Suggestions from "@/components/ai-girlfriend-generator/Suggestions";
import CharacterSelector from "@/components/ai-girlfriend-generator/CharacterSelector";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCharacters } from "@/utils/api";
import { Character } from "@/types/character";
import { useUser } from "@/context/UserContextProvider";
export default function CreateCharacterPage() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [curCharacter, setCurCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCharacterSelection, setIsCharacterSelection] = useState(false);
  const { isBulkImageGenerating, bulkImageGenerator } = useUser();
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const addValue = (value: string) => {
    if (!selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
      setPrompt(value);
    }
  };
  const removeValue = (value: string) => {
    setSelectedValues(selectedValues.filter((v) => v !== value));
  };
  const handleCharacterSelectClick = () => {
    setIsCharacterSelection(true);
  };

  useEffect(() => {
    const charId = searchParams.get("character");
    if (charId && characters.length > 0) {
      const found = characters.find((c) => c.id === charId);
      if (found) setCurCharacter(found);
    }
  }, [searchParams, characters]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  const handleCharacterSelect = (character: Character) => {
    setCurCharacter(character);
    setIsCharacterSelection(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set("character", character.id);
    router.push(`?${params.toString()}`);
  };

  const generateBulkImage = (count: number) => {
    if (curCharacter) {
      bulkImageGenerator(prompt, curCharacter?.id, count, curCharacter);
    } else {
      alert("please select a character to generate image");
    }
  };
  return (
    <Layout>
      <div className="pt-10 pb-6 px-6 xl:px-12 max-w-screen xl:max-w-[1300px] mx-auto">
        {isCharacterSelection ? (
          <CharacterSelector
            handleCharacterSelect={handleCharacterSelect}
            characters={characters}
            onClick={() => setIsCharacterSelection(false)}
          />
        ) : (
          <>
            <header className="mb-12">
              <h1 className="text-xl xl:text-3xl font-bold">
                AI Girlfriend Generator: Build and Customize Your AI GF Online
              </h1>
            </header>
            <div className="flex gap-8 flex-col">
              <div className="flex flex-col xl:flex-row w-full h-full gap-8">
                <CharacterProfile curCharacter={curCharacter} onSelect={handleCharacterSelectClick} />
                <PromptInput selectedValues={selectedValues} onAdd={addValue} onRemove={removeValue} />
              </div>
              <Suggestions selectedValues={selectedValues} onAdd={addValue} onRemove={removeValue} />
              <GenerationSettings generateBulkImage={generateBulkImage} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
