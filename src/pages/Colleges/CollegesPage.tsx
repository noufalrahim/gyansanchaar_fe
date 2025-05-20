/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { CollegeCard,
  //  CollegeCardSkeleton 
} from '@/components/Cards';
// import { useReadData } from '@/hooks/useReadData';
import { CollegeType } from '@/types';
import { CollegeFilters } from '@/components/CollegeFilters';

export default function CollegesPage() {
  const [filters, setFilters] = useState({
    search: '',
    sortBy: '',
    sortOrder: '',
    ranking: 'all',
    location: '',
    type: 'all',
    programType: [],
    major: 'all',
  });

  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleProgramTypeChange = (type: string) => {
    setFilters((prev: any) => {
      const updated = prev.programType.includes(type)
        ? prev.programType.filter((t: any) => t !== type)
        : [...prev.programType, type];
      return { ...prev, programType: updated };
    });
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      sortBy: '',
      sortOrder: '',
      ranking: 'all',
      location: '',
      type: 'all',
      programType: [],
      major: 'all',
    });
  };

  // const { data, isLoading, isError } = useReadData<CollegeType[]>('colleges', '/colleges');

  const data: CollegeType[] = [{
    name: 'Guru Nanak University',
    description: 'Guru Nanak University (GNU) is a Private University established under Telangana State Private Universities (Establishment and Regulation) act 11 of 2024. The GNU campus is in very close proximity to the Hyderabad Outer Ring Road; GNU Campus can be easily reached through all-weather roads from Hyderabad city which is 26 kms from Rajiv Gandhi International Airport, Hyderabad.',
    location: 'Hyderabad, Telengana',
    coverImage: 'https://gnuindia.org/images/about.jpg',
    rank: '48',
  }]

  return (
    <div className='bg-primary-10 w-full flex flex-col items-center justify-center py-10'>
      <div className='max-w-7xl w-full'>
        <AppHeader
          title='Explore Colleges'
          description='Browse through our extensive list of colleges and universities to find your perfect match.'
        />
      </div>

      <CollegeFilters
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleProgramTypeChange={handleProgramTypeChange}
        resetFilters={resetFilters}
      />

      {data && data.length === 0 && (
        <h1 className='text-primary-main text-xl font-semibold'>Sorry! No Colleges Found!</h1>
      )}

      <div className='max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {/* {(isError || isLoading) &&
          Array.from({ length: 5 }, (_, i) => <CollegeCardSkeleton key={i} />)} */}

        {data && data.map((item, index) => (
          <CollegeCard college={item} key={index} />
        ))}
      </div>
    </div>
  );
}
