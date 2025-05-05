import { SITE_CONFIG } from "@/constants/SITE_CONFIG";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

export default function Cta() {
  return (
    <div className="w-full items-center flex flex-col gap-5 justify-center bg-primary-main py-20 text-center px-5">
      <div className="items-center flex justify-center flex-col gap-5">
        <p className="font-bold text-white text-3xl">Ready to Start Your College Journey?</p>
        <p className="text-light-100 text-md">Join thousands of students who've simplified their application process with {SITE_CONFIG.NAME}.</p>
      </div>
      <div className="flex flex-row gap-5">
        <SecondaryButton label="Create Account" className="p-5 border border-white bg-white hover:bg-primary-50"/>
        <PrimaryButton label="Explore Colleges" className="border border-white/30 bg-primary-800 hover:bg-primary-900 p-5"/>
      </div>
    </div>
  )
}
