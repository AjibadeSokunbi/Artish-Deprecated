import React from 'react';
import { GrUserSettings, GrProjects } from 'react-icons/gr';
import { FiShoppingBag, FiHelpCircle} from 'react-icons/fi';
import { MdEmail} from 'react-icons/md';

import { GiWallet } from 'react-icons/gi';
import { FaHireAHelper } from 'react-icons/fa';
import { TiMessages,  } from 'react-icons/ti';
import { BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { FiCreditCard} from 'react-icons/fi';


import { MdNotificationsActive} from 'react-icons/md';

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#000',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'SwitchToIndependent',
        name1: 'Switch To Independent',
        icon: <FiShoppingBag />,
      },
      {
        name: 'HireFreelancer',
        name1: 'Hire a Freelancer',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'Projects',
        name1: 'Projects',
        icon: <GrProjects />,
      },
      {
        name: 'Hiring',
        name1: 'Hiring', 
        icon: <FaHireAHelper />,
      },
      {
        name: 'Messages',
        name1: 'Messages',
        icon: <TiMessages />,
      },
      {
        name: 'wallet',
        name1: 'Wallet',
        icon: <GiWallet />,
      },
      {
        name: 'notification',
        name1: 'Notification',
        icon: <MdNotificationsActive />,
      },
    ],
  },
  {
    title: 'Tools',
    links: [
      {
        name: 'settings',
        name1: 'Settings',
        icon: <GrUserSettings />,
      },
      {
        name: 'emailPrefrences',
        name1: 'Email Prefrences',
        icon: <MdEmail />,
      },
      {
        name: 'Help',
        name1: 'Help',
        icon: <FiHelpCircle />,
      },
    ],
  },
];



export const themeColors = [
  {
    name: 'blue-theme',
    color: '#000',
  },
  {
    name: 'green-theme',
    color: '#000',
  },
  {
    name: 'purple-theme',
    color: '#000',
  },
  {
    name: 'red-theme',
    color: '#000',
  },
  {
    name: 'indigo-theme',
    color: '#000',
  },
  {
    color: '#000',
    name: 'orange-theme',
  },
];



