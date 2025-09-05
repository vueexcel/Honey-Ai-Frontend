"use client";

import { useState } from "react";
import Button from "../ui/Button";
import ImageIcon from "../icons/ImageIcon";
import TokenIcon from "../icons/TokenIcon";
import { useUser } from "@/context/UserContextProvider";
import Spinner from "../ui/Spinner";
import { usePreviewImage } from "@/context/PreviewImageContext";

type GenerationSettingsProps = {
  generateBulkImage: (num: number) => void;
};

const GenerationSettings = ({ generateBulkImage }: GenerationSettingsProps) => {
  const OPTIONS = [1, 4, 16, 32, 64];
  const COST_PER_IMAGE = 5;
  const [selected, setSelected] = useState<number>(4);
  const [isGeneratingImage, setIsGenerationImage] = useState(false);
  const { isBulkImageGenerating, imagesGenerated } = useUser();
  const { openPreview } = usePreviewImage();
  const totalCost = selected * COST_PER_IMAGE;

  return (
    <div className="w-full">
      <p className="text-2xl font-bold text-white mb-6">Number of images</p>

      <div className="flex flex-wrap gap-4 mb-8 w-full">
        {OPTIONS.map((num) => (
          <button
            key={num}
            onClick={() => setSelected(num)}
            className={`px-6 py-2 xl:h-14 xl:w-[200px] xl:text-[20px] font-semibold rounded-xl transition-colors border-2 cursor-pointer
              ${
                selected === num ? "border-[var(--accent)] bg-[#24162c]" : "border-[var(--gray-dark)] bg-transparent"
              } text-white`}
          >
            {num}
          </button>
        ))}
      </div>
      <Button
        variant="gradient"
        className="max-w-sm xl:min-w-sm h-12 rounded-xl flex items-center justify-center text-base  gap-2"
        disabled={isBulkImageGenerating}
        onClick={() => generateBulkImage(selected)}
      >
        <div className="flex gap-2 justify-center items-center">
          <ImageIcon size={18} className="text-white" color="white" />
          <span>Generate Image</span>
          <TokenIcon size={18} />
          <span>{totalCost}</span>
        </div>
      </Button>
      {(isBulkImageGenerating || imagesGenerated.length > 0) && (
        <div className="mt-6">
          <h1 className="text-xl xl:text-2xl">Your Generated Images</h1>
          <span className="mt-2">
            {isBulkImageGenerating
              ? "Your images are being generated. Feel free to explore while they load!"
              : "Here are your generated images:"}
          </span>

          {isBulkImageGenerating ? (
            <div className="mt-6 w-full flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex gap-4 flex-wrap mt-6">
              {imagesGenerated.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Generated ${index + 1}`}
                  className="w-64 h-64 object-cover rounded-lg shadow cursor-pointer"
                  onClick={() => openPreview(url || "")}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenerationSettings;
