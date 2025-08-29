import mixpanel from "mixpanel-browser";
// Initialize Mixpanel
const initMixpanel = () => {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (token && typeof window !== "undefined") {
    mixpanel.init(token, {
      debug: process.env.NODE_ENV === "development",
      track_pageview: false, // We'll track custom events only
      persistence: "localStorage",
    });
  }
};

// Initialize on client side only
if (typeof window !== "undefined") {
  initMixpanel();
}

// Analytics tracking functions
export const analytics = {
  // Track quiz started event
  trackQuizStarted: () => {
    if (typeof window !== "undefined") {
      mixpanel.track("quiz_started", {
        timestamp: new Date().toISOString(),
        page: "home",
      });
    }
  },

  // Track quiz step progression
  trackQuizStep: (stepNumber: number, stepName?: string | null) => {
    if (typeof window !== "undefined") {
      mixpanel.track(`quiz_step_${stepNumber}`, {
        step_number: stepNumber,
        step_name: stepName,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Track discount popup shown
  trackDiscountPopupShown: (discountType?: string | null, discountAmount?: number | null) => {
    if (typeof window !== "undefined") {
      mixpanel.track("discount_popup_shown", {
        discount_type: discountType,
        discount_amount: discountAmount,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Track discount accepted
  trackDiscountAccepted: (
    discountType?: string | null,
    discountAmount?: number | null,
    discountCode?: string | null
  ) => {
    if (typeof window !== "undefined") {
      mixpanel.track("discount_accepted", {
        discount_type: discountType,
        discount_amount: discountAmount,
        discount_code: discountCode,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Track checkout started
  trackCheckoutStarted: (amount?: number | null, currency: string = "USD") => {
    if (typeof window !== "undefined") {
      mixpanel.track("checkout_started", {
        amount: amount,
        currency: currency,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Track payment success
  trackPaymentSuccess: (amount?: number | null, currency: string = "USD", paymentMethod?: string | null) => {
    if (typeof window !== "undefined") {
      mixpanel.track("payment_success", {
        amount: amount,
        currency: currency,
        payment_method: paymentMethod,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Track quiz abandoned (optional)
  trackQuizAbandoned: (lastStep?: number | null, timeSpent?: number | null) => {
    if (typeof window !== "undefined") {
      mixpanel.track("quiz_abandoned", {
        last_step: lastStep,
        time_spent_seconds: timeSpent,
        timestamp: new Date().toISOString(),
      });
    }
  },
};

export default analytics;
