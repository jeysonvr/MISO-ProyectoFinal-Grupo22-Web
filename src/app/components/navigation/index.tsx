"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useAppContext } from "@/app/providers/AppProvider";
import { UserType } from "@/app/contants/userType";
import { UrlPath } from "../../contants/urlPath";


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
        href: '/listTechTest'
      },
      {
        label: labels.performance_review,
        href: '/performanceReview'
      },
      {
        label: labels.interviews,
        href: '/interviews'
      }
    ],
    [UserType.company]: [
      {
        label: labels.home,
        href: '/'
      },
      {
        label: labels.proyects,
        href: '/projects'
      },
      {
        label: labels.candidates,
        href: UrlPath.searchCandidates,
      },
      {
        label: labels.employees,
        href: '/employees'
      },
      {
        label: labels.interviews,
        href: '/interviews'
      }
    ],
    [UserType.recruiter]: [
      {
        label: labels.contract,
        href: '/contract'
      }
    ],
  }
  const appContext = useAppContext();

  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} menuItems={menuItemsMapper[appContext.user.type]} />
    </>
  );
};

export default Navigation;
