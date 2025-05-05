import { InfoCard } from '@/components/Cards'
import { Image } from 'lucide-react'


const campusImages = [
  "https://menlocoaching.com/app/uploads/2022/01/1599px-Massachusetts_Institute_of_Technology_MIT_-_panoramio.jpeg",
  "https://news.mit.edu/sites/default/files/images/202309/MIT-USNews-Colleges-01-press.jpg",
  "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201709/%2520Aerial-AboveSummit-Christopher%2520Harting_2.png",
  "https://alum.mit.edu/sites/default/files/images/Slice_23.09.22_Rankings.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/008/319/352/small_2x/boston-mit-campus-photo.jpg",
  "https://ivycollegeessay.com/wp-content/uploads/2023/05/MIT-students.jpg",
  "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/FA047253-5C7E-476E-B7C53B7C5D0EEF75/webimage-9A5AE2A2-C8F2-445C-950BD51F74AD2444.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MIT_Building_1%2C_Pierce_Engineering_Laboratory%2C_Cambridge_MA.jpg/1200px-MIT_Building_1%2C_Pierce_Engineering_Laboratory%2C_Cambridge_MA.jpg",
];

export default function Campus() {
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
        {campusImages.map((image, index) => (
          <div key={index} className="rounded-lg overflow-hidden h-64 relative group">
            <img
              src={image}
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
