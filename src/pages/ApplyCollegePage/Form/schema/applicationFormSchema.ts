import { z } from "zod";

export const applicationFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    dateOfBirth: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date of birth",
    }),
    socialCategory: z.string().min(1, "Social category is required"),
    gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Gender is required" }),
    }),
    physicalDisability: z.enum(["yes", "no"], {
        errorMap: () => ({ message: "Physical disability is required" }),
    }),
    mobileNumber: z.string(),
    email: z.string().email("Invalid email address"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
    course: z.string().min(1, "Course is required"),
    class10Board: z.string().min(1, "Class 10 board is required"),
    class10School: z.string().min(1, "Class 10 school is required"),
    class10PassingYear: z.coerce.number().int().gte(1900, "Invalid year"),
    class10MarksType: z.enum(["percentage", "cgpa"], {
        errorMap: () => ({ message: "Class 10 marks type is required" }),
    }),
    class10PercentageOrCGPA: z.coerce.number().min(0, "Enter a valid number"),
    class10Marks: z.coerce.number().min(0, "Enter valid marks"),
    class12Board: z.string().min(1, "Class 12 board is required"),
    class12School: z.string().min(1, "Class 12 school is required"),
    class12PassingYear: z.coerce.number().int().gte(1900, "Invalid year"),
    class12Stream: z.string().min(1, "Class 12 stream is required"),
    class12MarksType: z.enum(["percentage", "cgpa"], {
        errorMap: () => ({ message: "Class 12 marks type is required" }),
    }),
    class12PercentageOrCGPA: z.coerce.number().min(0, "Enter a valid number"),
    class12Marks: z.coerce.number().min(0, "Enter valid marks"),
});
