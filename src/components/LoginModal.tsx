"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import SignInModal from "./SignInModal";
import { useAuth } from "@/context/AuthContextProvider";

type LoginModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function LoginModal({ isOpen = true, onClose = () => {} }: LoginModalProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      onClose();
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }
  const handleClose = () => {
    setShowSignupModal(false);
    onClose();
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  return (
    <>
      <Dialog.Root
        open={isOpen && !showSignupModal}
        onOpenChange={(open) => {
          if (!open && !showSignupModal) handleClose();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content
            style={{ backgroundColor: "var(--main, rgb(24 24 27))" }}
            className="fixed left-1/2 top-1/2 z-50 w-[96%] max-w-[700px] md:max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-[var(--gray-dark)] p-8 md:p-10 text-white shadow-2xl"
          >
            <button
              aria-label="Close"
              onClick={handleClose}
              className="absolute mr-5 mt-2.5 mb-2.5 right-4 top-4 rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
            >
              <X className="h-5 w-5 cursor-pointer" />
            </button>

            <h2 className="mb-3 mt-6 text-2xl font-bold text-center">Login</h2>

            {error && <p className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4">{error}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="group relative mt-6 mb-[14px]">
                <label htmlFor="email" className="sr-only">
                  E-mail
                </label>
                <div className="flex items-center gap-3 rounded-lg border-0 bg-zinc-800/80 px-3 py-1.5 text-sm ring-offset-0 transition focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                      fill="#808080"
                    ></path>
                  </svg>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    aria-label="E-mail"
                    autoComplete="email"
                    className="w-full text-base bg-transparent py-2 text-white placeholder:text-[var(--gray)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="group relative mb-[14px]">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-lg border-0 bg-zinc-800/80 px-3 py-1.5 text-sm ring-offset-0 transition focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.25 10.055V8C5.25 6.20979 5.96116 4.4929 7.22703 3.22703C8.4929 1.96116 10.2098 1.25 12 1.25C13.7902 1.25 15.5071 1.96116 16.773 3.22703C18.0388 4.4929 18.75 6.20979 18.75 8V10.055C19.865 10.138 20.59 10.348 21.121 10.879C22 11.757 22 13.172 22 16C22 18.828 22 20.243 21.121 21.121C20.243 22 18.828 22 16 22H8C5.172 22 3.757 22 2.879 21.121C2 20.243 2 18.828 2 16C2 13.172 2 11.757 2.879 10.879C3.409 10.348 4.135 10.138 5.25 10.055ZM6.75 8C6.75 6.60761 7.30312 5.27225 8.28769 4.28769C9.27225 3.30312 10.6076 2.75 12 2.75C13.3924 2.75 14.7277 3.30312 15.7123 4.28769C16.6969 5.27225 17.25 6.60761 17.25 8V10.004C16.867 10 16.451 10 16 10H8C7.548 10 7.133 10 6.75 10.004V8ZM8 17C8.26522 17 8.51957 16.8946 8.70711 16.7071C8.89464 16.5196 9 16.2652 9 16C9 15.7348 8.89464 15.4804 8.70711 15.2929C8.51957 15.1054 8.26522 15 8 15C7.73478 15 7.48043 15.1054 7.29289 15.2929C7.10536 15.4804 7 15.7348 7 16C7 16.2652 7.10536 16.5196 7.29289 16.7071C7.48043 16.8946 7.73478 17 8 17ZM12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17ZM17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16Z"
                      fill="#808080"
                    ></path>
                  </svg>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                    autoComplete="current-password"
                    className="w-full text-base bg-transparent py-2 pr-8 text-white placeholder:text-[var(--gray)] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="ml-2 rounded p-1 text-zinc-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Eye className="h-6 w-6" aria-hidden="true" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mb-0 rounded-[12px] bg-gradient-to-r from-pink-500 to-purple-600 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
              >
                {loading ? "Logging In..." : "Login"}
              </button>

              {/* <p className="font-normal text-base text-center p-4 mb-0">or</p> */}

              {/* <button
                type="button"
                className="mb-0 flex items-center justify-center gap-[10px] rounded-[12px] border-none bg-[#1f1625] px-6 py-3 text-center text-white text-sm transition-opacity duration-200 hover:opacity-90 w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path
                    d="M8.86061 0.789371C6.46264 1.62125 4.39463 3.20018 2.96035 5.29425C1.52606 7.38832 0.801099 9.88714 0.891944 12.4237C0.98279 14.9602 1.88466 17.4008 3.46507 19.3869C5.04549 21.373 7.22115 22.7999 9.67249 23.4581C11.6598 23.9709 13.742 23.9934 15.74 23.5237C17.55 23.1172 19.2233 22.2476 20.5962 21C22.0251 19.6619 23.0623 17.9596 23.5962 16.0762C24.1766 14.0281 24.2799 11.8742 23.8981 9.78H12.7381V14.4094H19.2012C19.0721 15.1477 18.7953 15.8524 18.3874 16.4813C17.9795 17.1102 17.449 17.6503 16.8275 18.0694C16.0383 18.5914 15.1486 18.9427 14.2156 19.1006C13.2799 19.2746 12.3201 19.2746 11.3844 19.1006C10.436 18.9045 9.5388 18.5131 8.74999 17.9512C7.48277 17.0542 6.53126 15.7799 6.03124 14.31C5.52277 12.8126 5.52277 11.1893 6.03124 9.69187C6.38716 8.64228 6.97555 7.68663 7.75249 6.89625C8.6416 5.97515 9.76724 5.31674 11.0059 4.99326C12.2446 4.66979 13.5484 4.69374 14.7744 5.0625C15.7321 5.35648 16.6078 5.87013 17.3319 6.5625C18.0606 5.8375 18.7881 5.11062 19.5144 4.38187C19.8894 3.99 20.2981 3.61687 20.6675 3.21562C19.5623 2.18714 18.265 1.38685 16.85 0.860622C14.2732 -0.0750226 11.4537 -0.100167 8.86061 0.789371Z"
                    fill="white"
                  ></path>
                  <path
                    d="M8.86064 0.789375C11.4535 -0.100768 14.273 -0.0762857 16.85 0.85875C18.2653 1.38856 19.562 2.1927 20.6656 3.225C20.2906 3.62625 19.895 4.00125 19.5125 4.39125C18.785 5.1175 18.0581 5.84125 17.3319 6.5625C16.6079 5.87013 15.7321 5.35648 14.7744 5.0625C13.5488 4.69245 12.2451 4.66711 11.0061 4.98927C9.76706 5.31142 8.64073 5.96862 7.75064 6.88875C6.9737 7.67913 6.38532 8.63478 6.02939 9.68437L2.14252 6.675C3.53378 3.91605 5.94267 1.80567 8.86064 0.789375Z"
                    fill="#E33629"
                  ></path>
                  <path
                    d="M1.11128 9.65625C1.32019 8.62087 1.66704 7.61818 2.14253 6.675L6.0294 9.69188C5.52093 11.1893 5.52093 12.8126 6.0294 14.31C4.7344 15.31 3.43878 16.315 2.14253 17.325C0.952186 14.9556 0.589153 12.2559 1.11128 9.65625Z"
                    fill="#F8BD00"
                  ></path>
                  <path
                    d="M12.7381 9.77812H23.8981C24.2799 11.8724 24.1766 14.0263 23.5963 16.0744C23.0623 17.9578 22.0252 19.66 20.5963 20.9981C19.3419 20.0194 18.0819 19.0481 16.8275 18.0694C17.4494 17.6499 17.9802 17.1092 18.3881 16.4796C18.796 15.8501 19.0726 15.1446 19.2013 14.4056H12.7381C12.7363 12.8644 12.7381 11.3212 12.7381 9.77812Z"
                    fill="#587DBD"
                  ></path>
                  <path
                    d="M2.14062 17.325C3.43687 16.325 4.7325 15.32 6.0275 14.31C6.52851 15.7804 7.48138 17.0548 8.75 17.9512C9.54127 18.5105 10.4404 18.8987 11.39 19.0912C12.3257 19.2652 13.2855 19.2652 14.2213 19.0912C15.1542 18.9333 16.0439 18.5821 16.8331 18.06C18.0875 19.0387 19.3475 20.01 20.6019 20.9887C19.2292 22.237 17.5558 23.1073 15.7456 23.5144C13.7476 23.9841 11.6655 23.9616 9.67813 23.4487C8.10632 23.0291 6.63814 22.2892 5.36563 21.2756C4.01874 20.2063 2.91867 18.8587 2.14062 17.325Z"
                    fill="#319F43"
                  ></path>
                </svg>
                <span className="text-lg text-center">Continue with Google</span>
              </button> */}

              {/* <p className="text-center text-[var(--gray)] text-base pt-1">
                {"You choose to log in manually. Enter your details or "}
                <button
                  type="button"
                  onClick={handleMagicLinkClick}
                  className="underline decoration-purple-400/70 underline-offset-2 text-[var(--accent)] cursor-pointer"
                >
                  log in using the magic link
                </button>
                {"."}
              </p> */}
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {showSignupModal && (
        <SignInModal
          isOpen={showSignupModal}
          onClose={() => {
            setShowSignupModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
