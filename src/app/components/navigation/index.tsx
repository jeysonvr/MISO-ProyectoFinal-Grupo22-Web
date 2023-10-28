"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useAppContext } from "@/app/providers/AppProvider";
import { UserType } from "@/app/contants/userType";


const Navigation = ({ labels }: any) => {
  const menuItemsMapper = {
    [UserType.anonymous]: [],
    [UserType.candidate]: [
      {
        label: labels.home,
        href: '/'
      },
      {
        label: labels.tech_tests,
        href: '/techTest'
      },
      {
        label: labels.performance_review,
        href: '/performanceReview'
      }
    ],
    [UserType.company]: [
      {
        label: labels.home,
        href: '/'
      },
      {
        label: labels.proyects,
        href: '/proyects'
      },
      {
        label: labels.candidates,
        href: '/candidates'
      },
      {
        label: labels.employees,
        href: '/employees'
      },
    ],
    [UserType.recruiter]: [
      {
        label: labels.interviews,
        href: '/interviews'
      },
      {
        label: labels.contract,
        href: '/contract'
      },
    ],
  }
  const appContext = useAppContext();

  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // if(appContext.user.type === UserType.anonymous) return null;

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} menuItems={menuItemsMapper[appContext.user.type]} />
    </>
  );
};

export default Navigation;
