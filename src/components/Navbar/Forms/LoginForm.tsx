import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { DialogFooter } from "@/components/ui/dialog";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { loginSchema } from "./schema/LoginSchema";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from "@/redux/userSlice";

export default function LoginForm({ closeModal }: { closeModal: () => void }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState<"login" | "otp">("login");
  const [userData, setUserData] = React.useState<z.infer<typeof loginSchema> | null>(null);

  const dispatch = useDispatch();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
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
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (values: z.infer<typeof otpSchema>) => {
    if (values.otp === "123456") {
      setIsLoading(true);
      if (!userData) {
        toast({
          title: "Error",
          description: "User data not found. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/auth/login`, {
          mobile: `${userData.mobile}`,
        });

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          toast({
            title: "Success",
            description: "Login successful!",
            variant: "default",
          });

          dispatch(setUser(response.data));
          closeModal();
        }
        else if (response.status === 400) {
          toast({
            title: "Error",
            description: "Failed to login. Please try again.",
            variant: "destructive",
          });
        }
      }
      catch(e) {
        console.error("Error verifying OTP:", e);
        toast({
          title: "Error",
          description: "Failed to login. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
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
      {step === "login" ? (
        <Form key="login" {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
            className="space-y-4"
          >
            <FormField
              control={loginForm.control}
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
            <DialogFooter className="pt-4">
              <PrimaryButton
                label="Login"
                className="text-sm w-full"
                loading={isLoading}
                type="submit"
                onClick={() => {
                  console.log("Form submitted");
                }}
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
                label="Back to Login Form"
                onClick={() => setStep("login")}
                className="text-sm w-full"
              />
              <PrimaryButton
                label="Login"
                className="w-full text-sm"
                type="submit"
                loading={isLoading}
              />
            </DialogFooter>
          </form>
        </Form>
      )}
    </>
  );
}
