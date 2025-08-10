"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContextProvider";

export default function SignInModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { login } = useAuth(); // from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[720px] h-[470px] rounded-xl bg-[#181818] overflow-hidden flex shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white z-50 cursor-pointer"
          >
            <X />
          </button>

          {/* Left Image */}
          <div className="w-1/2 h-full hidden md:block relative">
            <img
              src="https://get-honey.ai/assets/auth-sf-BBi0Zror.avif"
              alt="Login Visual"
              className="rounded-l-xl object-cover h-full w-full"
            />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-[24px] mb-[32px] font-bold text-center text-white">
              Sign In
            </h2>

            {error && (
              <p className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4">
                {error}
              </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="h-[46px] bg-[var(--main)] rounded-[12px] px-4 flex items-center gap-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                >
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
                  className="w-full bg-transparent text-white text-[16px] font-medium border-none outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div className="h-[46px] bg-[var(--main)] rounded-[12px] px-4 flex items-center gap-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                >
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
                  className="w-full bg-transparent text-white text-[16px] font-medium border-none outline-none"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[46px] bg-[var(--accent)] text-white rounded-xl text-[16px] font-medium transition duration-200 disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Login"}
              </button>
            </form>

            <p className="text-center font-bold text-[16px] mt-4">or</p>

            {/* Google Button */}
            <button
              type="button"
              onClick={() => console.log("Google login TODO")}
              className="w-full px-6 py-3 flex items-center justify-center gap-[10px] rounded-[12px] bg-[rgb(31,22,37)] text-white hover:bg-[#333] font-semibold mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                fill="none"
              >
                <path d="M12 2a10 10 0 1 0 0 20..." fill="white" />
              </svg>
              Continue with Google
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
