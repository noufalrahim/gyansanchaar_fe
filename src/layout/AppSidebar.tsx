import { useState } from "react"
import { ArrowLeft, ChevronRight, GraduationCap } from "lucide-react"
import logo from '@/assets/gyan_sanchaar_secondary_logo_small.jpg'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const courseCategories = [
    {
        title: "Engineering",
        courses: [
            "B.Tech in Computer Science",
            "B.Tech in Electrical",
            "B.Tech in Mechanical",
            "B.Tech in Civil",
            "B.Tech in Electronics",
            "B.Tech in Aerospace",
            "B.Tech in Chemical",
            "B.Tech in Mechatronics",
            "B.Tech in Robotics",
            "B.Tech in Environmental",
        ],
    },
    {
        title: "Management",
        courses: [
            "BBA",
            "MBA in Finance",
            "MBA in Marketing",
            "MBA in HR",
            "MBA in Operations",
            "MBA in IT",
            "PGDM",
            "Executive MBA",
            "MBA in International Business",
            "MBA in Healthcare",
        ],
    },
    {
        title: "Arts",
        courses: [
            "BA in English",
            "BA in History",
            "BA in Psychology",
            "BA in Sociology",
            "BA in Political Science",
            "BA in Philosophy",
            "BA in Fine Arts",
            "BA in Music",
            "BA in Literature",
            "BA in Anthropology",
        ],
    },
    {
        title: "Science",
        courses: [
            "BSc in Physics",
            "BSc in Chemistry",
            "BSc in Mathematics",
            "BSc in Biology",
            "BSc in Zoology",
            "BSc in Botany",
            "BSc in Geology",
            "BSc in Environmental Science",
            "BSc in Statistics",
            "BSc in Microbiology",
        ],
    },
    {
        title: "Commerce",
        courses: [
            "B.Com General",
            "B.Com in Accounting",
            "B.Com in Taxation",
            "B.Com in Finance",
            "B.Com in Banking",
            "B.Com in Business Analytics",
            "B.Com in Corporate Law",
            "B.Com in International Business",
            "B.Com in Marketing",
            "B.Com in E-Commerce",
        ],
    },
    {
        title: "Law",
        courses: [
            "LLB",
            "BA LLB",
            "BBA LLB",
            "BCom LLB",
            "LLM in Criminal Law",
            "LLM in Corporate Law",
            "LLM in Human Rights",
            "Diploma in Cyber Law",
            "Diploma in Taxation Law",
            "PhD in Law",
        ],
    },
    {
        title: "Medicine",
        courses: [
            "MBBS",
            "BDS",
            "BAMS",
            "BHMS",
            "BUMS",
            "MD in General Medicine",
            "MS in Surgery",
            "BSc Nursing",
            "BPT (Physiotherapy)",
            "Bachelor of Pharmacy",
        ],
    },
    {
        title: "Computer Applications",
        courses: [
            "BCA",
            "MCA",
            "Diploma in Computer Applications",
            "PGDCA",
            "Certificate in Web Development",
            "Certificate in Data Science",
            "Certificate in Cyber Security",
            "Mobile App Development",
            "Full Stack Development",
            "AI & ML Specialization",
        ],
    },
    {
        title: "Education",
        courses: [
            "B.Ed",
            "M.Ed",
            "Diploma in Elementary Education",
            "Certificate in Teaching",
            "Special Education",
            "Educational Psychology",
            "Curriculum Development",
            "Instructional Design",
            "Adult Education",
            "Online Teaching Certification",
        ],
    },
    {
        title: "Design",
        courses: [
            "B.Des in Fashion Design",
            "B.Des in Interior Design",
            "B.Des in Product Design",
            "B.Des in Graphic Design",
            "B.Des in Animation",
            "B.Des in Game Design",
            "B.Des in UI/UX",
            "M.Des",
            "Diploma in Fashion Design",
            "Certificate in Graphic Design",
        ],
    },
    {
        title: "Hospitality",
        courses: [
            "BHM (Hotel Management)",
            "Diploma in Hospitality",
            "MBA in Hospitality",
            "BSc in Hotel Management",
            "Cruise Line Management",
            "Event Management",
            "Food & Beverage Management",
            "Catering Technology",
            "Tourism Management",
            "Resort Operations",
        ],
    },
    {
        title: "Mass Communication",
        courses: [
            "BA in Journalism",
            "BA in Mass Communication",
            "MA in Journalism",
            "MA in Communication",
            "Diploma in TV Production",
            "Diploma in Digital Media",
            "Film Making",
            "Advertising & PR",
            "News Editing",
            "Photojournalism",
        ],
    },
]

export function AppSidebar() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const selected = courseCategories.find(cat => cat.title === selectedCategory)

    return (
        <Sidebar>
            <SidebarContent className="bg-white">
                <SidebarGroup>
                <img src={logo} className="h-20 object-contain" loading="lazy" />
                    <SidebarGroupLabel>
                        {selectedCategory ? (
                            <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2">
                                <ArrowLeft size={16} /> Back
                            </button>
                        ) : (
                            "Categories"
                        )}
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {!selectedCategory ? (
                                courseCategories.map((category) => (
                                    <SidebarMenuItem key={category.title}>
                                        <SidebarMenuButton onClick={() => setSelectedCategory(category.title)} className="py-7 items-center justify-between flex flex-row">
                                           <div className="flex flex-row gap-5 items-center">
                                           <GraduationCap />
                                           <span>{category.title}</span>
                                           </div>
                                            <ChevronRight />
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            ) : (
                                selected?.courses.map((course) => (
                                    <SidebarMenuItem key={course}>
                                        <SidebarMenuButton asChild className="py-7">
                                                <a href="#">
                                                    <GraduationCap />
                                                    <span>{course}</span>
                                                </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
