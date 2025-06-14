export type UserType = {
  id?: string;
  name?: string;
  email?: string;
  level?: string;
  mobile?: string;
  stream?: string;
  dateOfBirth?: string;
  socialCategory?: string;
  gender?: "male" | "female" | "other";
  physicalDisability?: boolean;
  city?: string;
  state?: string;
  pincode?: string;
  class10Board?: string;
  class10School?: string;
  class10PassingYear?: string;
  class10MarksType?: "percentage" | "cgpa";
  class10PercentageOrCGPA?: number;
  class10Marks?: number;
  class12Board?: string;
  class12School?: string;
  class12PassingYear?: string;
  class12Stream?: string;
  class12MarksType?: "percentage" | "cgpa";
  class12PercentageOrCGPA?: number;
  class12Marks?: number;
  createdAt?: string;
  updatedAt?: string;
  token?: string;
};


export type UserTypeWithId = UserType & {
  id: string;
}