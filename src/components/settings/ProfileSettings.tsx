"use client";
import UserIcon from "@/components/icons/UserIcon";
import { useAuth } from "@/context/AuthContextProvider";
import CardIcon from "../icons/CardIcon";
import Button from "../ui/Button";
import FAQSection from "@/components/pricing/FrequentlyAskedQuestion";
import { useUser } from "@/context/UserContextProvider";

export default function ProfileSettings() {
  const { user } = useAuth();
  const { balance } = useUser();
  return (
    <section className="flex flex-col">
      <div className="max-w-[1460px] mx-auto px-3 xl:px-6 ">
        <h1 className="m-6 text-center text-3xl font-bold">Profile Settings</h1>
        <div className="mt-0 mb-6 mx-auto flex flex-col xl:flex-row rounded-3xl border-2 border-[var(--gray-dark)] bg-[var(--secondary)]">
          <div className="p-3 xl:p-12 flex flex-col xl:flex-row gap-12">
            <div className="self-center w-28 h-28 p-1 rounded-full bg-linear-[91deg,_#ff44ba_0%,_#8840b5_100%] flex items-center justify-center overflow-hidden">
              <UserIcon size={110} className="" />
            </div>
            <div className="flex flex-row xl:flex-col gap-6">
              <div className="flex flex-col xl:flex-row gap-12">
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[var(--gray)]">Name</span>
                  </div>
                  <p className="break-words">{user?.user_metadata.email?.split("@")[0]}</p>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[var(--gray)]">Email</span>
                  </div>
                  <p className="break-words">{user?.user_metadata.email}</p>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[var(--gray)]">Credits Remaining</span>
                  </div>
                  <p className="break-words">{balance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-0 mb-6 mx-auto flex flex-col xl:flex-row rounded-3xl border-2 border-[var(--gray-dark)] bg-[var(--secondary)]">
          <div className="p-3 xl:p-12 flex flex-col xl:flex-row items-start xl:items-center gap-4">
            <p className="text-[18px] font-bold">
              Current Plan
              <span className="text-[var(--accent)]"> Free</span>
            </p>
            <a className="h-12 py-3 px-6 flex justify-between items-center gap-2 rounded-xl border-2 border-[var(--accent)] text-[var(--accent)] text-[18px] font-semibold">
              <CardIcon />
              Edit Plan
            </a>
          </div>
        </div>
        <div className="min-h-[500px] grid grid-cols-1 xl:grid-cols-2  mt-0 mx-auto mb-6 overflow-hidden  rounded-3xl border-2 border-[var(--gray-dark)] bg-[var(--secondary)]">
          <div className="p-3 xl:p-12 h-full flex flex-col gap-6">
            <h1 className="text-[18px] font-bold">Contact Us</h1>
            <form className="flex flex-col gap-6">
              <div>
                <input
                  id="contact_email"
                  name="email"
                  placeholder="E-mail"
                  className="w-full p-3 bg-[var(--gray-dark)] rounded-xl text-white font-normal placeholder:text-[var(--gray)] placeholder:font-normal"
                />
              </div>
              <div>
                <textarea
                  id="contact_description"
                  name="description"
                  placeholder="Description"
                  className="w-full p-3 bg-[var(--gray-dark)] rounded-xl text-white font-normal h-48 placeholder:text-[var(--gray)] placeholder:font-normal resize-none"
                />
              </div>
              <div className="text-[var(--gray)] font-medium">
                By clicking the "Send" button, I agree to the{" "}
                <a href="" className="underline">
                  Privacy Policy
                </a>
              </div>
              <Button
                variant="gradient"
                className="w-full h-12 rounded-xl flex items-center justify-center text-base font-bold gap-2"
              >
                Send
              </Button>
            </form>
          </div>
          <img src="https://get-honey.ai/assets/contact-us-BQKjk95Q.webp" />
        </div>
        <div className="mt-0 mb-6 mx-auto flex flex-col xl:flex-row rounded-3xl border-2 border-[var(--gray-dark)] bg-[var(--secondary)]">
          <FAQSection />
        </div>
      </div>
    </section>
  );
}
