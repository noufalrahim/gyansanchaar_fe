import { InfoCard } from '@/components/Cards'
import { Loader } from '@/components/Loader';
import { useReadData } from '@/hooks/useReadData';
import { GalleryType } from '@/types';
import { Image } from 'lucide-react'

interface CampusType {
  collegeId: string;
}

export default function Campus({ collegeId }: CampusType) {

  const { data, isLoading } = useReadData<GalleryType[]>('gallery', `/galleries/field/collegeId/${collegeId}`);

  if(isLoading){
    return <Loader />
  }

  // const data: GalleryType[] = [
  //   {
  //     imageUrl: 'https://www.gndu-online.in/images/GNDU_campus.webp',
  //   },
  //   {
  //     imageUrl: 'https://assets.thehansindia.com/h-upload/2023/06/23/1360313-guru-nanak-institutions.webp',
  //   },
  //   {
  //     imageUrl: 'https://content.jdmagicbox.com/v2/comp/hyderabad/x6/040pxx40.xx40.200321104705.c8x6/catalogue/gurunannak-institute-ibrahimpatnam-rangareddy-colleges-bu4al66hc4.jpg',
  //   },
  //   {
  //     imageUrl: 'https://images.shiksha.com/mediadata/images/1736154849phpKUHOXF.jpeg',
  //   },
  //   {
  //     imageUrl: 'https://image-static.collegedunia.com/public/college_data/images/appImage/25784_Guru_Nanak_Dev_University_GNDU_Amritsar-_Maharaja_Ranjit_Singh_MRS_Block.jpg?h=260&w=360&mode=crop'
  //   },
  //   {
  //     imageUrl: 'https://images.jdmagicbox.com/v2/comp/hyderabad/r8/040pxx40.xx40.221015142526.k6r8/catalogue/guru-nanak-university-lb-nagar-hyderabad-paramedical-science-colleges-dynj76yj02.jpg',
  //   },
  //   {
  //     imageUrl: 'https://hikeeducation.com/wp-content/uploads/2025/01/Blog-Poster-1172.webp',
  //   },
  //   {
  //     imageUrl: 'https://cdn.siasat.com/wp-content/uploads/2022/08/Guru-Nanak-University.png'
  //   }
  // ]

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
