/* eslint-disable @typescript-eslint/no-explicit-any */

import { Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '../ui/input';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Label } from '../ui/label';
  
  interface CollegeFiltersProps {
    filters: any;
    handleFilterChange: (field: string, value: any) => void;
    handleProgramTypeChange: (type: string) => void;
    resetFilters: () => void;
  }
  
  export default function CollegeFilters ({
    filters,
    handleFilterChange,
    handleProgramTypeChange,
    resetFilters,
  }: CollegeFiltersProps) {
    return (
      <div className="rounded-lg shadow-sm p-4 mb-8 w-full max-w-7xl bg-white border border-light-100">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Search by college name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="mb-0"
            />
          </div>
  
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className='bg-white'>
                <DropdownMenuItem onClick={() => {
                  handleFilterChange('sortBy', 'rank');
                  handleFilterChange('sortOrder', 'asc');
                }}>
                  Ranking (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  handleFilterChange('sortBy', 'rank');
                  handleFilterChange('sortOrder', 'desc');
                }}>
                  Ranking (High to Low)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  handleFilterChange('sortBy', 'name');
                  handleFilterChange('sortOrder', 'asc');
                }}>
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  handleFilterChange('sortBy', 'name');
                  handleFilterChange('sortOrder', 'desc');
                }}>
                  Name (Z-A)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
  
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white">
                <h3 className="font-medium mb-3">Filter Colleges</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ranking</Label>
                    <Select
                      value={filters.ranking}
                      onValueChange={(value) => handleFilterChange('ranking', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Ranking Range" />
                      </SelectTrigger>
                      <SelectContent className='bg-white'>
                        <SelectItem value="all">All Rankings</SelectItem>
                        <SelectItem value="1">Top 10</SelectItem>
                        <SelectItem value="2">Top 11–50</SelectItem>
                        <SelectItem value="3">50+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
  
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="Filter by location"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    />
                  </div>
  
                  {/* <div className="space-y-2">
                    <Label>Type</Label>
                    <RadioGroup
                      value={filters.type}
                      onValueChange={(value) => handleFilterChange('type', value)}
                    >
                      {['all', 'Public', 'Private'].map(() => (
                        <RadioGroup
                        value={filters.type}
                        onValueChange={(value) => handleFilterChange('type', value)}
                        className="flex flex-col gap-2"
                      >
                        {['all', 'Public', 'Private'].map((val) => (
                          <div className="flex items-center space-x-2" key={val}>
                            <RadioGroupItem value={val} id={val} />
                            <Label>{val}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      ))}
                    </RadioGroup>
                  </div> */}
  
                  <div className="space-y-2">
                    <Label>Program Type</Label>
                    <div className="flex flex-col space-y-2">
                      {['Undergraduate', 'Graduate'].map((type) => (
                        <div className="flex items-center space-x-2" key={type}>
                          <Checkbox
                            id={type.toLowerCase()}
                            checked={filters.programType.includes(type)}
                            onCheckedChange={() => handleProgramTypeChange(type)}
                          />
                          <label htmlFor={type.toLowerCase()} className="text-sm font-medium">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <div className="space-y-2">
                    <Label>Major</Label>
                    <Select
                      value={filters.major}
                      onValueChange={(value) => handleFilterChange('major', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Major" />
                      </SelectTrigger>
                      <SelectContent className='bg-white'>
                        {[
                          'all', 'Computer Science', 'Engineering', 'Business', 'Medicine',
                          'Law', 'Psychology', 'Biology', 'Mathematics', 'Physics',
                          'History', 'Literature', 'Philosophy', 'Economics',
                        ].map((major) => (
                          <SelectItem key={major} value={major}>
                            {major === 'all' ? 'All Majors' : major}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
  
                  <Button onClick={resetFilters} variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    );
  };
  