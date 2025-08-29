import useTimer from "@/hooks/timer";
import React from "react";

function SecondDiscountModal({
  skip,
  apply,
  originalPrice,
  discount,
  tenure,
  discountedPrice,
}: {
  skip: () => void;
  apply: () => void;
  originalPrice: number;
  discount: number;
  tenure: number;
  discountedPrice: number;
}) {
  const timer = useTimer();
  return (
    <div className="_modalOverlay_1suhk_1">
      <div
        className="_modalContainer_1suhk_17 _noPadding_1suhk_50 _modalContainer_17f4d_1"
        style={{ maxWidth: "460px" }}
      >
        <div className="_content_1suhk_111">
          <div className="_contentWrapper_17f4d_4">
            <div className="_imagesContainer_17f4d_8">
              <img
                src="/assets/images/secondModal.webp"
                alt="Girl with discount suggestion"
              />
            </div>
            <div className="_header_17f4d_42">
              <p className="_badge_17f4d_52">One-time offer...😔</p>
              <div className="_countdownContainer_16fu0_1">
                <p className="_countdown_16fu0_1">{timer}</p>
                <p className="_text_16fu0_15">Sec</p>
              </div>
            </div>
            <div className="_content_17f4d_4">
              <p className="_title_17f4d_63">You’re lucky today!</p>
              <p className="_description_17f4d_69">
                Get an <span>additional discount</span>, if you unlock your chat
                in the next 60 seconds!
              </p>
              <div className="_productsContainer_17f4d_84">
                <div
                  id="subscription_0"
                  className="_priceBlock_gaool_1 _selected_gaool_17 _popular_gaool_39 _product_17f4d_84 subscription_price"
                  role="button"
                >
                  <div className="_priceBlockContent_gaool_31 _priceBlockContent_17f4d_112">
                    <div>
                      <div className="_planInfo_gaool_59">
                        <p className="_planTitle_gaool_89 _productTitle_17f4d_115">
                          {tenure} months
                        </p>
                        <p className="_discountBadge_gaool_59 _mainApp_gaool_114 _productBadge_17f4d_123">
                          {discount}% OFF
                        </p>
                      </div>
                      <p className="_previousPrice_gaool_122">
                        {originalPrice} per day
                      </p>
                    </div>
                    <div className="_priceInfo_gaool_62">
                      <p className="_priceInteger_gaool_62 _productPriceInteger_17f4d_132">
                        {discountedPrice}
                      </p>
                      <div>
                        <p className="_priceDecimal_gaool_152">USD</p>
                        <p className="_period_gaool_161">per day</p>
                      </div>
                    </div>
                  </div>
                  <div className="_badgeContainer_gaool_194">
                    <p className="_popularBadge_gaool_209">Most Popular</p>
                  </div>
                </div>
              </div>
              <div className="_actionButtons_17f4d_140">
                <button
                  onClick={skip}
                  className="_button_t0cyr_1 _disabled_t0cyr_28 _fullWidth_t0cyr_79"
                >
                  Skip Discount
                </button>
                <button
                  onClick={apply}
                  className="_button_t0cyr_1 _primary_t0cyr_19 _fullWidth_t0cyr_79"
                >
                  Apply Discount
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondDiscountModal;
