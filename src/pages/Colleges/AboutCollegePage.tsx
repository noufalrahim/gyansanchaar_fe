import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { Loader } from "@/components/Loader";
import { TabsIndex } from "@/components/Tabs";
import { useReadData } from "@/hooks/useReadData";
import { CollegeType } from "@/types";
import { GraduationCap, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function AboutCollegePage() {

  const { id } = useParams();

  const { data, isLoading, isError } = useReadData<CollegeType>('college', `/colleges/${id}`);

  if(isLoading || !data){
    return <div className="min-h-screen w-full items-center justify-center flex"><Loader /></div>
  };
  
  if(isError){
    return <h1>An error occured!</h1>
  };

  return (
    <div className='bg-primary-10 w-full flex flex-col items-center justify-center py-10 px-5'>
      <div className="max-w-7xl w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-64 sm:h-80 md:h-[30rem] relative">
            <img
              src={data.coverImage}
              alt={'Massachusetts Institute of Technology'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.name}</h1>
                <p className="flex items-center text-white/80">
                  <MapPin className="h-4 w-4 mr-1" />
                  {data.location}
                </p>
              </div>
            </div>
          </div>
        </div>
        <TabsIndex college={data}/>
        
        
        <div className="bg-blue-900 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            {data.description}
          </p>
          <Link to="/apply">
            <SecondaryButton leadIcon={<GraduationCap className="mr-2 h-5 w-5" />} label="Start Application" />
          </Link>
        </div>
      </div>
    </div>
  )
}
