import { BadgeDollarSignIcon, GraduationCap, MapPin } from 'lucide-react'
import PrimaryButton from '../Buttons/PrimaryButton'

export default function CollegeCard() {
    return (
        <div className='shadow-sm border border-light-100 rounded-md bg-white w-full p-5 flex gap-5 flex-col'>
            <img className='rounded-md' src='https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202110/Killian-Dome-Emily-Dahl_0.jpg' />
            <div className='gap-3 flex flex-col'>
                <p className='text-primary-main text-xl font-bold'>Massachusetts Institute of Technology</p>
                <div className='text-light-200 flex flex-row items-center text-center gap-2 text-md'>
                    <MapPin size={16} />
                    <p>Cambridge, Massachusetts</p>
                </div>
                <p className='text-light-200 text-sm'>A private Ivy League research university with a history of academic excellence.</p>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='text-primary-main flex flex-row gap-2 justify-between items-center'>
                        <GraduationCap size={20}/>
                        <p className='text-black'>Rank: #12</p>
                    </div>
                    <div className='text-primary-main flex flex-row gap-2 justify-between items-center'>
                        <BadgeDollarSignIcon size={20}/>
                        <p className='text-black'>Tuition: $56,169</p>
                    </div>
                </div>
            </div>
            <PrimaryButton label='View Details'/>
        </div>
    )
}
