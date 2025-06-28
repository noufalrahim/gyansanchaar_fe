import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { Loader } from "@/components/Loader";
import { TabsIndex } from "@/components/Tabs";
import { useReadData } from "@/hooks/useReadData";
import { CollegeType } from "@/types";
import { LocationType } from "@/types/LocationType";
import { GraduationCap, MapPin } from "lucide-react";
import { Link, 
  useParams 
} from "react-router-dom";

export default function AboutCollegePage() {

  const { id } = useParams();

  const { data, isLoading, isError } = useReadData<{
    college: CollegeType,
    location: LocationType
  }[]>('college', `/colleges/fields/many?id=${id}`);
  console.log(data);

  // const data: CollegeType = {
  //   name: 'Guru Nanak University',
  //   description: 'Guru Nanak University (GNU) is a Private University established under Telangana State Private Universities (Establishment and Regulation) act 11 of 2024. The GNU campus is in very close proximity to the Hyderabad Outer Ring Road; GNU Campus can be easily reached through all-weather roads from Hyderabad city which is 26 kms from Rajiv Gandhi International Airport, Hyderabad.',
  //   location: 'Hyderabad, Telengana',
  //   coverImage: 'https://gnuindia.org/images/about.jpg',
  //   rank: '48',
  // }

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
              src={data[0].college.coverImage}
              alt={'Massachusetts Institute of Technology'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{data[0].college.name}</h1>
                <p className="flex items-center text-white/80">
                  <MapPin className="h-4 w-4 mr-1" />
                  {data[0].location.place}, {data[0].location.state}
                </p>
              </div>
            </div>
          </div>
        </div>
        <TabsIndex college={data[0].college}/>
        
        
        <div className="bg-blue-900 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            {data[0].college.description}
          </p>
          <Link to="/apply">
            <SecondaryButton leadIcon={<GraduationCap className="mr-2 h-5 w-5" />} label="Start Application" />
          </Link>
        </div>
      </div>
    </div>
  )
}
