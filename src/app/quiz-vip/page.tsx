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

export default function Home() {
  const [answers, setAnswers] = useState<SelectedOption[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [specialScreen, setSpecialScreen] = useState(false);
  const [ageValue, setAgeValue] = useState("18");
  const { sliderValues } = useSliders();
  const [quizStartTime] = useState<number>(Date.now());

  const searchParams = useSearchParams();
  const pixel = searchParams.get("p");

  // Persist pixel param if present
  useEffect(() => {
    if (pixel) localStorage.setItem("pixel", pixel);
  }, [pixel]);

  // Track abandonment
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

  const updateAnswer = useCallback((question: string, value: any) => {
    setAnswers((prev) => [...prev.filter((a) => a.question !== question), { question, value }]);
  }, []);

  const handleNext = () => {
    const q = quizQuestions[currentStep];

    // Save step-specific values
    if (currentStep === 1 && q) updateAnswer(q.question, ageValue);
    if (currentStep === 7 && q) updateAnswer(q.question, sliderValues);

    // Move forward
    const next = currentStep + 1;
    setCurrentStep(next);

    // Analytics: use next step's question if it exists; otherwise a fallback
    if (next <= 13) {
      const nextQ = quizQuestions[next];
      const label = nextQ?.question ?? (next === 12 ? "Progress" : "Unknown");
      analytics.trackQuizStep(next, label);
    }
  };

  const handleBack = () => {
    if (specialScreen) {
      setSpecialScreen(false);
      return;
    }
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    // Hardcoded special step 12 (NOT in quizQuestions)
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

    // All other steps rely on quizQuestions
    const q = quizQuestions[currentStep];
    if (!q) return null;

    const currentValue = answers.find((a) => a.question === q.question)?.value;

    switch (q.type) {
      case "image-options": {
        const Components: Record<number, any> = {
          0: Welcome,
          2: BodyType,
          3: Ethnicity,
          4: HairColor,
          5: EyeColor,
          6: SpecificPrefrences,
          8: SpecificPrefrences,
        };

        // Step 11 is PreferredScenarios (multi-select but still "image-options" in data)
        if (currentStep === 11) {
          return (
            <PreferredScenarios
              options={q.options}
              selectedOptions={Array.isArray(currentValue) ? currentValue : []}
              setSelectedOptions={(values: string[]) => updateAnswer(q.question, values)}
              handleNext={handleNext}
            />
          );
        }

        const Comp = Components[currentStep];
        if (!Comp) return null;

        return (
          <Comp
            selectedOption={currentValue || ""}
            setSelectedOption={(value: any) => {
              updateAnswer(q.question, value);
              // Auto-advance except for the multi-select screens (6 and 8)
              if (![6, 8].includes(currentStep)) handleNext();
            }}
            onNext={handleNext}
            mutiSelect={currentStep === 6}
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
              updateAnswer(q.question, val);
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
            setSelectedOptions={(values: string[]) => updateAnswer(q.question, values)}
          />
        );

      default:
        return null;
    }
  };

  // Overlay screen (between 7 -> 8)
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

  // Payment when quiz is done
  if (currentStep >= 13) return <Payment />;

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

        {/* Facebook Pixel (restored) */}
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
        {/* Header hidden for first screen (0), progress screen (12), special overlay, and after 12 */}
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
