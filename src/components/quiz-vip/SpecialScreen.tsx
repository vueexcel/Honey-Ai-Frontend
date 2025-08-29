import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function SpecialScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <section className="_matchFreak_52prk_1">
      <div className="_content_52prk_10">
        <button onClick={onBack} type="button" className="_backButton_52prk_26">
          <KeyboardBackspaceIcon />
        </button>
        <div className="_header_52prk_20">
          <h1 className="_title_52prk_45">
            Hey handsome,
            <br /> now let me match your freak
          </h1>
          <picture>
            <source
              srcSet="/assets/images/girl-BwAJtrO_.webp 2x, /assets/images/girl-M-EE19AH.webp 1x"
              type="image/webp"
            />
            <img
              src="/assets/images/girl-BwAJtrO_.webp"
              alt="Girl"
              className="_girl_52prk_80"
            />
          </picture>
        </div>
        <picture>
          <source
            srcSet="/assets/images/background-ByjgN3lS.webp 2x, /assets/images/background-DIi5pJjD.webp 1x"
            type="image/webp"
          />
          <img
            src="/assets/images/background-ByjgN3lS.webp"
            alt="Background"
            className="_background_52prk_61"
          />
        </picture>
      </div>
      <div className="_controls_1h4cn_33 _matchFreakControls_1h4cn_42">
        <button
          onClick={onNext}
          id="quiz_next_button"
          className="_button_11ngv_1"
        >
          Continue
        </button>
      </div>
      <div className="_shadow_52prk_95"></div>
    </section>
  );
}

export default SpecialScreen;
