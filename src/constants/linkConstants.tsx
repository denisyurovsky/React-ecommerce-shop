import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import React from 'react';

import { pathNames } from './pathNames';

const { USERS, PROFILE, WISHLIST, ADDRESSBOOK, ORDERS } = pathNames;

interface Link {
  url: string;
  text: string;
  icon?: unknown;
}

export const LINKS: Record<string, Link> = {
  HOME: { url: '/', text: 'Home' },
  USERS: { url: USERS, text: 'Users' },
  PROFILE: { url: PROFILE, text: 'Profile', icon: <HomeIcon /> },
  WISHLIST: {
    url: PROFILE + WISHLIST,
    text: 'Wishlist',
    icon: <FavoriteIcon />,
  },
  ORDERS: { url: PROFILE + ORDERS, text: 'Orders', icon: <Inventory2Icon /> },
  ADDRESS_BOOK: {
    url: PROFILE + ADDRESSBOOK,
    text: 'Address book',
    icon: <ImportContactsIcon />,
  },
  LOGOUT: { url: '/', text: 'Log out', icon: <MeetingRoomIcon /> },
};

export const PROFILE_MENU = [
  LINKS.PROFILE,
  LINKS.WISHLIST,
  LINKS.ORDERS,
  LINKS.ADDRESS_BOOK,
];
