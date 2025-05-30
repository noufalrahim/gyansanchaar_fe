import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from '@/assets/gyan_sanchaar_secondary_logo_small.jpg'
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import { DialogModal } from "../Modal";
import { LoginForm, SignUpForm } from "./Forms";
import { SITE_CONFIG } from "@/constants/SITE_CONFIG";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { avatarGenerator } from "@/lib/AvatarGenerator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import CollegesNavList from "./CollegesNavList";
import { SidebarTrigger } from "../ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);

  const isMobile = useIsMobile();

  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Colleges", path: "/colleges" },
      { name: "Apply", path: "/apply" },
      { name: "Dashboard", path: "/dashboard" },
    ],
    []
  );

  const isActive = (path: string) => location.pathname === path;


  const renderNavLinks = () =>
    navLinks.map((link, index) => (
      <NavigationMenu key={index}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-600",
                  isActive(link.path) ? "text-primary-700 font-semibold" : "text-gray-700"
                )}
              >
                {link.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ));

  const closeModal = () => {
    setOpenSignUpModal(false);
    setOpenLoginModal(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-white shadow-md py-3" : "bg-white py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-primary-main font-bold text-2xl flex items-center">
            {
              isMobile && <SidebarTrigger />

            }           
           <img src={logo} className="h-20 object-contain" loading="lazy" />
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="flex  flex-row items-center justify-center gap-7">
                  {renderNavLinks()}
                  <NavigationMenuTrigger className="p-0">Courses</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <CollegesNavList />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {
            !user ?
              <div className="hidden md:flex items-center space-x-4">
                <SecondaryButton label="Login" className="px-5 rounded-full text-sm" onClick={() => setOpenLoginModal(true)} />
                <PrimaryButton label="Sign Up" className="rounded-full px-5 text-sm" onClick={() => setOpenSignUpModal(true)} />
              </div>
              :
              <div className="hidden md:flex items-center space-x-4">
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-primary-main text-white">{avatarGenerator(user.name)}</AvatarFallback>
                </Avatar>
              </div>
          }

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && !user && (
          <div className="md:hidden px-4 py-3">
            <div className="flex flex-col space-y-3">
              {renderNavLinks()}
              <div className="">
                <SecondaryButton label="Login" className="px-5 rounded-full text-sm" onClick={() => setOpenLoginModal(true)} />
                <PrimaryButton label="Sign Up" className="rounded-full px-5 text-sm" onClick={() => setOpenSignUpModal(true)} />
              </div>
            </div>
          </div>
        )}

        {isOpen && user && (
          <div className="md:hidden px-4 py-3">
            <div className="flex flex-col space-y-3">
              {renderNavLinks()}
              <div className="pt-3 flex flex-col space-y-3">
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-primary-main text-white">{avatarGenerator(user.name)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        )}

      </nav>
      <DialogModal title="Create Account" description={`Fill out the form below to create your ${SITE_CONFIG.NAME} account`} open={openSignUpModal} setOpen={setOpenSignUpModal}>
        <SignUpForm closeModal={closeModal} />
      </DialogModal>
      <DialogModal title={`Login to ${SITE_CONFIG.NAME}`} description={`Enter your mobile number to receive an OTP`} open={openLoginModal} setOpen={setOpenLoginModal}>
        <LoginForm closeModal={closeModal} />
      </DialogModal>
    </>
  );
};

export default Navbar;


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"