import { InfoCard } from '@/components/Cards'
import { Loader } from '@/components/Loader';
import { useReadData } from '@/hooks/useReadData';
import { GalleryType } from '@/types';
import { Image } from 'lucide-react'

interface CampusType {
  collegeId: string;
}

export default function Campus({collegeId}: CampusType) {

  const { data, isLoading } = useReadData<GalleryType[]>('gallery', `/galleries/field/collegeId/${collegeId}`);

  if(isLoading){
    return <Loader />
  }

  console.log(data);

  return (
    <div>
        <h3 className="text-xl font-bold text-primary-main mb-4">Campus Facilities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <InfoCard data={[
          "University Library",
          "Research labs",
          "Sports centers",
          "College accommodations",
          "Dining halls",
          "Medical center"
        ]} />
        <InfoCard data={[
          "Library & Research",
          "Sports & Fitness",
          "Student Life",
          "Campus Essentials"
        ]} />
      </div>
      <h2 className="text-2xl font-bold text-primary-main mb-6">Campus Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {data && data.map((image, index) => (
          <div key={index} className="rounded-lg overflow-hidden h-64 relative group">
            <img
              src={image.imageUrl}
              alt={`${'MIT'} campus ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center">
                <Image className="h-6 w-6 text-blue-900" />
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  )
}
