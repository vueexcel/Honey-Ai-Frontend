import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Divider,
  Chip,
  Typography,
  Stack,
  Container,
  Paper,
  InputAdornment,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { CreditCard, Lock, Apple, Google } from "@mui/icons-material";
import analytics from "@/utils/analytics";

// Generate unique browser ID
function generateBrowserId() {
  if (typeof window === "undefined") return "";
  let browserId = localStorage.getItem("browser_id");
  if (!browserId) {
    browserId = `browser_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    localStorage.setItem("browser_id", browserId);
  }
  return browserId;
}

// Get user IP (simplified - in production you might want to use a service)
async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch {
    return "unknown";
  }
}

function isApplePaySupported() {
  if (typeof window === "undefined") return false;
  return (
    (window as any).ApplePaySession ||
    (window.PaymentRequest &&
      /Safari/.test(navigator.userAgent) &&
      /iPhone|iPad|Macintosh/.test(navigator.userAgent))
  );
}

function isGooglePaySupported() {
  if (typeof window === "undefined") return false;
  return (
    window.PaymentRequest &&
    /Android/.test(navigator.userAgent) &&
    /Chrome/.test(navigator.userAgent)
  );
}

const CheckoutForm = ({ price }: { price: number }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      // Remove all non-digits and limit to 16 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 16);
      // Add spaces every 4 digits
      formattedValue = formattedValue.replace(/(\d{4})/g, "$1 ").trim();
    } else if (field === "expiryDate") {
      // Remove all non-digits and limit to 4 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
      // Add slash after 2 digits
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
    } else if (field === "cvc") {
      // Remove all non-digits and limit to 4 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardData((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const validateCardData = () => {
    const { cardNumber, expiryDate, cvc } = cardData;

    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 13) {
      return "Please enter a valid card number";
    }

    if (!expiryDate || expiryDate.length < 5) {
      return "Please enter a valid expiry date (MM/YY)";
    }

    if (!cvc || cvc.length < 3) {
      return "Please enter a valid CVC code";
    }

    // Check if expiry date is in the future
    const [month, year] = expiryDate.split("/").map((num) => parseInt(num));
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Card has expired";
    }

    return null;
  };

  const handlePayment = async (e?: React.FormEvent, paymentMethod?: string) => {
    if (e) e.preventDefault();

    // Validate card fields for card payment
    if (!paymentMethod) {
      const validationError = validateCardData();
      if (validationError) {
        setErrorMessage(validationError);
        return;
      }
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const userBrowserId = generateBrowserId();
      const userIp = await getUserIP();

      // Send to Mixpanel
      if (typeof window !== "undefined" && (window as any).mixpanel) {
        (window as any).mixpanel.track("Payment Attempt", {
          amount: price,
          currency: "USD",
          payment_method: paymentMethod || "card",
          browser_id: userBrowserId,
          user_ip: userIp,
          timestamp: new Date().toISOString(),
        });
      }

      // Send to backend API
      const res = await fetch("/api/log-payment-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          currency: "USD",
          userBrowserId,
          userIp,
          paymentMethod: paymentMethod || "card",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Payment failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Track success
      analytics.trackPaymentSuccess(price, "USD", paymentMethod || "card");
      // Redirect to success page
      window.location.href = `${window.location.origin}/payment-completion?event_id=${data.eventId}`;
    } catch (err: any) {
      setErrorMessage(err.message || "Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          border: "1px solid #333",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: "#fff",
            fontWeight: 800,
            mb: 3,
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Payment Information
        </Typography>

        {/* Wallet Payment Buttons */}
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          {isApplePaySupported() && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => handlePayment(undefined, "apple_pay")}
              disabled={isProcessing}
              startIcon={<Apple />}
              sx={{
                height: { xs: 48, sm: 56 },
                borderRadius: 28,
                background: "#fff",
                color: "#000",
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                textTransform: "none",
                "&:hover": {
                  background: "#f5f5f5",
                },
                "&:disabled": {
                  background: "#e0e0e0",
                },
              }}
            >
              Pay with Apple Pay
            </Button>
          )}
          {isGooglePaySupported() && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => handlePayment(undefined, "google_pay")}
              disabled={isProcessing}
              startIcon={<Google />}
              sx={{
                height: { xs: 48, sm: 56 },
                borderRadius: 28,
                background: "#4285f4",
                color: "#fff",
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                textTransform: "none",
                "&:hover": {
                  background: "#3367d6",
                },
              }}
            >
              Pay with Google Pay
            </Button>
          )}
        </Stack>

        <Divider sx={{ my: 3 }}>
          <Chip
            label="or"
            sx={{
              backgroundColor: "transparent",
              border: "none",
              color: "#888",
              fontSize: "14px",
              fontWeight: 600,
            }}
          />
        </Divider>

        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 2,
            textAlign: "center",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          Proceed with Card
        </Typography>

        <Box component="form" onSubmit={handlePayment} sx={{ width: "100%" }}>
          <Stack spacing={2} sx={{ mb: 2, marginTop: "24px" }}>
            <TextField
              fullWidth
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={(e) =>
                handleCardInputChange("cardNumber", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCard sx={{ color: "#888" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#222",
                  color: "#fff",
                  borderRadius: 2,
                  transition: "all 0.2s ease-in-out",
                  "& fieldset": {
                    borderColor: "#333",
                  },
                  "&:hover fieldset": {
                    borderColor: "#555",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#18c95f",
                    borderWidth: 2,
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#2a2a2a",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#888",
                  "&.Mui-focused": {
                    color: "#18c95f",
                  },
                },
                "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                  transition: "color 0.2s ease-in-out",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root":
                  {
                    color: "#18c95f",
                  },
              }}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={(e) =>
                  handleCardInputChange("expiryDate", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#222",
                    color: "#fff",
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "& fieldset": {
                      borderColor: "#333",
                    },
                    "&:hover fieldset": {
                      borderColor: "#555",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#18c95f",
                      borderWidth: 2,
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#2a2a2a",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#888",
                    "&.Mui-focused": {
                      color: "#18c95f",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="CVC"
                placeholder="123"
                value={cardData.cvc}
                onChange={(e) => handleCardInputChange("cvc", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#222",
                    color: "#fff",
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "& fieldset": {
                      borderColor: "#333",
                    },
                    "&:hover fieldset": {
                      borderColor: "#555",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#18c95f",
                      borderWidth: 2,
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#2a2a2a",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#888",
                    "&.Mui-focused": {
                      color: "#18c95f",
                    },
                  },
                }}
              />
            </Stack>
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isProcessing}
            startIcon={
              isProcessing ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Lock />
              )
            }
            sx={{
              height: { xs: 48, sm: 56 },
              borderRadius: 2.5,
              background: "linear-gradient(45deg, #18c95f 30%, #15b854 90%)",
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              textTransform: "none",
              mt: 2,
              boxShadow: "0 4px 20px rgba(24, 201, 95, 0.3)",
              "&:hover": {
                background: "linear-gradient(45deg, #15b854 30%, #12a049 90%)",
                boxShadow: "0 6px 25px rgba(24, 201, 95, 0.4)",
              },
              "&:disabled": {
                background: "#666",
                boxShadow: "none",
              },
            }}
            endIcon={
              !isProcessing && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    ${price.toFixed(2)} USD
                  </Typography>
                </Box>
              )
            }
          >
            {isProcessing ? "Processing..." : "Continue"}
          </Button>

          {/* Security Notice */}
          <Typography
            variant="caption"
            sx={{
              color: "#888",
              textAlign: "center",
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <Lock sx={{ fontSize: 14 }} />
            Your payment information is secure and encrypted
          </Typography>

          {errorMessage && (
            <Typography
              variant="body2"
              sx={{
                color: "#e46161",
                mt: 2,
                textAlign: "center",
                p: 1,
                backgroundColor: "rgba(228, 97, 97, 0.1)",
                borderRadius: 1,
                border: "1px solid rgba(228, 97, 97, 0.3)",
              }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

function PaymentComponent({ price }: { price: number }) {
  return <CheckoutForm price={price} />;
}

export default PaymentComponent;
