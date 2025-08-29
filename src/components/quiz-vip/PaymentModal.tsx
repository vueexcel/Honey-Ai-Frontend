import { Subscriptions } from "@/types/subscription";
import React, { useEffect, useMemo } from "react";
import FAQ from "@/components/quiz-vip/FAQ";
import StripeComponent from "./StripeComponent";
import FirstDiscountModal from "./FirstDiscountModal";
import SecondDiscountModal from "./SecondDiscountModal";
import ThirdModal from "./ThirdModal";
import FourthModal from "./FourthModal";
import FifthModal from "./FifthModal";
import SixthModal from "./SixthModal";
import DiscountPopupModal from "./DiscountPopupModal";
import analytics from "@/utils/analytics";

interface PaymentModalProps {
  onClose: () => void;
  selectedPlan: Subscriptions;
}

function PaymentModal({ onClose, selectedPlan }: PaymentModalProps) {
  const [discount, setDiscount] = React.useState<number | null>(selectedPlan.discount);
  const [showDiscountModal, setShowDiscountModal] = React.useState(false);
  const [payOnce, setPayOnce] = React.useState(false);
  const [closeButtonClicked, setCloseButtonClicked] = React.useState(0);
  const [hasReset, setHasReset] = React.useState(false); // Track if we've reset from 6 to 0

  // Track checkout started when payment modal opens
  useEffect(() => {
    analytics.trackCheckoutStarted(selectedPlan.originalPrice * selectedPlan.tenure * 30);
  }, [selectedPlan]);

  // Track discount modal displays
  useEffect(() => {
    if (closeButtonClicked > 0 && closeButtonClicked <= 6 && !hasReset) {
      analytics.trackDiscountPopupShown(`modal_${closeButtonClicked}`, closeButtonClicked === 6 ? null : discount);
    }
  }, [closeButtonClicked, hasReset, discount]);

  const { discountedPricePerDay, finalPrice } = useMemo((): {
    discountedPricePerDay: number;
    finalPrice: number;
  } => {
    if (payOnce) {
      return {
        discountedPricePerDay: selectedPlan.discountedPrice,
        finalPrice: 99.99,
      };
    } else {
      switch (discount) {
        case selectedPlan.firstTimeDiscount:
          return {
            discountedPricePerDay: selectedPlan.firstTimeDiscountedPricePerDay,
            finalPrice: selectedPlan.totalPriceWithFirstTimeDiscount,
          };
        case selectedPlan.secondTimeDiscount:
          return {
            discountedPricePerDay: selectedPlan.secondTimeDiscountedPricePerDay,
            finalPrice: selectedPlan.totalPriceWithSecondTimeDiscount,
          };
        default:
          return {
            discountedPricePerDay: selectedPlan.discountedPrice,
            finalPrice: selectedPlan.totalPrice,
          };
      }
    }
  }, [discount, selectedPlan, payOnce]);

  const { originalPrice, savedAmount, discountedPerDayPrice } = useMemo((): {
    discountedPerDayPrice: number;
    originalPrice: string;
    savedAmount: string;
  } => {
    const calculatedOriginalPrice = (selectedPlan.originalPrice * selectedPlan.tenure * 30).toFixed(2);

    return {
      discountedPerDayPrice: discountedPricePerDay,
      originalPrice: calculatedOriginalPrice,
      savedAmount: (selectedPlan.originalPrice * selectedPlan.tenure * 30 - finalPrice).toFixed(2),
    };
  }, [selectedPlan, discount, finalPrice, discountedPricePerDay]);

  const handleClose = () => {
    setCloseButtonClicked((prev) => prev + 1);
    if (discount === selectedPlan.firstTimeDiscount) {
      setCloseButtonClicked(3); // Skip to 3 if first time discount is active
    } else if (discount === selectedPlan.secondTimeDiscount) {
      setCloseButtonClicked(5); // Skip to 5 if second time discount is active
    }
    if (closeButtonClicked === 0 && hasReset) {
      onClose();
      setHasReset(false); // Reset hasReset after closing
    }
  };

  useEffect(() => {
    // disable discount modal after 5 sec
    if (showDiscountModal) {
      setInterval(() => {
        setShowDiscountModal(false);
      }, 5000);
    }
  }, [showDiscountModal]);

  const handleSkip = () => {
    if (closeButtonClicked === 6) {
      setCloseButtonClicked(0);
      setHasReset(true); // Mark that we've reset from 6
    } else if (hasReset && closeButtonClicked === 0) {
      // After reset, only allow one increment from 0 to 1
      setCloseButtonClicked(1);
    } else if (hasReset && closeButtonClicked === 1) {
      // After reaching 1 post-reset, go to 0 and stay there
      setCloseButtonClicked(0);
    } else if (!hasReset) {
      // Normal increment before reaching 6
      setCloseButtonClicked((prev) => prev + 1);
    }
    // If hasReset is true and closeButtonClicked is already 0 (after going from 1 to 0), stay at 0

    if (!hasReset && closeButtonClicked === 1) {
      setDiscount(selectedPlan.firstTimeDiscount);
      setShowDiscountModal(true);
      analytics.trackDiscountPopupShown("first_time", selectedPlan.firstTimeDiscount);
    }
    if (!hasReset && closeButtonClicked === 3) {
      setDiscount(selectedPlan.secondTimeDiscount);
      setShowDiscountModal(true);
      analytics.trackDiscountPopupShown("second_time", selectedPlan.secondTimeDiscount);
    }
  };

  const handleApply = () => {
    if (closeButtonClicked === 6) {
      setPayOnce(true);
      analytics.trackDiscountAccepted("pay_once", null, "pay_once_offer");
    } else if (discount) {
      // Track discount acceptance for first/second time discounts
      const discountType = discount === selectedPlan.firstTimeDiscount ? "first_time" : "second_time";
      analytics.trackDiscountAccepted(discountType, discount);
    }
    setCloseButtonClicked(0);
  };

  console.log(payOnce, "payOnce");

  return (
    <>
      <div className="_modalOverlay_1suhk_1 _fadeIn_1suhk_13 _overlay_1dyh6_1">
        <div className="_modalContainer_1suhk_17 _modalContainer_1dyh6_8" style={{ maxWidth: "450px" }}>
          <button
            id="close_modal_wind"
            onClick={handleClose}
            className="_closeButton_1suhk_59 _absolute_1suhk_78 _closeModalButton_1dyh6_30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.79279 6.79302C6.98031 6.60555 7.23462 6.50023 7.49979 6.50023C7.76495 6.50023 8.01926 6.60555 8.20679 6.79302L11.9998 10.586L15.7928 6.79302C15.885 6.69751 15.9954 6.62133 16.1174 6.56892C16.2394 6.51651 16.3706 6.48892 16.5034 6.48777C16.6362 6.48662 16.7678 6.51192 16.8907 6.5622C17.0136 6.61248 17.1253 6.68673 17.2192 6.78062C17.3131 6.87452 17.3873 6.98617 17.4376 7.10907C17.4879 7.23196 17.5132 7.36364 17.512 7.49642C17.5109 7.6292 17.4833 7.76042 17.4309 7.88242C17.3785 8.00443 17.3023 8.11477 17.2068 8.20702L13.4138 12L17.2068 15.793C17.3889 15.9816 17.4897 16.2342 17.4875 16.4964C17.4852 16.7586 17.38 17.0094 17.1946 17.1948C17.0092 17.3802 16.7584 17.4854 16.4962 17.4877C16.234 17.49 15.9814 17.3892 15.7928 17.207L11.9998 13.414L8.20679 17.207C8.01818 17.3892 7.76558 17.49 7.50339 17.4877C7.24119 17.4854 6.99038 17.3802 6.80497 17.1948C6.61956 17.0094 6.51439 16.7586 6.51211 16.4964C6.50983 16.2342 6.61063 15.9816 6.79279 15.793L10.5858 12L6.79279 8.20702C6.60532 8.01949 6.5 7.76518 6.5 7.50002C6.5 7.23486 6.60532 6.98055 6.79279 6.79302Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <div className="_content_1suhk_111 _content_1dyh6_42">
            <div id="pay_frame" className="_logoWrapper_ayi1c_1">
              <div className="_logo_1ocmx_1 _logo_ayi1c_1">
                <svg
                  width="148"
                  height="24"
                  viewBox="0 0 148 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="_logoText_1ocmx_9"
                >
                  <g clip-path="url(#clip0_2014_2673)">
                    <path
                      d="M6.44271 24.6202C5.70671 24.6202 5.00671 24.5002 4.34271 24.2602C3.67871 24.0282 3.08271 23.7002 2.55471 23.2762C2.03471 22.8602 1.61071 22.3722 1.28271 21.8122L4.30671 20.3482C4.51471 20.7322 4.81071 21.0242 5.19471 21.2242C5.58671 21.4242 6.01071 21.5242 6.46671 21.5242C6.95471 21.5242 7.41471 21.4402 7.84671 21.2722C8.27871 21.1122 8.62271 20.8682 8.87871 20.5402C9.14271 20.2202 9.26671 19.8202 9.25071 19.3402V15.5722H9.65871V5.54022H12.5148V19.3882C12.5148 19.7082 12.4988 20.0082 12.4668 20.2882C12.4428 20.5762 12.3948 20.8602 12.3228 21.1402C12.1148 21.9322 11.7268 22.5842 11.1588 23.0962C10.5988 23.6082 9.91071 23.9882 9.09471 24.2362C8.27871 24.4922 7.39471 24.6202 6.44271 24.6202ZM6.15471 18.8602C4.96271 18.8602 3.91871 18.5602 3.02271 17.9602C2.12671 17.3602 1.42671 16.5442 0.922711 15.5122C0.426711 14.4802 0.178711 13.3162 0.178711 12.0202C0.178711 10.7002 0.430711 9.52822 0.934711 8.50422C1.44671 7.47222 2.16271 6.66022 3.08271 6.06822C4.00271 5.47622 5.08271 5.18022 6.32271 5.18022C7.55471 5.18022 8.59071 5.48022 9.43071 6.08022C10.2708 6.68022 10.9068 7.49622 11.3387 8.52822C11.7708 9.56022 11.9868 10.7242 11.9868 12.0202C11.9868 13.3162 11.7668 14.4802 11.3268 15.5122C10.8948 16.5442 10.2468 17.3602 9.38271 17.9602C8.51871 18.5602 7.44271 18.8602 6.15471 18.8602ZM6.68271 15.9562C7.41071 15.9562 7.99071 15.7922 8.42271 15.4642C8.86271 15.1362 9.17871 14.6762 9.37071 14.0842C9.56271 13.4922 9.65871 12.8042 9.65871 12.0202C9.65871 11.2362 9.56271 10.5482 9.37071 9.95622C9.17871 9.36422 8.87071 8.90422 8.44671 8.57622C8.03071 8.24822 7.48271 8.08422 6.80271 8.08422C6.07471 8.08422 5.47471 8.26422 5.00271 8.62422C4.53871 8.97622 4.19471 9.45222 3.97071 10.0522C3.74671 10.6442 3.63471 11.3002 3.63471 12.0202C3.63471 12.7482 3.74271 13.4122 3.95871 14.0122C4.17471 14.6042 4.50671 15.0762 4.95471 15.4282C5.40271 15.7802 5.97871 15.9562 6.68271 15.9562ZM21.8993 18.8602C20.5713 18.8602 19.3993 18.5762 18.3833 18.0082C17.3753 17.4322 16.5833 16.6442 16.0073 15.6442C15.4393 14.6362 15.1553 13.4842 15.1553 12.1882C15.1553 10.7722 15.4353 9.54022 15.9953 8.49222C16.5553 7.44422 17.3273 6.63222 18.3113 6.05622C19.2953 5.47222 20.4273 5.18022 21.7073 5.18022C23.0673 5.18022 24.2233 5.50022 25.1753 6.14022C26.1273 6.78022 26.8313 7.68022 27.2873 8.84022C27.7433 10.0002 27.9033 11.3642 27.7673 12.9322H24.5393V11.7322C24.5393 10.4122 24.3273 9.46422 23.9033 8.88822C23.4873 8.30422 22.8033 8.01222 21.8513 8.01222C20.7393 8.01222 19.9193 8.35222 19.3913 9.03222C18.8713 9.70422 18.6113 10.7002 18.6113 12.0202C18.6113 13.2282 18.8713 14.1642 19.3913 14.8282C19.9193 15.4842 20.6913 15.8122 21.7073 15.8122C22.3473 15.8122 22.8953 15.6722 23.3513 15.3922C23.8073 15.1122 24.1553 14.7082 24.3953 14.1802L27.6593 15.1162C27.1713 16.3002 26.3993 17.2202 25.3433 17.8762C24.2953 18.5322 23.1473 18.8602 21.8993 18.8602ZM17.6033 12.9322V10.5082H26.1953V12.9322H17.6033ZM38.2529 18.5002C37.3569 18.6682 36.4769 18.7402 35.6129 18.7162C34.7569 18.7002 33.9889 18.5522 33.3089 18.2722C32.6369 17.9842 32.1249 17.5242 31.7729 16.8922C31.4529 16.3002 31.2849 15.7002 31.2689 15.0922C31.2529 14.4762 31.2449 13.7802 31.2449 13.0042V1.94022H34.5089V12.8122C34.5089 13.3162 34.5129 13.7722 34.5209 14.1802C34.5369 14.5802 34.6209 14.9002 34.7729 15.1402C35.0609 15.5962 35.5209 15.8442 36.1529 15.8842C36.7849 15.9242 37.4849 15.8922 38.2529 15.7882V18.5002ZM29.0369 8.06022V5.54022H38.2529V8.06022H29.0369ZM40.9009 12.1882V9.66822H48.1009V12.1882H40.9009ZM60.0511 18.5002V12.3802C60.0511 12.0842 60.0351 11.7082 60.0031 11.2522C59.9711 10.7882 59.8711 10.3242 59.7031 9.86022C59.5351 9.39622 59.2591 9.00822 58.8751 8.69622C58.4991 8.38422 57.9631 8.22822 57.2671 8.22822C56.9871 8.22822 56.6871 8.27222 56.3671 8.36022C56.0471 8.44822 55.7471 8.62022 55.4671 8.87622C55.1871 9.12422 54.9551 9.49222 54.7711 9.98022C54.5951 10.4682 54.5071 11.1162 54.5071 11.9242L52.6351 11.0362C52.6351 10.0122 52.8431 9.05222 53.2591 8.15622C53.6751 7.26022 54.2991 6.53622 55.1311 5.98422C55.9711 5.43222 57.0271 5.15622 58.2991 5.15622C59.3151 5.15622 60.1431 5.32822 60.7831 5.67222C61.4231 6.01622 61.9191 6.45222 62.2711 6.98022C62.6311 7.50822 62.8871 8.06022 63.0391 8.63622C63.1911 9.20422 63.2831 9.72422 63.3151 10.1962C63.3471 10.6682 63.3631 11.0122 63.3631 11.2282V18.5002H60.0511ZM51.1951 18.5002V1.22021H54.0991V10.1002H54.5071V18.5002H51.1951ZM72.3089 18.8602C71.0049 18.8602 69.8609 18.5682 68.8769 17.9842C67.8929 17.4002 67.1249 16.5962 66.5729 15.5722C66.0289 14.5402 65.7569 13.3562 65.7569 12.0202C65.7569 10.6682 66.0369 9.48022 66.5969 8.45622C67.1569 7.42422 67.9289 6.62022 68.9129 6.04422C69.8969 5.46822 71.0289 5.18022 72.3089 5.18022C73.6129 5.18022 74.7569 5.47222 75.7409 6.05622C76.7329 6.64022 77.5049 7.44822 78.0569 8.48022C78.6089 9.50422 78.8849 10.6842 78.8849 12.0202C78.8849 13.3642 78.6049 14.5522 78.0449 15.5842C77.4929 16.6082 76.7209 17.4122 75.7289 17.9962C74.7449 18.5722 73.6049 18.8602 72.3089 18.8602ZM72.3089 15.8122C73.3569 15.8122 74.1369 15.4602 74.6489 14.7562C75.1689 14.0442 75.4289 13.1322 75.4289 12.0202C75.4289 10.8682 75.1649 9.94822 74.6369 9.26022C74.1169 8.57222 73.3409 8.22822 72.3089 8.22822C71.5969 8.22822 71.0129 8.38822 70.5569 8.70822C70.1009 9.02822 69.7609 9.47222 69.5369 10.0402C69.3209 10.6082 69.2129 11.2682 69.2129 12.0202C69.2129 13.1802 69.4729 14.1042 69.9929 14.7922C70.5209 15.4722 71.2929 15.8122 72.3089 15.8122ZM90.3558 18.5002V12.3802C90.3558 12.0842 90.3398 11.7082 90.3078 11.2522C90.2758 10.7882 90.1758 10.3242 90.0078 9.86022C89.8398 9.39622 89.5638 9.00822 89.1798 8.69622C88.8038 8.38422 88.2678 8.22822 87.5718 8.22822C87.2918 8.22822 86.9918 8.27222 86.6718 8.36022C86.3518 8.44822 86.0518 8.62022 85.7718 8.87622C85.4918 9.12422 85.2598 9.49222 85.0758 9.98022C84.8998 10.4682 84.8118 11.1162 84.8118 11.9242L82.9398 11.0362C82.9398 10.0122 83.1478 9.05222 83.5638 8.15622C83.9798 7.26022 84.6038 6.53622 85.4358 5.98422C86.2758 5.43222 87.3318 5.15622 88.6038 5.15622C89.6198 5.15622 90.4478 5.32822 91.0878 5.67222C91.7278 6.01622 92.2238 6.45222 92.5758 6.98022C92.9358 7.50822 93.1918 8.06022 93.3438 8.63622C93.4958 9.20422 93.5878 9.72422 93.6198 10.1962C93.6518 10.6682 93.6678 11.0122 93.6678 11.2282V18.5002H90.3558ZM81.4998 18.5002V5.54022H84.4038V9.83622H84.8118V18.5002H81.4998ZM102.571 18.8602C101.243 18.8602 100.071 18.5762 99.0552 18.0082C98.0472 17.4322 97.2552 16.6442 96.6792 15.6442C96.1112 14.6362 95.8272 13.4842 95.8272 12.1882C95.8272 10.7722 96.1072 9.54022 96.6672 8.49222C97.2272 7.44422 97.9992 6.63222 98.9832 6.05622C99.9672 5.47222 101.099 5.18022 102.379 5.18022C103.739 5.18022 104.895 5.50022 105.847 6.14022C106.799 6.78022 107.503 7.68022 107.959 8.84022C108.415 10.0002 108.575 11.3642 108.439 12.9322H105.211V11.7322C105.211 10.4122 104.999 9.46422 104.575 8.88822C104.159 8.30422 103.475 8.01222 102.523 8.01222C101.411 8.01222 100.591 8.35222 100.063 9.03222C99.5432 9.70422 99.2832 10.7002 99.2832 12.0202C99.2832 13.2282 99.5432 14.1642 100.063 14.8282C100.591 15.4842 101.363 15.8122 102.379 15.8122C103.019 15.8122 103.567 15.6722 104.023 15.3922C104.479 15.1122 104.827 14.7082 105.067 14.1802L108.331 15.1162C107.843 16.3002 107.071 17.2202 106.015 17.8762C104.967 18.5322 103.819 18.8602 102.571 18.8602ZM98.2752 12.9322V10.5082H106.867V12.9322H98.2752ZM112.57 24.2602L115.066 17.3962L115.114 19.4122L109.474 5.54022H112.858L116.65 15.3562H115.882L119.65 5.54022H122.914L115.594 24.2602H112.57Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M123.208 18.4999V15.2359H126.472V18.4999H123.208ZM133.968 18.8599C133.04 18.8599 132.252 18.6839 131.604 18.3319C130.964 17.9719 130.476 17.4959 130.14 16.9039C129.812 16.3039 129.648 15.6439 129.648 14.9239C129.648 14.3239 129.74 13.7759 129.924 13.2799C130.108 12.7839 130.404 12.3479 130.812 11.9719C131.228 11.5879 131.784 11.2679 132.48 11.0119C132.96 10.8359 133.532 10.6799 134.196 10.5439C134.86 10.4079 135.612 10.2799 136.452 10.1599C137.292 10.0319 138.216 9.89186 139.224 9.73986L138.048 10.3879C138.048 9.61986 137.864 9.05586 137.496 8.69586C137.128 8.33586 136.512 8.15586 135.648 8.15586C135.168 8.15586 134.668 8.27186 134.148 8.50386C133.628 8.73586 133.264 9.14786 133.056 9.73986L130.104 8.80386C130.432 7.73186 131.048 6.85986 131.952 6.18786C132.856 5.51586 134.088 5.17986 135.648 5.17986C136.792 5.17986 137.808 5.35586 138.696 5.70786C139.584 6.05986 140.256 6.66786 140.712 7.53186C140.968 8.01186 141.12 8.49186 141.168 8.97186C141.216 9.45186 141.24 9.98786 141.24 10.5799V18.4999H138.384V15.8359L138.792 16.3879C138.16 17.2599 137.476 17.8919 136.74 18.2839C136.012 18.6679 135.088 18.8599 133.968 18.8599ZM134.664 16.2919C135.264 16.2919 135.768 16.1879 136.176 15.9799C136.592 15.7639 136.92 15.5199 137.16 15.2479C137.408 14.9759 137.576 14.7479 137.664 14.5639C137.832 14.2119 137.928 13.8039 137.952 13.3399C137.984 12.8679 138 12.4759 138 12.1639L138.96 12.4039C137.992 12.5639 137.208 12.6999 136.608 12.8119C136.008 12.9159 135.524 13.0119 135.156 13.0999C134.788 13.1879 134.464 13.2839 134.184 13.3879C133.864 13.5159 133.604 13.6559 133.404 13.8079C133.212 13.9519 133.068 14.1119 132.972 14.2879C132.884 14.4639 132.84 14.6599 132.84 14.8759C132.84 15.1719 132.912 15.4279 133.056 15.6439C133.208 15.8519 133.42 16.0119 133.692 16.1239C133.964 16.2359 134.288 16.2919 134.664 16.2919ZM144.6 3.73986V0.859863H147.864V3.73986H144.6ZM144.6 18.4999V5.53986H147.864V18.4999H144.6Z"
                      fill="#AE52E7"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_2014_2673">
                      <rect width="148" height="25" fill="white" transform="translate(0 0.5)"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="_formContainer_7jff0_1">
              <div className="_paymentContent_7jff0_32">
                <StripeComponent price={finalPrice} />
                <div className="_secureBlock_7jff0_78">
                  <div className="_secureFeature_7jff0_97">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <g filter="url(#filter0_i_10753_18579)">
                        <path
                          d="M27.9997 10.6669C28.7069 10.6669 29.3852 10.9478 29.8853 11.4479C30.3854 11.948 30.6663 12.6263 30.6663 13.3335V18.6669C30.6663 19.3741 30.3854 20.0524 29.8853 20.5525C29.3852 21.0526 28.7069 21.3335 27.9997 21.3335H26.5837C26.2589 23.9114 25.0044 26.282 23.0556 28.0005C21.1069 29.719 18.5979 30.6671 15.9997 30.6669V28.0002C18.1214 28.0002 20.1562 27.1573 21.6565 25.657C23.1568 24.1568 23.9997 22.1219 23.9997 20.0002V12.0002C23.9997 9.87846 23.1568 7.84363 21.6565 6.34334C20.1562 4.84305 18.1214 4.00019 15.9997 4.00019C13.8779 4.00019 11.8431 4.84305 10.3428 6.34334C8.84253 7.84363 7.99967 9.87846 7.99967 12.0002V21.3335H3.99967C3.29243 21.3335 2.61415 21.0526 2.11406 20.5525C1.61396 20.0524 1.33301 19.3741 1.33301 18.6669V13.3335C1.33301 12.6263 1.61396 11.948 2.11406 11.4479C2.61415 10.9478 3.29243 10.6669 3.99967 10.6669H5.41567C5.74105 8.08939 6.99578 5.71922 8.94444 4.00109C10.8931 2.28296 13.4017 1.33496 15.9997 1.33496C18.5976 1.33496 21.1062 2.28296 23.0549 4.00109C25.0036 5.71922 26.2583 8.08939 26.5837 10.6669H27.9997ZM10.3463 21.0469L11.7597 18.7855C13.0304 19.5817 14.5001 20.0028 15.9997 20.0002C17.4992 20.0028 18.969 19.5817 20.2397 18.7855L21.653 21.0469C19.9588 22.1086 17.9991 22.6701 15.9997 22.6669C14.0003 22.6701 12.0406 22.1086 10.3463 21.0469Z"
                          fill="url(#paint0_linear_10753_18579)"
                        ></path>
                      </g>
                      <defs>
                        <filter
                          id="filter0_i_10753_18579"
                          x="0"
                          y="-1"
                          width="32"
                          height="33"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          ></feColorMatrix>
                          <feOffset dy="-1.5"></feOffset>
                          <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                          ></feColorMatrix>
                          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_10753_18579"></feBlend>
                        </filter>
                        <linearGradient
                          id="paint0_linear_10753_18579"
                          x1="15.9997"
                          y1="1.33496"
                          x2="15.9997"
                          y2="30.6669"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#808080"></stop>
                          <stop offset="1" stop-color="#545454"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <p>Customer Support</p>
                  </div>
                  <div className="_secureFeature_7jff0_97">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <g filter="url(#filter0_i_10753_18583)">
                        <path
                          d="M16 1.33301L4 6.66634V14.6663C4 22.0663 9.12 28.9863 16 30.6663C22.88 28.9863 28 22.0663 28 14.6663V6.66634L16 1.33301ZM16 9.33301C17.8667 9.33301 19.7333 10.7997 19.7333 12.6663V14.6663C20.5333 14.6663 21.3333 15.4663 21.3333 16.3997V21.0663C21.3333 21.8663 20.5333 22.6663 19.6 22.6663H12.2667C11.4667 22.6663 10.6667 21.8663 10.6667 20.933V16.2663C10.6667 15.4663 11.4667 14.6663 12.2667 14.6663V12.6663C12.2667 10.7997 14.1333 9.33301 16 9.33301ZM16 10.933C14.9333 10.933 14 11.5997 14 12.6663V14.6663H18V12.6663C18 11.5997 17.0667 10.933 16 10.933Z"
                          fill="url(#paint0_linear_10753_18583)"
                        ></path>
                      </g>
                      <defs>
                        <filter
                          id="filter0_i_10753_18583"
                          x="0"
                          y="-1"
                          width="32"
                          height="33"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          ></feColorMatrix>
                          <feOffset dy="-1.5"></feOffset>
                          <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                          ></feColorMatrix>
                          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_10753_18583"></feBlend>
                        </filter>
                        <linearGradient
                          id="paint0_linear_10753_18583"
                          x1="16"
                          y1="1.33301"
                          x2="16"
                          y2="30.6663"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#808080"></stop>
                          <stop offset="1" stop-color="#545454"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <p>100% Secure Payment</p>
                  </div>
                  <div className="_secureFeature_7jff0_97">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <g filter="url(#filter0_i_10753_18587)">
                        <path
                          d="M22.667 17.3333C24.0815 17.3333 25.438 17.8952 26.4382 18.8954C27.4384 19.8956 28.0003 21.2522 28.0003 22.6667C28.0003 24.0812 27.4384 25.4377 26.4382 26.4379C25.438 27.4381 24.0815 28 22.667 28C19.811 28 17.3337 25.6133 17.3337 22.6667H14.667C14.6665 23.9606 14.1956 25.2102 13.3421 26.1827C12.4885 27.1552 11.3106 27.7842 10.0277 27.9526C8.74474 28.121 7.44436 27.8172 6.36879 27.0979C5.29323 26.3786 4.51584 25.2928 4.18148 24.0428C3.84711 22.7928 3.97856 21.4639 4.55134 20.3037C5.12413 19.1434 6.09918 18.231 7.29482 17.7363C8.49047 17.2417 9.82516 17.1986 11.0502 17.6151C12.2753 18.0315 13.3072 18.8791 13.9537 20H18.047C18.5152 19.1891 19.1886 18.5157 19.9996 18.0476C20.8106 17.5795 21.7306 17.3331 22.667 17.3333ZM2.66699 16V13.3333H5.33366V9.33333C5.33366 7.91885 5.89556 6.56229 6.89576 5.5621C7.89595 4.5619 9.2525 4 10.667 4H21.3337C22.7481 4 24.1047 4.5619 25.1049 5.5621C26.1051 6.56229 26.667 7.91885 26.667 9.33333V13.3333H29.3337V16H2.66699Z"
                          fill="url(#paint0_linear_10753_18587)"
                        ></path>
                      </g>
                      <defs>
                        <filter
                          id="filter0_i_10753_18587"
                          x="0"
                          y="-1"
                          width="32"
                          height="33"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          ></feColorMatrix>
                          <feOffset dy="-1.5"></feOffset>
                          <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                          ></feColorMatrix>
                          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_10753_18587"></feBlend>
                        </filter>
                        <linearGradient
                          id="paint0_linear_10753_18587"
                          x1="16.0003"
                          y1="4"
                          x2="16.0003"
                          y2="28"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#808080"></stop>
                          <stop offset="1" stop-color="#545454"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <p>Anonymous Payment</p>
                  </div>
                </div>
                <p className="_checkout_7jff0_109">Checkout</p>
                <div className="_summaryBlock_7jff0_119">
                  <div className="_container_18f2m_1 _container_1sc2h_1 _orderSummary_ayi1c_70">
                    <p className="_title_18f2m_14 _title_1sc2h_1">Order Summary</p>
                    <p>
                      Product <span id="summary_product">{selectedPlan.tenure} months subscription</span>
                    </p>
                    <p>
                      Discount
                      <span className="_discount_xkrbg_1">- {discount}%</span>
                    </p>
                    <div className="_block_qkgwv_1">
                      <p className="_row_qkgwv_5">
                        Your offer
                        <span className="_values_qkgwv_11">
                          <span className="_prevValue_qkgwv_19">${originalPrice}</span>
                          <span className="_currentValue_qkgwv_23">$ {finalPrice}</span>
                        </span>
                      </p>
                    </div>
                    <p>
                      You just saved
                      <span className="_savings_xkrbg_5">$ {savedAmount}</span>
                    </p>
                    <div className="_divider_1sc2h_13"></div>
                    <p id="summary_total_to_pay" className="_total_1sc2h_18">
                      Total to pay<span>$ {finalPrice}</span>
                    </p>
                  </div>
                </div>
                <p className="_faq_7jff0_136">FAQ</p>
                <FAQ />
                <p className="_contactUsBlock_7jff0_172">
                  Have a question? <a href="/contact-us">Contact Us</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {closeButtonClicked === 1 && <FirstDiscountModal skip={handleSkip} apply={handleApply} />}
      {closeButtonClicked === 2 && (
        <SecondDiscountModal
          discountedPrice={discountedPerDayPrice}
          discount={discount || 0}
          tenure={selectedPlan.tenure}
          originalPrice={selectedPlan.originalPrice}
          skip={handleSkip}
          apply={handleApply}
        />
      )}
      {closeButtonClicked === 3 && <ThirdModal skip={handleSkip} apply={handleApply} />}
      {closeButtonClicked === 4 && (
        <FourthModal
          discountedPrice={discountedPerDayPrice}
          discount={discount || 0}
          tenure={selectedPlan.tenure}
          originalPrice={selectedPlan.originalPrice}
          skip={handleSkip}
          apply={handleApply}
        />
      )}
      {closeButtonClicked === 5 && <FifthModal skip={handleSkip} apply={handleApply} />}
      {closeButtonClicked === 6 && <SixthModal skip={handleSkip} apply={handleApply} />}
      {showDiscountModal && <DiscountPopupModal discount={discount || 0} />}
    </>
  );
}

export default PaymentModal;
