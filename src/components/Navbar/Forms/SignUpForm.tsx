import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./schema/SignUpSchema";
import { otpSchema } from "./schema/otpSchema";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { DialogFooter } from "@/components/ui/dialog";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { useAuthSignup } from "@/hooks/useCreateData";
import { UserType } from "@/types";

export default function SignUpForm({ closeModal }: { closeModal: () => void }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState<"signup" | "otp">("signup");
  const [userData, setUserData] = React.useState<z.infer<typeof signupSchema> | null>(null);

  const { mutate, isPending } = useAuthSignup();


  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "Noufal Rahim",
      email: "noufalrahim6784@gmail.com",
      mobile: "9876543210",
      stream: "Engineering",
      level: "Undergraduate",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const streams = [
    "Engineering",
    "Medicine",
    "Business",
    "Arts & Humanities",
    "Science",
    "Law",
    "Education",
    "Fine Arts",
    "Computer Science",
  ];

  const educationLevels = [
    "High School",
    "Undergraduate",
    "Postgraduate",
    "Doctorate",
    "Working Professional",
  ];

  const handleSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        toast({
          title: "OTP Sent",
          description: `A verification code has been sent to ${values.mobile}`,
        });
        setUserData(values);
        setStep("otp");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (values: z.infer<typeof otpSchema>) => {
    if (values.otp === "123456") {
      // toast({
      //   title: "Success",
      //   description: "Account created successfully!",
      //   variant: "default",
      // });
      // closeModal();

      mutate(userData as UserType, 
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Account created successfully!",
            });
            closeModal();
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to create account. Please try again.",
            });
          }
        }
      );

    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {step === "signup" ? (
        <Form key="signup" {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
            className="space-y-4"
          >
            <FormField
              control={signupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-muted border border-input rounded-l-md">
                        +91
                      </div>
                      <Input
                        className="rounded-l-none"
                        placeholder="Enter 10-digit mobile number"
                        {...field}
                        type="tel"
                        maxLength={10}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={signupForm.control}
                name="stream"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stream of Interest</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stream" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {streams.map((stream) => (
                          <SelectItem key={stream} value={stream}>
                            {stream}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Education Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <PrimaryButton
                label="Create Account"
                className="text-sm w-full"
                loading={isLoading}
                type="submit"
              />
            </DialogFooter>
          </form>
        </Form>
      ) : (
        <Form key="otp" {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
            className="space-y-6"
          >
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-blue-600 text-sm">
                We've sent a verification code to{" "}
                <span className="font-medium">{userData?.mobile}</span>
              </p>
            </div>
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      autoFocus
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup className="w-full">
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot key={i} index={i} className="w-full" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-red-500"/>
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col">
              <SecondaryButton
                label="Back to Signup Form"
                onClick={() => setStep("signup")}
                className="text-sm w-full"
              />
              <PrimaryButton
                label="Create Account"
                className="w-full text-sm"
                type="submit"
                loading={isPending}
              />
            </DialogFooter>
          </form>
        </Form>
      )}
    </>
  );
}
