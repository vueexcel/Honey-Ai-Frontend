import React, { useState, useEffect, useRef } from "react";

interface ProgressStep {
  label: string;
  question: string;
}

const ProgressWithModal = ({
  imageSrc,
  steps,
  handleNext,
}: {
  imageSrc: string;
  steps: ProgressStep[];
  handleNext: () => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(Array(steps.length).fill(0));
  const [modalOpen, setModalOpen] = useState(false);
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(steps.length).fill(null)
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // trigger handleNext to move to next question if all steps are answered
    if (activeStep >= steps.length) {
      handleNext();
      return;
    }
    // clear the interval if the modal is open or if all steps are answered
    if (activeStep < steps.length && !modalOpen) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const updated = [...prev];
          // Different increment rates for different steps
          const increment = activeStep === 1 ? 1 : 2; // Slower increment for second step

          if (updated[activeStep] < 100) {
            // Ensure we don't exceed 100%
            const newValue = Math.min(updated[activeStep] + increment, 100);
            updated[activeStep] = newValue;

            // Only trigger modal when progress is exactly 100%
            if (newValue === 100) {
              clearInterval(intervalRef.current!);
              setModalOpen(true);
            }
          }
          return updated;
        });
      }, 30);
    }
    return () => clearInterval(intervalRef.current!);
  }, [activeStep, modalOpen, steps.length]);

  const handleModalAnswer = (answer: boolean) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[activeStep] = answer;
      return updated;
    });
    setModalOpen(false);
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
    }, 300);
  };

  return (
    <section className="_generation_1x97g_1">
      <h1 className="_title_1x97g_10">Analyzing your desires</h1>
      <picture>
        <source
          srcSet={`/assets/images/analyzer-assitant.webp 2x, /assets/images/analyzer1x.webp 1x`}
          type="image/webp"
        />
        <img src={imageSrc} alt="Girl" className="_image_1x97g_15" />
      </picture>
      <div>
        {steps.map((step, idx) => (
          <div
            className="_layout_m28dl_1"
            key={step.label}
            style={{ marginBottom: 24 }}
          >
            <div className="_row_m28dl_4">
              <span className="_label_m28dl_11">{step.label}</span>
              <span className="_label_m28dl_11">{progress[idx]}%</span>
            </div>
            <div className="_progress_m28dl_17">
              <div
                className="_active_m28dl_26"
                style={{ width: `${progress[idx]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {modalOpen && activeStep < steps.length && (
        <div className="_modalOverlay_1suhk_1 _fadeIn_1suhk_13">
          <div className="_modalContainer_1suhk_17">
            <div className="_content_1suhk_111">
              <div className="_layout_y8bhp_1">
                <span className="_subtitle_y8bhp_13">
                  To move forward, specify
                </span>
                <p
                  className="_label_y8bhp_7"
                  id="quiz_confirmation_modal_title_degradation"
                >
                  {steps[activeStep].question}
                </p>
                <div className="_navigation_y8bhp_19">
                  <button
                    id="quiz_confirmation_cancel_btn"
                    onClick={() => handleModalAnswer(false)}
                    className="_button_t0cyr_1 _primary_t0cyr_19 _btn_y8bhp_26"
                  >
                    No
                  </button>
                  <button
                    id="quiz_confirmation_confirm_btn"
                    onClick={() => handleModalAnswer(true)}
                    className="_button_t0cyr_1 _primary_t0cyr_19 _btn_y8bhp_26"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProgressWithModal;
