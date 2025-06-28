import { SITE_CONFIG } from "@/constants/SITE_CONFIG";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { ROUTE_URLS } from "@/constants";

export default function Cta() {

  const navigate = useNavigate();

  return (
    <div className="w-full items-center flex flex-col gap-5 justify-center bg-primary-main py-20 text-center px-5">
      <div className="items-center flex justify-center flex-col gap-5">
        <p className="font-bold text-white text-3xl">Ready to Start Your College Journey?</p>
        <p className="text-light-100 text-md">Join thousands of students who've simplified their application process with {SITE_CONFIG.NAME}.</p>
      </div>
      <PrimaryButton label="Explore Colleges" className="border border-white/30 bg-primary-800 hover:bg-primary-900 p-5 mt-5" onClick={() => navigate(ROUTE_URLS.COLLEGES)} />
    </div>
  )
}
