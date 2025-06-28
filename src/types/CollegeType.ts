import { LocationType } from "./LocationType";

export type CollegeType = {
    id?: string;
    name: string;
    description: string;
    state: string;
    location: LocationType;
    coverImage: string;
    logo: string;
    rank: string;
};