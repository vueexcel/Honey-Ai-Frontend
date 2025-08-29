import useTimer from "@/hooks/timer";
import React from "react";
import analytics from "@/utils/analytics";

function SixthModal({ skip, apply }: { skip: () => void; apply: () => void }) {
  const timer = useTimer();

  React.useEffect(() => {
    // Track when the final discount modal (pay once offer) is shown
    analytics.trackDiscountPopupShown("sixth_discount_modal_pay_once", null);
  }, []);

  return (
    <div className="_modalOverlay_1suhk_1">
      <div
        className="_modalContainer_1suhk_17 _noPadding_1suhk_50"
        style={{ maxWidth: "450px" }}
      >
        <button
          id="close_modal_wind"
          onClick={skip}
          className="_closeButton_1suhk_59 _withBackground_1suhk_95 _absolute_1suhk_78"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.79279 6.79302C6.98031 6.60555 7.23462 6.50023 7.49979 6.50023C7.76495 6.50023 8.01926 6.60555 8.20679 6.79302L11.9998 10.586L15.7928 6.79302C15.885 6.69751 15.9954 6.62133 16.1174 6.56892C16.2394 6.51651 16.3706 6.48892 16.5034 6.48777C16.6362 6.48662 16.7678 6.51192 16.8907 6.5622C17.0136 6.61248 17.1253 6.68673 17.2192 6.78062C17.3131 6.87452 17.3873 6.98617 17.4376 7.10907C17.4879 7.23196 17.5132 7.36364 17.512 7.49642C17.5109 7.6292 17.4833 7.76042 17.4309 7.88242C17.3785 8.00443 17.3023 8.11477 17.2068 8.20702L13.4138 12L17.2068 15.793C17.3889 15.9816 17.4897 16.2342 17.4875 16.4964C17.4852 16.7586 17.38 17.0094 17.1946 17.1948C17.0092 17.3802 16.7584 17.4854 16.4962 17.4877C16.234 17.49 15.9814 17.3892 15.7928 17.207L11.9998 13.414L8.20679 17.207C8.01818 17.3892 7.76558 17.49 7.50339 17.4877C7.24119 17.4854 6.99038 17.3802 6.80497 17.1948C6.61956 17.0094 6.51439 16.7586 6.51211 16.4964C6.50983 16.2342 6.61063 15.9816 6.79279 15.793L10.5858 12L6.79279 8.20702C6.60532 8.01949 6.5 7.76518 6.5 7.50002C6.5 7.23486 6.60532 6.98055 6.79279 6.79302Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <div className="_content_1suhk_111">
          <img
            src="/assets/images/offer-banner-sf-E-n0Ovej.webp"
            alt="Premium Girl"
            className="_girlImage_1ijjf_1"
          />
          <p className="_badge_1ijjf_7">
            Unlock Lifetime Access for just $99.99!
          </p>
          <div className="_content_1ijjf_20">
            <h2 className="_title_1ijjf_23">Pay Once – Use Forever</h2>
            <ul className="_benefitList_1ijjf_29">
              <li className="_benefitItem_1ijjf_35">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 18C10.1819 18 11.3522 17.7672 12.4442 17.3149C13.5361 16.8626 14.5282 16.1997 15.364 15.364C16.1997 14.5282 16.8626 13.5361 17.3149 12.4442C17.7672 11.3522 18 10.1819 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 -1.76116e-08 9 0C6.61305 3.55683e-08 4.32387 0.948211 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18ZM8.768 12.64L13.768 6.64L12.232 5.36L7.932 10.519L5.707 8.293L4.293 9.707L7.293 12.707L8.067 13.481L8.768 12.64Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Lifetime access for $99.99
              </li>
              <li className="_benefitItem_1ijjf_35">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 18C10.1819 18 11.3522 17.7672 12.4442 17.3149C13.5361 16.8626 14.5282 16.1997 15.364 15.364C16.1997 14.5282 16.8626 13.5361 17.3149 12.4442C17.7672 11.3522 18 10.1819 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 -1.76116e-08 9 0C6.61305 3.55683e-08 4.32387 0.948211 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18ZM8.768 12.64L13.768 6.64L12.232 5.36L7.932 10.519L5.707 8.293L4.293 9.707L7.293 12.707L8.067 13.481L8.768 12.64Z"
                    fill="currentColor"
                  ></path>
                </svg>
                One payment – lifetime access
              </li>
              <li className="_benefitItem_1ijjf_35">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 18C10.1819 18 11.3522 17.7672 12.4442 17.3149C13.5361 16.8626 14.5282 16.1997 15.364 15.364C16.1997 14.5282 16.8626 13.5361 17.3149 12.4442C17.7672 11.3522 18 10.1819 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 -1.76116e-08 9 0C6.61305 3.55683e-08 4.32387 0.948211 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18ZM8.768 12.64L13.768 6.64L12.232 5.36L7.932 10.519L5.707 8.293L4.293 9.707L7.293 12.707L8.067 13.481L8.768 12.64Z"
                    fill="currentColor"
                  ></path>
                </svg>
                3x cheaper than annual subscription
              </li>
            </ul>
            <div className="_priceInfo_1ijjf_44">
              <p className="_currentPrice_1ijjf_53">
                Lifetime Premium <span>$99.99</span>
              </p>
              <p className="_previousPrice_1ijjf_59">
                No more recurring payments! <span>$999.99</span>
              </p>
            </div>
            <div className="_tokensBadge_1ijjf_68">
              <svg
                width="21"
                height="23"
                viewBox="0 0 21 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.4395 6.61039L9.43945 6.61045L6.61045 9.43945L6.61039 9.4395C6.32919 9.72079 6.17121 10.1023 6.17121 10.5C6.17121 10.8977 6.32919 11.2792 6.61039 11.5605L6.61045 11.5606L9.43945 14.3896L9.4395 14.3896C9.72079 14.6708 10.1023 14.8288 10.5 14.8288C10.8977 14.8288 11.2792 14.6708 11.5605 14.3896L11.5606 14.3896L14.3896 11.5606L14.3896 11.5605C14.6708 11.2792 14.8288 10.8977 14.8288 10.5C14.8288 10.1023 14.6708 9.72079 14.3896 9.4395L14.3896 9.43945L11.5606 6.61045L11.5605 6.61039C11.2792 6.32919 10.8977 6.17121 10.5 6.17121C10.1023 6.17121 9.72079 6.32919 9.4395 6.61039ZM10.5 1C15.7469 1 20 5.25314 20 10.5C20 15.7469 15.7469 20 10.5 20C5.25314 20 1 15.7469 1 10.5C1 5.25314 5.25314 1 10.5 1Z"
                  fill="#FFB930"
                  stroke="#FF7B02"
                ></path>
              </svg>{" "}
              Get 100 Tokens every month
            </div>
            <button
              onClick={apply}
              className="_button_t0cyr_1 _primary_t0cyr_19 _fullWidth_t0cyr_79"
            >
              Claim Lifetime Access
            </button>
            <p className="_disclaimer_1ijjf_82">
              This offer is available only now, on this screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SixthModal;
