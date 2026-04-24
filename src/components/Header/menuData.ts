import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "All Collections",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "New Arrivals",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Our Story",
    newTab: false,
    path: "/blogs/blog-grid",
  },
  {
    id: 4,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
  {
    id: 5,
    title: "Client Services",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 51,
        title: "Collections",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 52,
        title: "Lookbook",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 53,
        title: "Boutique Checkout",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 54,
        title: "Shopping Bag",
        newTab: false,
        path: "/cart",
      },
      {
        id: 55,
        title: "Saved Pieces",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 56,
        title: "My Account",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 57,
        title: "Shipping",
        newTab: false,
        path: "/contact",
      },
    ],
  },
  {
    id: 6,
    title: "Journal",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Journal",
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 62,
        title: "Journal With Notes",
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 63,
        title: "Story Details",
        newTab: false,
        path: "/blogs/blog-details",
      },
      {
        id: 64,
        title: "Story With Notes",
        newTab: false,
        path: "/blogs/blog-details-with-sidebar",
      },
    ],
  },
];
