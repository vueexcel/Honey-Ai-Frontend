import React from "react";

function DiscountPopupModal({ discount }: { discount: number }) {
  return (
    <div className="_modalOverlay_1suhk_1 _fadeIn_1suhk_13">
      <div
        className="_modalContainer_1suhk_17 _noPadding_1suhk_50 _modalContainer_nwqn6_2"
        style={{ maxWidth: "500px" }}
      >
        <div className="_content_1suhk_111 _modalContent_nwqn6_1">
          <div className="_content_nwqn6_7">
            <div className="_preContent_nwqn6_19">
              <h2 className="_title_nwqn6_42">You’ve found mystery box</h2>
              <div className="_boxWrapper_nwqn6_65">
                <picture>
                  <source
                    srcSet="/assets/images/gift2x.webp 2x, /assets/images/gift1x.webp 1x"
                    type="image/webp"
                  />
                  <img
                    src="/assets/images/gift2x.webp"
                    alt="mystery box"
                    className="_boxImage_nwqn6_71"
                  />
                </picture>
              </div>
            </div>
            <div className="_postContent_nwqn6_20">
              <h2 className="_postTitle_nwqn6_43">Your extra discount</h2>
              <div className="_badge_nwqn6_79">{discount}% OFF</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscountPopupModal;
