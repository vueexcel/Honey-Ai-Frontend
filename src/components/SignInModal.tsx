"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { signIn } from "@/utils/api";

export default function SignInModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      setShowLoginModal(true);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setShowLoginModal(false);
    onClose();
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      <Dialog.Root
        open={isOpen && !showLoginModal}
        onOpenChange={(open) => {
          if (!open && !showLoginModal) handleClose();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-[95vw] max-w-[880px] md:max-w-[880px] md:min-h-[470px]
              rounded-xl bg-[linear-gradient(144deg,_#181818_1.24%,_#101010)] text-white
              shadow-[0_20px_80px_rgba(0,0,0,0.6)]
              overflow-hidden
              grid grid-cols-1 md:grid-cols-[45%_55%]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-50 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative hidden h-[470px] md:block">
              <img
                src="https://get-honey.ai/assets/auth-sf-BBi0Zror.avif"
                alt="Sign in visual"
                sizes="(max-width: 768px) 0px, 440px"
                className="object-cover object-[center_top] p-[30px] rounded-l-xl rounded-[12px] h-full"
                priority
              />
            </div>

            <div className="flex h-full w-full flex-col justify-center p-6 pl-0">
              <Dialog.Title asChild>
                <h2 className="text-center text-[24px] font-bold tracking-tight mb-8">{"Sign In"}</h2>
              </Dialog.Title>

              {error && <p className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4">{error}</p>}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="h-[46px] bg-[var(--main)] rounded-[12px] px-4 flex items-center gap-[12px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                    <path
                      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                      fill="#808080"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-white text-[16px] font-medium border-none outline-none placeholder-white/70"
                    required
                  />
                </div>

                <div className="h-[46px] bg-[var(--main)] rounded-[12px] px-4 flex items-center gap-[12px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                    <path
                      d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-9h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2ZM8 6a4 4 0 0 1 8 0v2H8V6Z"
                      fill="#808080"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-white text-[16px] font-medium border-none outline-none placeholder-white/70"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[46px] cursor-pointer rounded-xl text-[16px] font-semibold text-white transition shadow-[0_8px_24px_rgba(165,64,234,0.35)] bg-gradient-to-r from-[#ff35d6] via-[#c44be9] to-[#7a40e6] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-50"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                {/* Divider */}
                {/* <p className="font-bold text-[16px] my-[6px] text-center">or</p> */}

                {/* Google Login */}
                {/* <button
                  type="button"
                  className="w-full h-[46px] rounded-[12px] bg-[#1f1625] text-white font-semibold flex items-center justify-center gap-2 cursor-pointer transition focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none">
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
                  Continue with Google
                </button> */}
              </form>
              <p className="mt-8 text-left text-[14px] leading-relaxed text-[var(--gray)]">
                We'll email you to confirm email address. <br />
                Or you can{" "}
                <span className="cursor-pointer underline text-[var(--pink)]" onClick={handleLoginClick}>
                  log in manually instead.
                </span>
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
