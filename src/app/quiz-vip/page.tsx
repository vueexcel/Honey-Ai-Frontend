"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import { ArrowLeft } from "lucide-react";

import quizQuestions from "@/constants/createQuizList";
import { SelectedOption } from "@/types/quiz";
import { useSliders } from "@/context/SliderContext";
import { analytics } from "@/utils/analytics";

import Welcome from "@/components/quiz-vip/Welcome";
import Age from "@/components/quiz-vip/Age";
import BodyType from "@/components/quiz-vip/BodyType";
import Ethnicity from "@/components/quiz-vip/Ethnicity";
import HairColor from "@/components/quiz-vip/HairColor";
import EyeColor from "@/components/quiz-vip/EyeColor";
import SpecificPrefrences from "@/components/quiz-vip/SpecificPrefrences";
import Sliders from "@/components/quiz-vip/Sliders";
import MultiSelect from "@/components/quiz-vip/MultiSelect";
import PreferredScenarios from "@/components/quiz-vip/PreferredScenarios";
import ProgressWithModal from "@/components/quiz-vip/ProgressWithModal";
import Payment from "@/components/quiz-vip/Payment";
import SpecialScreen from "@/components/quiz-vip/SpecialScreen";
import Steppers from "@/components/quiz-vip/Stepper";
import "../../../public/styles/Payment.css";
import "../../../public/styles/PaymentCompletion.css";
import "../../../public/styles/PaymentModal.css";

const formatAttributeValue = (str: string): string => {
  if (!str) return str;
  return str
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

function getRandomAgeFromValue(value: string): number {
  const rangeMatch = /^(\d+)\s*-\s*(\d+)$/.exec(value);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1], 10);
    const max = parseInt(rangeMatch[2], 10);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const num = parseInt(value, 10);
  if (!isNaN(num)) return num;
  if (value === "40+") return Math.floor(Math.random() * (60 - 40 + 1)) + 40;

  return Math.floor(Math.random() * (35 - 18 + 1)) + 18;
}

type QuizMappingRule = {
  sourceKey: string;
  targetAttribute: string;
  processor?: (value: any) => any;
};

const quizAttributeMappings: QuizMappingRule[] = [
  {
    sourceKey: "characterAgePreference",
    targetAttribute: "Age",
    processor: (value: string) => String(getRandomAgeFromValue(value)),
  },
  {
    sourceKey: "characterBodyType",
    targetAttribute: "Body_Type",
    processor: formatAttributeValue,
  },
  {
    sourceKey: "characterEthnicity",
    targetAttribute: "Ethnicity",
    processor: (value: string | string[]) =>
      Array.isArray(value) ? value.map(formatAttributeValue) : [formatAttributeValue(value)],
  },
  {
    sourceKey: "characterHairColor",
    targetAttribute: "Hair_Color",
    processor: formatAttributeValue,
  },
  {
    sourceKey: "characterEyeColor",
    targetAttribute: "Eye_Color",
    processor: formatAttributeValue,
  },
  {
    sourceKey: "characterSpecificFeatures",
    targetAttribute: "Facial_Features",
    processor: (value: string | string[]) =>
      Array.isArray(value) ? value.map(formatAttributeValue) : [formatAttributeValue(value)],
  },
  {
    sourceKey: "characterPersonalityTraits",
    targetAttribute: "Personality",
    processor: (value: any[]) => value,
  },
  {
    sourceKey: "userTurnOns",
    targetAttribute: "Turn_Ons",
    processor: (value: string | string[]) =>
      Array.isArray(value) ? value.map(formatAttributeValue) : [formatAttributeValue(value)],
  },
  {
    sourceKey: "userDesiredActivities",
    targetAttribute: "Desired_Activities",
    processor: (value: string | string[]) =>
      Array.isArray(value) ? value.map(formatAttributeValue) : [formatAttributeValue(value)],
  },
  {
    sourceKey: "userPreferredScenariosText",
    targetAttribute: "Scenarios",
    processor: (value: string | string[]) =>
      Array.isArray(value) ? value.map(formatAttributeValue) : [formatAttributeValue(value)],
  },
  {
    sourceKey: "userPreferredScenariosImages",
    targetAttribute: "Scenarios_Image_Based",
    processor: (value: string | string[]) =>
      Array.isArray(value) ? value.map(formatAttributeValue) : [formatAttributeValue(value)],
  },
];

export default function Home() {
  const [answers, setAnswers] = useState<SelectedOption[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [specialScreen, setSpecialScreen] = useState(false);
  const [ageValue, setAgeValue] = useState("18");
  const { sliderValues } = useSliders();
  const [quizStartTime] = useState<number>(Date.now());
  const [finalCharacterAttributes, setFinalCharacterAttributes] = useState<Record<string, any> | null>(null);

  const searchParams = useSearchParams();
  const pixel = searchParams.get("p");

  useEffect(() => {
    if (pixel) localStorage.setItem("pixel", pixel);
  }, [pixel]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentStep < quizQuestions.length && currentStep > 0) {
        const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
        analytics.trackQuizAbandoned(currentStep, timeSpent);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentStep, quizStartTime]);

  const updateAnswer = useCallback((questionKey: string, value: any) => {
    setAnswers((prev) => [...prev.filter((a) => Object.keys(a)[0] !== questionKey), { [questionKey]: value }]);
  }, []);

  const generateFinalCharacterAttributes = useCallback(() => {
    const flattenedAnswers: Record<string, any> = answers.reduce((acc, current) => {
      const key = Object.keys(current)[0];
      acc[key] = current[key];
      return acc;
    }, {});

    const characterData: Record<string, any> = {};

    quizAttributeMappings.forEach(({ sourceKey, targetAttribute, processor }) => {
      if (flattenedAnswers.hasOwnProperty(sourceKey)) {
        const value = flattenedAnswers[sourceKey];
        characterData[targetAttribute] = processor ? processor(value) : value;
      }
    });

    characterData["isAnime"] = false;

    return characterData;
  }, [answers]);

  const handleNext = () => {
    const q = quizQuestions[currentStep];

    if (q) {
      if (q.key === "userAge") updateAnswer(q.key, ageValue);
      if (q.key === "characterPersonalityTraits") updateAnswer(q.key, sliderValues);
    }

    const next = currentStep + 1;

    if (next >= quizQuestions.length) {
      const finalAttrs = generateFinalCharacterAttributes();
      console.log(finalAttrs, "attrs");
      setFinalCharacterAttributes(finalAttrs);
      console.log("Final Character Attributes:", finalAttrs);
    }

    setCurrentStep(next);

    if (next <= 13) {
      const nextQ = quizQuestions[next];
      const label = nextQ?.key ?? nextQ?.question ?? (next === 12 ? "Progress" : "Unknown");
      analytics.trackQuizStep(next, label);
    }
    console.log(answers, "answer");
  };

  const handleBack = () => {
    if (specialScreen) {
      setSpecialScreen(false);
      return;
    }
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    if (currentStep === 12) {
      return (
        <ProgressWithModal
          imageSrc="/assets/images/analyzer-assitant.webp"
          handleNext={handleNext}
          steps={[
            {
              label: "Understanding your preferences",
              question: "Are you into degradation or humiliation play?",
            },
            {
              label: "Creating an uncensored version of AI girl",
              question: "Do you want your AI girl to be uncensored?",
            },
            {
              label: "Crafting AI girl to your preferences",
              question: "Should your AI girl adapt to your preferences?",
            },
          ]}
        />
      );
    }

    const q = quizQuestions[currentStep];
    if (!q) return null;
    const currentAnswerEntry = answers.find((a) => Object.keys(a)[0] === q.key);
    const currentValue = currentAnswerEntry ? currentAnswerEntry[q.key] : undefined;

    switch (q.type) {
      case "image-options": {
        const ComponentsByKey: Record<string, React.ComponentType<any>> = {
          characterAgePreference: Welcome,
          characterBodyType: BodyType,
          characterEthnicity: Ethnicity,
          characterHairColor: HairColor,
          characterEyeColor: EyeColor,
          characterSpecificFeatures: SpecificPrefrences,
          userTurnOns: SpecificPrefrences,
          userPreferredScenariosImages: PreferredScenarios,
        };

        const Comp = ComponentsByKey[q.key];

        if (!Comp) {
          console.warn(`No component mapped for image-options step with key: ${q.key}`);
          return <div className="text-white">Image options component not found for {q.question}</div>;
        }

        if (q.key === "userPreferredScenariosImages") {
          return (
            <PreferredScenarios
              options={q.options}
              selectedOptions={Array.isArray(currentValue) ? currentValue : []}
              setSelectedOptions={(values: string[]) => updateAnswer(q.key, values)}
              handleNext={handleNext}
            />
          );
        }

        return (
          <Comp
            selectedOption={currentValue || ""}
            setSelectedOption={(value: any) => {
              updateAnswer(q.key, value);
              const isMultiSelect = ["characterSpecificFeatures", "userTurnOns"].includes(q.key);
              if (!isMultiSelect) handleNext();
            }}
            onNext={handleNext}
            mutiSelect={["characterSpecificFeatures", "userTurnOns"].includes(q.key)}
            options={q.options}
          />
        );
      }

      case "number-input":
        return <Age value={ageValue} onChange={setAgeValue} onNext={handleNext} />;

      case "slider-group":
        return (
          <Sliders
            sliders={q.sliders}
            selectedOption={currentValue}
            updateSelectedOption={(val: any) => {
              updateAnswer(q.key, val);
              setSpecialScreen(true);
              handleNext();
            }}
          />
        );

      case "multiple-choice":
        return (
          <MultiSelect
            handleNext={handleNext}
            options={q.options}
            selectedOptions={Array.isArray(currentValue) ? currentValue : []}
            setSelectedOptions={(values: string[]) => updateAnswer(q.key, values)}
          />
        );

      default:
        return null;
    }
  };

  if (specialScreen) {
    return (
      <SpecialScreen
        onBack={() => {
          setSpecialScreen(false);
          setCurrentStep((prev) => prev - 1);
        }}
        onNext={() => setSpecialScreen(false)}
      />
    );
  }

  if (currentStep >= quizQuestions.length + 1) {
    return <Payment finalCharacterAttributes={finalCharacterAttributes} />;
  }

  const q = currentStep === 12 ? null : quizQuestions[currentStep];

  return (
    <>
      <Head>
        <title>GetDream.AI</title>
        <meta
          name="description"
          content="Meet your AI girlfriend! Take a quiz to customize her personality, appearance, and preferences."
        />
        <meta name="keywords" content="AI Girlfriend, Quiz, Preferences" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

              try {
                // Prefer explicit query param first, then localStorage, else skip init
                var paramPixel = ${pixel ? `'${pixel}'` : "null"};
                var storedPixel = localStorage.getItem('pixel');
                var pixelId = paramPixel || storedPixel;

                if (pixelId) {
                  fbq('init', pixelId);
                  fbq('track', 'PageView');
                }
              } catch (e) { /* no-op */ }
            `,
          }}
        />
      </Head>

      <div className="_container_1h4cn_1">
        {currentStep > 0 && currentStep < 12 && (
          <div className="_header_1h4cn_22">
            <Steppers currentStep={currentStep} totalSteps={4} />
            <div className="_screenTitle_1rz2l_1">
              <button type="button" onClick={handleBack} className="_backButton_1rz2l_12" id="quiz_back_button_mobile">
                <ArrowLeft size={32} className="text-white" />
              </button>
              <div className="_titleWrapper_1rz2l_33">
                <h1 className="_title_1rz2l_33">{q?.question ?? ""}</h1>
                {q?.type !== "slider-group" && <h2 className="_subtitle_1rz2l_49">{q?.description ?? ""}</h2>}
              </div>
            </div>
          </div>
        )}

        {renderStep()}
      </div>
    </>
  );
}
