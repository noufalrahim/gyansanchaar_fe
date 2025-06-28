import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { applicationFormSchema } from "./schema/applicationFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { SelectContent } from "@/components/ui/select";
import { Select, SelectValue, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SOCIAL_CATEGORY } from "@/constants/SOCIAL_CATEGORY";
import { STATES } from "@/constants/STATES";
import { EDUCATION_BOARD } from "@/constants/EDUCATION_BOARD";
import { ApplicationType, CollegeType, CourseJoinType, StatusType, UserTypeWithId } from "@/types";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useReadData } from "@/hooks/useReadData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCreateData } from "@/hooks/useCreateData";
import { toast } from "@/hooks/use-toast";
import { STREAMS } from "@/constants/STREAMS";
import { useModifyData } from "@/hooks/useModifyData";
import { setUser } from "@/redux/userSlice";
import formatCourseData from "@/lib/DataFormatter/courseDataFormatter";

interface ApplicationFormProps {
    college: CollegeType | null;
    setOpen: (open: boolean) => void;
}

export default function ApplicationForm({ college, setOpen }: ApplicationFormProps) {

    // const {toast} = useToast();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const { data: courses, isLoading: isCoursesLoading, isError: isCoursesError } = useReadData<CourseJoinType[]>('coursesByCollege', `/courses/fields/many?collegeId=${college!.id}`);
    
    const formattedCoursesData = formatCourseData(courses);
    
    // const {mutate, isPending, isError} = useCreateData<UserType>(`/users`);
    const { mutate, isPending, isError } = useCreateData<ApplicationType>(`/applications`);
    const { mutate: updateUserMutate, isPending: isUserPending, isError: userError } = useModifyData<UserTypeWithId>(`/users`);

    const applicationForm = useForm<z.infer<typeof applicationFormSchema>>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            name: user.user!.name,
            dateOfBirth: user.user!.dateOfBirth ? new Date(user.user!.dateOfBirth) : new Date(),
            socialCategory: user.user!.socialCategory || "general",
            gender: user.user!.gender || "male",
            physicalDisability: user.user!.physicalDisability ? "yes" : "no",
            mobileNumber: user.user!.mobile,
            email: user.user!.email,
            city: user.user!.city || "Kottayam",
            state: user.user!.state || "Kerala",
            pincode: user.user!.pincode || "686005",
            course: "Bachelor of Technology",
            class10Board: user.user?.class10Board || "cbse",
            class10School: user.user?.class10School || "St Antony's Public School",
            class10PassingYear: user.user?.class10PassingYear ? parseInt(user.user.class10PassingYear) : 2020,
            class10MarksType: user.user?.class10MarksType || "percentage",
            class10PercentageOrCGPA: user.user?.class10PercentageOrCGPA || 98,
            class10Marks: user.user?.class10Marks || 490,
            class12Board: user.user?.class12Board || "cbse",
            class12School: user.user?.class12School || "St Antony's Public School",
            class12PassingYear: parseInt(user.user?.class12PassingYear || "2022"),
            class12Stream: user.user?.class12Stream || "science",
            class12MarksType: user.user?.class12MarksType || "percentage",
            class12PercentageOrCGPA: user.user?.class12PercentageOrCGPA || 93.4,
            class12Marks: user.user?.class12Marks || 467,
        },
    });

    const onSubmit = (values: z.infer<typeof applicationFormSchema>) => {

        if (college!.id && user.user!.id) {

            const updatedValues: UserTypeWithId = {
                id: user.user!.id,
                name: values.name,
                socialCategory: values.socialCategory,
                // dateOfBirth: user.user!.dateOfBirth ? new Date(user.user!.dateOfBirth) : new Date(),
                gender: values.gender,
                physicalDisability: values.physicalDisability === "yes" ? true : false,
                mobile: values.mobileNumber,
                email: values.email,
                city: values.city,
                state: values.state,
                pincode: values.pincode,
                class10Board: values.class10Board,
                class10School: values.class10School,
                class10PassingYear: values.class10PassingYear.toString(),
                class10MarksType: values.class10MarksType,
                class10PercentageOrCGPA: values.class10PercentageOrCGPA,
                class10Marks: values.class10Marks,
                class12Board: values.class12Board,
                class12School: values.class12School,
                class12PassingYear: values.class12PassingYear.toString(),
                class12Stream: values.class12Stream,
                class12MarksType: values.class12MarksType,
                // class12PercentageOrCGPA: values.class12PercentageOrCGPA,
                class12Marks: values.class12Marks,
            };

            updateUserMutate(updatedValues, {
                onSuccess: () => {
                    dispatch(setUser({
                        ...updatedValues,
                        ...user,
                    }));

                    mutate({
                        collegeId: college!.id!,
                        courseId: values.course,
                        userId: user.user!.id!,
                        status: StatusType.Application.ApplicationFormSubmitted,
                    },
                        {
                            onSuccess: () => {
                                toast({
                                    title: "Application submitted successfully",
                                    description: "You can check the status of your application in the applications section",
                                });
                                setOpen(false);
                            },
                            onError: (err) => {
                                console.log(err);
                                toast({
                                    title: "An error occured!2",
                                    description: "Please try again later",
                                });
                            }
                        }
                    );

                    setOpen(false);
                },
                onError: () => {
                    toast({
                        title: "An error occured!2",
                        description: "Please try again later",
                    });
                }
            });

            
        }
        else {
            toast({
                title: "An error occured!1",
                description: "Please try again later",
            });
        }
    };

    if (isCoursesError || isError || userError) {
        return <p>An error occured!</p>
    };

    return (
        <Form {...applicationForm}>
            <form onSubmit={applicationForm.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField
                    control={applicationForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={applicationForm.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date: Date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row gap-5 w-full">
                    <FormField
                        control={applicationForm.control}
                        name="socialCategory"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Social Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Social Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white">
                                        {
                                            SOCIAL_CATEGORY.map((category: {
                                                name: string,
                                                value: string
                                            }) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={applicationForm.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={applicationForm.control}
                    name="physicalDisability"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Physical Disability</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Physical Disability" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <div className="flex flex-row gap-5 w-full">
                    <FormField
                        control={applicationForm.control}
                        name="mobileNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={applicationForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-row gap-5 w-full">
                    <FormField
                        control={applicationForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={applicationForm.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>State</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select State" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white">
                                        {
                                            STATES.map((state: {
                                                name: string,
                                                value: string
                                            }) => (
                                                <SelectItem key={state.value} value={state.value}>
                                                    {state.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={applicationForm.control}
                    name="pincode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={applicationForm.control}
                    name="course"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Course" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    {
                                        formattedCoursesData &&
                                        formattedCoursesData.map((item) =>
                                            item.courses.map((course) => (
                                                <SelectItem key={course.id} value={course.id!}>
                                                    {course.courseFrame.name}
                                                </SelectItem>
                                            ))
                                        )
                                    }
                                    {
                                        isCoursesLoading && (
                                            <p className="text-gray-500 text-sm p-2">Loading...</p>
                                        )
                                    }
                                    {
                                        courses && courses.length === 0 && (
                                            <p className="text-gray-500 text-sm p-2">No courses available</p>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={applicationForm.control}
                    name="class10Board"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 10 Board</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Board" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    {
                                        EDUCATION_BOARD.map((board: {
                                            name: string,
                                            value: string
                                        }) => (
                                            <SelectItem key={board.value} value={board.value}>
                                                {board.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class10School"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 10 School</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class10PassingYear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 10 Passing Year</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class10MarksType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 10 Marks Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Marks Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="cgpa">CGPA</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class10PercentageOrCGPA"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 10 Percentage or CGPA</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class10Marks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 10 Marks</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />


                <FormField
                    control={applicationForm.control}
                    name="class12Board"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 12 Board</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Board" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    {
                                        EDUCATION_BOARD.map((board: {
                                            name: string,
                                            value: string
                                        }) => (
                                            <SelectItem key={board.value} value={board.value}>
                                                {board.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class12School"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 12 School</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class12PassingYear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 12 Passing Year</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={applicationForm.control}
                    name="class12Stream"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Class 12 Stream</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Stream" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    {
                                        STREAMS.map((category: {
                                            name: string,
                                            value: string
                                        }) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class12MarksType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 12 Marks Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Marks Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="cgpa">CGPA</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class12PercentageOrCGPA"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 12 Percentage or CGPA</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={applicationForm.control}
                    name="class12Marks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class 12 Marks</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <PrimaryButton label="Submit" type="submit" className="w-full mt-5" loading={isPending || isUserPending} />

            </form>
        </Form>
    )
};