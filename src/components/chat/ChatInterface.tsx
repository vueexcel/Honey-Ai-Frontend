"use client";

import {
  Search,
  Plus,
  Phone,
  User,
  MoreVertical,
  X,
  ChevronDown,
  Eye,
  Camera,
  PlayCircle,
  Wand,
  SendHorizonal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PremiumButton from "../ui/PremiumBtn";
import Button from "../ui/Button";
import ResizeIcon from "../icons/ResizeIcon";
import useChatStreaming from "@/hooks/useChatStreaming";
import WandIcon from "../icons/WandIcon";

const chatUsers = [
  {
    name: "Isabella Bellucci",
    lastMessage: "The garden is my refuge from the noise of...",
    imageUrl: "/placeholder-image.jpg",
  },
  {
    name: "Veronika Krizova",
    lastMessage: "Hey, I’m Veronika! I’m all about coding and...",
    imageUrl: "/placeholder-image.jpg",
  },
  {
    name: "Akira Saito",
    lastMessage: "Hey! Ready to conquer the anime world w...",
    imageUrl: "/placeholder-image.jpg",
  },
  {
    name: "Sarah Mitchell",
    lastMessage: "Video",
    imageUrl: "/sarah-mitchell.jpg",
    active: true,
    type: "video",
  },
  {
    name: "Aeria Lilum",
    lastMessage: "Welcome to my meadow... may peace find...",
    imageUrl: "/placeholder-image.jpg",
  },
];

const activeChat = {
  name: "Sarah Mitchell",
  description:
    "In court, I'm unstoppable ⚖️, and in nature — untouchable 🌿. Sports 🏃‍♀️, books 📚, and justice are my three pillars. Everything else is just scenery 🎭",
  isOnline: true,
  messages: [
    {
      type: "text",
      content:
        "I may be strict in the courtroom, but outside of it, I play by my own rules. Want to know them?",
      time: "5:18 PM",
      sender: "them",
    },
    {
      type: "image",
      imageUrl: "/chat-image.jpg",
      time: "5:18 PM",
      sender: "them",
    },
  ],
};

// --- Custom SVG Icons for Profile Sidebar ---
const PersonalityIcon = (props) => (
  <svg width="22" height="21" viewBox="0 0 22 21" fill="none" {...props}>
    <path
      d="M4.50156 11.4L0.601562 7.5L4.50156 3.6L8.40156 7.5L4.50156 11.4ZM8.00156 21V16C6.9849 15.9167 5.97656 15.7957 4.97656 15.637C3.97656 15.4783 2.9849 15.266 2.00156 15L2.50156 13C3.90156 13.3833 5.3059 13.646 6.71456 13.788C8.12323 13.93 9.55223 14.0007 11.0016 14C12.4509 13.9993 13.8802 13.9283 15.2896 13.787C16.6989 13.6457 18.1029 13.3833 19.5016 13L20.0016 15C19.0182 15.2667 18.0266 15.4793 17.0266 15.638C16.0266 15.7967 15.0182 15.9173 14.0016 16V21H8.00156ZM4.50156 8.6L5.60156 7.5L4.50156 6.4L3.40156 7.5L4.50156 8.6ZM11.0016 6C10.1682 6 9.4599 5.70833 8.87656 5.125C8.29323 4.54167 8.00156 3.83333 8.00156 3C8.00156 2.16667 8.29323 1.45833 8.87656 0.875C9.4599 0.291667 10.1682 0 11.0016 1C11.8349 0 12.5432 0.291667 13.1266 0.875C13.7099 1.45833 14.0016 2.16667 14.0016 3C14.0016 3.83333 13.7099 4.54167 13.1266 5.125C12.5432 5.70833 11.8349 6 11.0016 6ZM11.0016 13C10.4516 13 9.9809 12.8043 9.58956 12.413C9.19823 12.0217 9.00223 11.5507 9.00156 11C9.0009 10.4493 9.1969 9.97867 9.58956 9.588C9.98223 10.1973 10.4529 10.0013 11.0016 10C11.5502 9.99867 12.0212 10.1947 12.4146 10.588C12.8079 10.9813 13.0036 11.452 13.0016 11C12.9996 11.548 12.8039 12.019 12.4146 12.413C12.0252 12.807 11.5542 13.0027 11.0016 13ZM11.0016 4C11.2849 4 11.5226 3.904 11.7146 3.712C11.9066 3.52 12.0022 3.28267 12.0016 3C12.0009 2.71733 11.9049 2.48 11.7136 2.288C11.5222 2.096 11.2849 2 11.0016 2C10.7182 2 10.4809 2.096 10.2896 2.288C10.0982 2.48 10.0022 2.71733 10.0016 3C10.0009 3.28267 10.0969 3.52033 10.2896 3.713C10.4822 3.90567 10.7196 4.00133 11.0016 4Z"
      fill="currentColor"
    />
  </svg>
);
const VideoImage = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.344 9.6765C7.72484 9.35984 8.109 9.35984 8.499 9.68567L8.589 9.76734L12.744 13.9223L12.8223 13.9915C12.9827 14.1158 13.1829 14.1773 13.3853 14.1645C13.5878 14.1518 13.7787 14.0656 13.9221 13.9221C14.0656 13.7787 14.1518 13.5878 14.1645 13.3853C14.1773 13.1829 14.1158 12.9827 13.9915 12.8223L13.9223 12.744L12.8457 11.6665L13.089 11.4223L13.1773 11.3432C13.5582 11.0265 13.9423 11.0265 14.3323 11.3523L14.4223 11.434L18.3173 15.3298C18.2384 16.1234 17.8777 16.8624 17.3005 17.4127C16.7233 17.9629 15.9679 18.2881 15.1715 18.329L14.9998 18.3332H4.99984C4.17309 18.3331 3.37587 18.0258 2.76297 17.471C2.15007 16.9161 1.76522 16.1533 1.68317 15.3307L7.25567 9.75567L7.344 9.6765ZM14.9998 1.6665C15.855 1.6665 16.6775 1.9952 17.2972 2.58461C17.9168 3.17401 18.2862 3.97904 18.329 4.83317L18.3332 4.99984V12.9873L15.589 10.244L15.464 10.1298C14.4173 9.21734 13.089 9.21567 12.0507 10.1157L11.9223 10.2323L11.6665 10.4873L9.75567 8.57734L9.63067 8.46317C8.584 7.55067 7.25567 7.549 6.21734 8.449L6.089 8.56567L1.6665 12.9873V4.99984C1.6665 4.14464 1.9952 3.32215 2.58461 2.70249C3.17401 2.08284 3.97904 1.71343 4.83317 1.67067L4.99984 1.6665H14.9998ZM12.5082 5.83317L12.4023 5.839C12.1998 5.8631 12.0131 5.96063 11.8777 6.11314C11.7422 6.26565 11.6674 6.46253 11.6674 6.6665C11.6674 6.87047 11.7422 7.06736 11.8777 7.21987C12.0131 7.37237 12.1998 7.46991 12.4023 7.494L12.4998 7.49984L12.6057 7.494C12.8082 7.46991 12.9949 7.37237 13.1303 7.21987C13.2658 7.06736 13.3406 6.87047 13.3406 6.6665C13.3406 6.46253 13.2658 6.26565 13.1303 6.11314C12.9949 5.96063 12.8082 5.8631 12.6057 5.839L12.5082 5.83317Z"
      fill="#808080"
    ></path>
  </svg>
);
const OccupationIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.25168 5.46068V6.88068L5.55768 7.01868C4.97571 7.06552 4.42625 7.30613 3.99715 7.70206C3.56805 8.09798 3.28409 8.62635 3.19068 9.20268C3.14968 9.46068 3.11068 9.71868 3.07668 9.97768C3.06858 10.0403 3.08059 10.1039 3.11096 10.1592C3.14134 10.2146 3.18851 10.2589 3.24568 10.2857L3.32268 10.3217C8.75168 12.8917 15.2527 12.8917 20.6807 10.3217L20.7577 10.2857C20.8147 10.2587 20.8616 10.2144 20.8918 10.159C20.922 10.1037 20.9339 10.0402 20.9257 9.97768C20.8918 9.71881 20.8541 9.46045 20.8127 9.20268C20.7193 8.62635 20.4353 8.09798 20.0062 7.70206C19.5771 7.30613 19.0276 7.06552 18.4457 7.01868L16.7517 6.88168V5.46168C16.7518 5.04253 16.6014 4.63727 16.328 4.3196C16.0546 4.00193 15.6762 3.79295 15.2617 3.73068L14.0417 3.54768C12.6892 3.34478 11.3141 3.34478 9.96168 3.54768L8.74168 3.73068C8.32735 3.79293 7.94911 4.00176 7.67569 4.31922C7.40227 4.63668 7.25182 5.0417 7.25168 5.46068ZM13.8187 5.03068C12.6141 4.85001 11.3893 4.85001 10.1847 5.03068L8.96468 5.21368C8.90549 5.22254 8.85144 5.25234 8.81235 5.29766C8.77327 5.34299 8.75174 5.40083 8.75168 5.46068V6.77568C10.9166 6.65166 13.0868 6.65166 15.2517 6.77568V5.46068C15.2516 5.40083 15.2301 5.34299 15.191 5.29766C15.1519 5.25234 15.0979 5.22254 15.0387 5.21368L13.8187 5.03068Z"
      fill="currentColor"
    />
    <path
      d="M21.118 12.0696C21.116 12.0373 21.1062 12.0059 21.0894 11.9782C21.0726 11.9505 21.0493 11.9273 21.0216 11.9106C20.9939 11.8938 20.9625 11.8841 20.9301 11.8822C20.8978 11.8803 20.8655 11.8862 20.836 11.8996C15.265 14.3666 8.73497 14.3666 3.16397 11.8996C3.13445 11.8862 3.10213 11.8803 3.0698 11.8822C3.03746 11.8841 3.00608 11.8938 2.97834 11.9106C2.95059 11.9273 2.92733 11.9505 2.91054 11.9782C2.89376 12.0059 2.88395 12.0373 2.88197 12.0696C2.77977 13.9841 2.88269 15.904 3.18897 17.7966C3.28218 18.3731 3.56605 18.9017 3.99516 19.2978C4.42428 19.6939 4.97385 19.9347 5.55597 19.9816L7.42797 20.1316C10.471 20.3776 13.528 20.3776 16.572 20.1316L18.444 19.9816C19.0261 19.9347 19.5757 19.6939 20.0048 19.2978C20.4339 18.9017 20.7178 18.3731 20.811 17.7966C21.117 15.9016 21.221 13.9816 21.118 12.0706"
      fill="currentColor"
    />
  </svg>
);
const HobbiesIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.45548 0.989138C8.96478 0.335184 10.5924 -0.00149631 12.2373 4.99883e-06C13.8822 0.0015063 15.5092 0.341157 17.0173 0.997865C18.5254 1.65457 19.8823 2.61431 21.0039 3.81749C22.1255 5.02066 22.9878 6.44158 23.5372 7.992C24.0001 9.29142 23.7943 10.7794 22.9972 11.904C22.5978 12.4621 22.0716 12.9173 21.4617 13.232C20.8519 13.5467 20.176 13.712 19.4898 13.7143H16.2841C15.6689 13.7121 15.0733 13.9305 14.6054 14.33C14.1375 14.7294 13.8283 15.2833 13.7339 15.8912C13.6396 16.4991 13.7663 17.1207 14.0911 17.6432C14.4158 18.1657 14.9172 18.5544 15.5041 18.7389C16.4469 19.0903 17.1069 19.9423 17.1703 20.9434C17.2322 21.5125 17.0929 22.0854 16.7767 22.5626C16.4604 23.0397 15.9872 23.3912 15.4389 23.556C14.3918 23.8536 13.3081 24.003 12.2195 24C10.0207 23.9987 7.86446 23.3932 5.98634 22.2497C4.11485 21.0981 2.59249 19.4583 1.5828 17.5066C0.573104 15.5548 0.114234 13.3649 0.255484 11.172C0.417424 8.98075 1.17324 6.87502 2.44177 5.08097C3.71029 3.28692 5.44358 1.87233 7.45548 0.989138ZM7.71263 12C8.05031 12 8.38469 11.9335 8.69667 11.8043C9.00865 11.675 9.29212 11.4856 9.5309 11.2468C9.76968 11.0081 9.95909 10.7246 10.0883 10.4126C10.2175 10.1006 10.2841 9.76625 10.2841 9.42857C10.2841 9.09088 10.2175 8.7565 10.0883 8.44452C9.95909 8.13254 9.76968 7.84907 9.5309 7.61029C9.29212 7.37151 9.00865 7.1821 8.69667 7.05288C8.38469 6.92365 8.05031 6.85714 7.71263 6.85714C7.03064 6.85714 6.37659 7.12806 5.89435 7.61029C5.41212 8.09253 5.1412 8.74658 5.1412 9.42857C5.1412 10.1106 5.41212 10.7646 5.89435 11.2468C6.37659 11.7291 7.03064 12 7.71263 12ZM17.9983 6.85714C17.9983 7.53912 17.7274 8.19318 17.2452 8.67541C16.763 9.15765 16.1089 9.42857 15.4269 9.42857C14.7449 9.42857 14.0909 9.15765 13.6086 8.67541C13.1264 8.19318 12.8555 7.53912 12.8555 6.85714C12.8555 6.17515 13.1264 5.5211 13.6086 5.03886C14.0909 4.55663 14.7449 4.28571 15.4269 4.28571C16.1089 4.28571 16.763 4.55663 17.2452 5.03886C17.7274 5.5211 17.9983 6.17515 17.9983 6.85714ZM7.71263 18C8.16728 18 8.60332 17.8194 8.92481 17.4979C9.2463 17.1764 9.42691 16.7404 9.42691 16.2857C9.42691 15.8311 9.2463 15.395 8.92481 15.0735C8.60332 14.752 8.16728 14.5714 7.71263 14.5714C7.25797 14.5714 6.82193 14.752 6.50044 15.0735C6.17895 15.395 5.99834 15.8311 5.99834 16.2857C5.99834 16.7404 6.17895 17.1764 6.50044 17.4979C6.82193 17.8194 7.25797 18 7.71263 18Z"
      fill="currentColor"
    />
  </svg>
);
const RelationshipIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M6 6.75C5.40666 6.75 4.82664 6.57405 4.33329 6.24441C3.83994 5.91477 3.45542 5.44623 3.22836 4.89805C3.0013 4.34987 2.94189 3.74667 3.05764 3.16473C3.1734 2.58279 3.45912 2.04824 3.87868 1.62868C4.29824 1.20912 4.83279 0.923401 5.41473 0.807646C5.99667 0.69189 6.59987 0.7513 7.14805 0.978363C7.69623 1.20543 8.16476 1.58994 8.49441 2.08329C8.82405 2.57664 9 3.15666 9 3.75C9 4.54565 8.68393 5.30871 8.12132 5.87132C7.55871 6.43393 6.79565 6.75 6 6.75ZM6 2.25C5.70333 2.25 5.41332 2.33797 5.16664 2.5028C4.91997 2.66762 4.72771 2.90189 4.61418 3.17598C4.50065 3.45007 4.47094 3.75167 4.52882 4.04264C4.5867 4.33361 4.72956 4.60088 4.93934 4.81066C5.14912 5.02044 5.41639 5.1633 5.70736 5.22118C5.99834 5.27906 6.29994 5.24935 6.57403 5.13582C6.84811 5.02229 7.08238 4.83003 7.2472 4.58336C7.41203 4.33668 7.5 4.04667 7.5 3.75C7.5 3.35218 7.34196 2.97065 7.06066 2.68934C6.77936 2.40804 6.39782 2.25 6 2.25ZM18 6.75C17.4067 6.75 16.8266 6.57405 16.3333 6.24441C15.8399 5.91477 15.4554 5.44623 15.2284 4.89805C15.0013 4.34987 14.9419 3.74667 15.0576 3.16473C15.1734 2.58279 15.4591 2.04824 15.8787 1.62868C16.2982 1.20912 16.8328 0.923401 17.4147 0.807646C17.9967 0.69189 18.5999 0.7513 19.1481 0.978363C19.6962 1.20543 20.1648 1.58994 20.4944 2.08329C20.8241 2.57664 21 3.15666 21 3.75C21 4.54565 20.6839 5.30871 20.1213 5.87132C19.5587 6.43393 18.7956 6.75 18 6.75ZM18 2.25C17.7033 2.25 17.4133 2.33797 17.1666 2.5028C16.92 2.66762 16.7277 2.90189 16.6142 3.17598C16.5006 3.45007 16.4709 3.75167 16.5288 4.04264C16.5867 4.33361 16.7296 4.60088 16.9393 4.81066C17.1491 5.02044 17.4164 5.1633 17.7074 5.22118C17.9983 5.27906 18.2999 5.24935 18.574 5.13582C18.8481 5.02229 19.0824 4.83003 19.2472 4.58336C19.412 4.33668 19.5 4.04667 19.5 3.75C19.5 3.35218 19.342 2.97065 19.0607 2.68934C18.7794 2.40804 18.3978 2.25 18 2.25ZM19.5 22.5H16.5C16.1022 22.5 15.7206 22.342 15.4393 22.0607C15.158 21.7794 15 21.3978 15 21V15.75H16.5V21H19.5V14.25H21V9.75C21 9.55109 20.921 9.36032 20.7803 9.21967C20.6397 9.07902 20.4489 9 20.25 9H15.435L12 15L8.565 9H3.75C3.55109 9 3.36032 9.07902 3.21967 9.21967C3.07902 9.36032 3 9.55109 3 9.75V14.25H4.5V21H7.5V15.75H9V21C9 21.3978 8.84196 21.7794 8.56066 22.0607C8.27936 22.342 7.89782 22.5 7.5 22.5H4.5C4.10218 22.5 3.72064 22.342 3.43934 22.0607C3.15804 21.7794 3 21.3978 3 21V15.75C2.60218 15.75 2.22064 15.592 1.93934 15.3107C1.65804 15.0294 1.5 14.6478 1.5 14.25V9.75C1.5 9.15326 1.73705 8.58097 2.15901 8.15901C2.58097 7.73705 3.15326 7.5 3.75 7.5H9.435L12 12L14.565 7.5H20.25C20.8467 7.5 21.419 7.73705 21.841 8.15901C22.2629 8.58097 22.5 9.15326 22.5 9.75V14.25C22.5 14.6478 22.342 15.0294 22.0607 15.3107C21.7794 15.592 21.3978 15.75 21 15.75V21C21 21.3978 20.842 21.7794 20.5607 22.0607C20.2794 22.342 19.8978 22.5 19.5 22.5Z"
      fill="currentColor"
    />
  </svg>
);
const AgeIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 0.75C5.787 0.75 0.75 5.787 0.75 12C0.75 18.213 5.787 23.25 12 23.25C18.213 23.25 23.25 18.213 23.25 12C23.25 5.787 18.213 0.75 12 0.75ZM6.75 6.27112L8.48212 5.625H9.75V10.875H8.27063V6.7155H8.25L7.00125 7.19213L6.75 6.27112ZM8.70263 18.375C8.01563 18.375 7.43625 18.2029 7.125 18.0154L7.3785 17.1248C7.59825 17.2339 8.10637 17.4368 8.61262 17.4368C9.25725 17.4368 9.58463 17.1409 9.58463 16.7576C9.58463 16.2574 9.0615 16.0305 8.514 16.0305H8.00775V15.1789H8.49038C8.90625 15.1714 9.4365 15.0236 9.4365 14.5935C9.4365 14.2886 9.17587 14.0625 8.65275 14.0625C8.22 14.0625 7.76213 14.2421 7.54163 14.3674L7.28888 13.5075C7.60763 13.3125 8.24475 13.125 8.93025 13.125C10.0654 13.125 10.6954 13.6954 10.6954 14.3899C10.6954 14.9295 10.3766 15.3514 9.72262 15.5704V15.585C10.3609 15.6953 10.875 16.1558 10.875 16.8202C10.875 17.718 10.0504 18.375 8.70263 18.375ZM13.3125 10.1449L13.9965 9.54075C15.1515 8.53237 15.7133 7.95225 15.7286 7.3485C15.7286 6.92738 15.4688 6.59325 14.8586 6.59325C14.403 6.59325 14.0048 6.816 13.7269 7.023L13.3781 6.15713C13.7767 5.86275 14.3947 5.62462 15.1102 5.62462C16.3061 5.62462 16.9654 6.30713 16.9654 7.24463C16.9654 8.1105 16.3222 8.80163 15.5576 9.46912L15.0697 9.8655V9.88163H17.0625V10.875H13.3125V10.1449ZM17.25 17.1232H16.563V18.375H15.2906V17.1232H12.75V16.3234L14.9209 13.125H16.563V16.2019H17.25V17.1232Z"
      fill="currentColor"
    />
    <path
      d="M14.7715 15.0399L14.0039 16.1863V16.2016H15.2917V15.0399C15.2917 14.7234 15.3093 14.4013 15.3355 14.0615H15.301C15.1158 14.4013 14.9654 14.7084 14.7715 15.0399Z"
      fill="currentColor"
    />
  </svg>
);
const ZodiacIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M21.7379 16.1299C21.7429 16.3486 21.6762 16.5628 21.5479 16.7399C21.4212 16.9205 21.2384 17.0541 21.0279 17.1199L19.3179 17.6899C18.7907 17.8638 18.3113 18.1583 17.9179 18.5499C17.5242 18.9417 17.2294 19.4216 17.0579 19.9499L16.4579 21.6499C16.3954 21.854 16.2692 22.0327 16.0979 22.1599C15.9155 22.2853 15.6991 22.3516 15.4779 22.3499C15.256 22.3594 15.0373 22.2948 14.8563 22.1662C14.6752 22.0377 14.5421 21.8525 14.4779 21.6399L13.9079 19.9299C13.7364 19.4016 13.4416 18.9217 13.0479 18.5299C12.6507 18.1407 12.1727 17.8437 11.6479 17.6599L9.93787 17.0999C9.7357 17.0284 9.55856 16.8999 9.42787 16.7299C9.29542 16.55 9.22205 16.3333 9.21787 16.1099C9.20839 15.8881 9.27302 15.6694 9.40158 15.4883C9.53013 15.3072 9.71529 15.1741 9.92787 15.1099L11.6479 14.5399C12.1813 14.3675 12.6661 14.071 13.0625 13.6746C13.4589 13.2782 13.7555 12.7933 13.9279 12.2599L14.4979 10.5699C14.5562 10.362 14.6802 10.1785 14.8514 10.0469C15.0227 9.91531 15.2319 9.8427 15.4479 9.83992C15.6629 9.83992 15.8739 9.89892 16.0579 10.0099C16.2399 10.1349 16.3799 10.3129 16.4579 10.5199L17.0379 12.2599C17.2102 12.7933 17.5068 13.2782 17.9032 13.6746C18.2996 14.071 18.7845 14.3675 19.3179 14.5399L21.0179 15.1399C21.2247 15.2077 21.4038 15.3411 21.5279 15.5199C21.6633 15.6945 21.7372 15.909 21.7379 16.1299ZM11.7389 9.76992C11.7373 9.96595 11.6782 10.1572 11.5689 10.3199C11.4507 10.4809 11.287 10.6028 11.0989 10.6699L9.83887 11.0899C9.48587 11.2119 9.16587 11.4099 8.89887 11.6699C8.63733 11.9357 8.43908 12.257 8.31887 12.6099L7.88887 13.8499C7.82861 14.0416 7.70525 14.2073 7.53887 14.3199C7.37447 14.4347 7.17936 14.4974 6.97887 14.4999C6.77389 14.4965 6.5749 14.4302 6.40887 14.3099C6.25159 14.1903 6.13328 14.0267 6.06887 13.8399L5.65887 12.5899C5.53857 12.2399 5.34023 11.9219 5.07887 11.6599C4.82222 11.3919 4.50247 11.1925 4.14887 11.0799L2.89887 10.6599C2.70491 10.5989 2.5363 10.4759 2.41887 10.3099C2.33927 10.1853 2.28832 10.0445 2.26969 9.89774C2.25105 9.75101 2.2652 9.60197 2.31111 9.46136C2.35703 9.32076 2.43356 9.19209 2.53519 9.08463C2.63683 8.97716 2.76104 8.89359 2.89887 8.83992L4.14887 8.42992C4.50257 8.30642 4.82384 8.1047 5.08875 7.83979C5.35366 7.57488 5.55537 7.25361 5.67887 6.89992L6.08887 5.66992C6.14781 5.48559 6.25897 5.32232 6.40887 5.19992C6.56816 5.0799 6.7597 5.01025 6.95887 4.99992C7.16067 4.9945 7.35938 5.05027 7.52887 5.15992C7.69568 5.27252 7.82464 5.43284 7.89887 5.61992L8.31887 6.89992C8.44237 7.25361 8.64409 7.57488 8.909 7.83979C9.1739 8.1047 9.49517 8.30642 9.84887 8.42992L11.0989 8.85992C11.2858 8.92414 11.4471 9.04686 11.5589 9.20992C11.6772 9.37252 11.7403 9.5688 11.7389 9.76992ZM17.5279 4.40992C17.5188 4.59225 17.46 4.76862 17.3579 4.91992C17.2538 5.06252 17.1065 5.16773 16.9379 5.21992L16.3179 5.42992C16.1974 5.47148 16.088 5.5399 15.9979 5.62999C15.9079 5.72008 15.8394 5.82948 15.7979 5.94992L15.5779 6.57992C15.5175 6.73335 15.4174 6.86795 15.2879 6.96992C15.1404 7.08802 14.9568 7.1516 14.7679 7.14992C14.5949 7.13995 14.4268 7.0885 14.2779 6.99992C14.1293 6.88887 14.0177 6.73549 13.9579 6.55992L13.7479 5.93992C13.7109 5.81735 13.6418 5.70688 13.5479 5.61992C13.4597 5.52741 13.3497 5.45862 13.2279 5.41992L12.6079 5.21992C12.4429 5.15559 12.298 5.04861 12.1879 4.90992C12.083 4.76062 12.027 4.5824 12.0279 4.39992C12.0337 4.21699 12.0928 4.03974 12.1979 3.88992C12.3047 3.75019 12.451 3.64569 12.6179 3.58992L13.2279 3.38992C13.3509 3.34761 13.4634 3.27941 13.5579 3.18992C13.6467 3.09495 13.7148 2.98258 13.7579 2.85992L13.9679 2.23992C14.0279 2.08492 14.1229 1.94792 14.2479 1.83992C14.3913 1.73403 14.5605 1.66843 14.7379 1.64992C14.9266 1.64884 15.1113 1.70459 15.2679 1.80992C15.4088 1.91597 15.5192 2.05742 15.5879 2.21992L15.7979 2.85992C15.8411 2.98254 15.9091 3.0949 15.9979 3.18992C16.0909 3.27629 16.1995 3.34416 16.3179 3.38992L16.9479 3.59992C17.1081 3.66296 17.2493 3.76629 17.3579 3.89992C17.467 4.04771 17.5265 4.22623 17.5279 4.40992Z"
      fill="currentColor"
    />
  </svg>
);

const sarahMitchellProfile = {
  media: Array(8).fill("/placeholder-image.jpg"),
  personality: [
    {
      icon: PersonalityIcon,
      title: "Personality",
      value: "Driven and professional • Passion for justice",
    },
    { icon: OccupationIcon, title: "Occupation", value: "Lawyer" },
    {
      icon: HobbiesIcon,
      title: "Hobbies",
      value: "Reading • Hiking • Outdoor activities",
    },
    { icon: RelationshipIcon, title: "Relationship", value: "Married" },
  ],
  physical: [
    { icon: AgeIcon, title: "Age", value: "32" },
    { icon: ZodiacIcon, title: "Zodiac Sign", value: "Pisces" },
  ],
};

// --- Main Page Component ---
export default function ChatPage() {
  const [chatPanelWidth, setChatPanelWidth] = useState<number>(440);
  const [prompt, setPrompt] = useState("");
  const { messages, balance, isStreaming, error, sendMessage } =
    useChatStreaming();
  const isResizing = useRef(false);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const maxWidth = window.innerWidth - 800;
      const newWidth = Math.max(800, Math.min(e.clientX, maxWidth));
      setChatPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isResizing.current = true;
  };
  return (
    <div className="bg-[#121212] text-white flex h-[calc(100dvh-64px)] font-sans overflow-hidden">
      <ChatListPanel width={chatPanelWidth} />
      <div
        className="w-0.5 bg-[var(--gray-dark)] text-[var(--main)] cursor-ew-resize relative"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--gray-dark)] rounded-full">
          <ResizeIcon />
        </div>
      </div>
      <ChatWindow
        setPrompt={setPrompt}
        sendMessage={() => sendMessage(prompt)}
        message={messages}
      />
      <ProfileSidebar />
    </div>
  );
}

// --- Component for the Left Chat List Panel ---
const ChatListPanel = ({ width }: { width: number }) => (
  <aside
    className="bg-[var(--secondary)] flex flex-col shrink-0"
    style={{ width: `${width}px` }}
  >
    <div className="p-4 flex gap-3 flex-col bg-linear-[144deg,_rgb(24,_24,_24)_1.24%,_rgb(16,_16,_16)]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-0">Chat</h1>
        <button className="flex items-center gap-3 font-semibold text-base bg-[rgb(49,_49,_49)] p-3 h-11 rounded-lg hover:bg-linear-[91deg,rgb(255,_102,_198),rgb(201,_116,_254)] cursor-pointer">
          Add chat <Plus size={16} />
        </button>
      </div>
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search for a profile..."
          className="w-full bg-[var(--main)] rounded-xl h-12 text-[var(--gray)] flex items-center pl-12 pr-4 py-2 focus:outline-none"
        />
      </div>
    </div>

    <div className="py-1.5 px-4 bg-[url(https://get-honey.ai/assets/timer-bg-ANSYoOus.svg)] bg-center h-[72px] gap-2 rounded-lg flex items-center justify-between">
      <div>
        <p className="text-base mb-1.5 font-bold">SPECIAL OFFER</p>
        <p className="text-base text-[#ae52e7]">Get it now</p>
      </div>
      <PremiumButton />
      <button className="text-white/70 hover:text-white">
        <X size={18} />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto">
      <ul className="space-y-1 py-2 pl-3 pr-1">
        {chatUsers.map((user) => (
          <li key={user.name}>
            <button
              className={`w-full text-left py-3.5 px-4 flex items-center gap-3 transition-colors ${
                user.active
                  ? "bg-[var(--gray-500)] border-l-2 border-purple-500"
                  : "hover:bg-[#2C2C2C]"
              }`}
            >
              <div className="relative h-[54px] w-[54px] rounded-xl overflow-hidden">
                <img
                  src="https://cdn.get-honey.ai/CoverVideos/single-size/Sarah%20Mitchell.webp"
                  alt={user.name}
                  className="rounded-xl"
                />
                {user.active && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2C2C2C]"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-bold">{user.name}</p>
                <p className="text-[var(--gray)] truncate flex items-center gap-1">
                  {user.type === "video" && (
                    <VideoImage size={14} className="text-gray-400" />
                  )}
                  {user.lastMessage}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

// --- Component for the Center Chat Window ---
const ChatWindow = ({
  setPrompt,
  sendMessage,
  message,
}: {
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: any;
  message: any;
}) => (
  <main className="flex-1 flex flex-col min-w-sm">
    {/* Header */}
    <header className="flex items-center py-4 px-8 bg-[var(--purple)]">
      <div className="flex justify-between w-full">
        <div className="flex gap-3 items-center">
          <div className="relative h-16 w-16 rounded-xl overflow-hidden">
            <img
              src="https://cdn.get-honey.ai/CoverVideos/single-size/Sarah%20Mitchell.webp"
              alt={activeChat.name}
              className="rounded-xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-2xl">{activeChat.name}</h2>
            <div className="flex items-center text-[rgb(178,_178,_178)]">
              <div className="w-[13px] h-[13px] mx-3 bg-[var(--green)] rounded-full"></div>
              Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <button className="hover:scale-110 cursor-pointer py-3 relative">
            <Phone size={24} fill="var(--green)" color="" />
            <div className="absolute rounded-full h-2.5 w-2.5 top-0 -right-1 bg-[var(--pink)]"></div>
          </button>
          <button className="py-3">
            <User size={24} color="var(--accent) " />
          </button>
          <button className="py-3">
            <MoreVertical size={24} color="var(--accent)" strokeWidth={3} />
          </button>
        </div>
      </div>
    </header>
    <div className="flex relative bg-[url(https://get-honey.ai/assets/timer-bg-ANSYoOus.svg)] bg-[#381344] bg-center h-18 py-1.5 px-4 items-center justify-between text-sm">
      <div className="flex flex-col text-base">
        <p className="font-bold mb-1.5">Hurry Up!</p>
        <p className="text-[#ae52e7] font-semibold">Limited-Time Offer:</p>
      </div>

      <div className="flex items-center gap-2">
        <PremiumButton />
      </div>
      <div className="flex gap-1">
        <div className="bg-black/30 px-2 py-1 rounded-md text-center">
          <div className="font-bold text-lg">05</div>
          <div className="text-xs">Min</div>
        </div>
        <div className="bg-black/30 px-2 py-1 rounded-md text-center">
          <div className="font-bold text-lg">45</div>
          <div className="text-xs">Sec</div>
        </div>
        <button className="text-white ml-1">
          <X size={20} />
        </button>
      </div>

      <div className="text-[var(--gray)] absolute w-full justify-center -bottom-12 left-0 flex items-center">
        <div className="flex items-center justify-center rounded-xl text-base px-4 py-2 bg-[rgba(24,_24,_24,_0.8)] z-20 backdrop:sm">
          <span className=" text-center">August 4</span>
        </div>
      </div>
    </div>

    {/* Chat Messages */}
    <div className="flex-1 p-6 overflow-y-auto space-y-6 relative">
      {
        <div className="bg-purple-600 rounded-2xl rounded-bl-none p-3 max-w-md">
          <p>{message}</p>
        </div>
      }
      {/* {activeChat.messages.map((msg, index) => (
        <div key={index} className="flex flex-col items-start gap-2">
          {msg.type === "text" && (
            <div className="bg-purple-600 rounded-2xl rounded-bl-none p-3 max-w-md">
              <p>{msg.content}</p>
            </div>
          )}
          {msg.type === "image" && (
            <div className="relative w-72 h-80 rounded-2xl overflow-hidden cursor-pointer">
              <img
                src={msg.imageUrl}
                alt="Chat Image"
                className="filter blur-md"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <Eye size={20} />
                  <span>Click to see Image</span>
                </div>
              </div>
            </div>
          )}
          {msg.type === "image" && (
            <div className="relative w-72 h-80 rounded-2xl overflow-hidden cursor-pointer">
              <img
                src={msg.imageUrl}
                alt="Chat Image"
                className="filter blur-md"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <Eye size={20} />
                  <span>Click to see Image</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button className="bg-pink-500/20 text-pink-400 rounded-full w-6 h-6 flex items-center justify-center">
              <PlayCircle size={14} className="text-pink-400" />
            </button>
            <span>{msg.time}</span>
          </div>
        </div>
      ))} */}
    </div>

    <div className="flex w-full p-4 gap-3 bg-transparent">
      <div className="flex-1 bg-[var(--main)] border border-[var(--gray-dark)] flex items-center p-3 rounded-2xl">
        <textarea
          placeholder="Type a message"
          className="flex-1 bg-transparent px-3 py-2 resize-none focus:outline-none"
          onChange={(e) => setPrompt(e.target.value)}
          rows={1}
        />
        <div className="relative group">
          <button className="text-base flex items-center gap-1.5 bg-[rgb(31,_22,_37)] text-[rgb(207,_151,_241)] p-3 rounded-md font-semibold h-9">
            <Camera size={20} /> Ask <ChevronDown size={20} />
          </button>
        </div>
      </div>
      <button className="w-[62px] h-[62px] disabled:bg-[var(--gray-dark)] text-[var(--gray-400)] flex justify-center items-center rounded-xl cursor-pointer bg-linear-[91deg,_#ff44ba_0%,_#8840b5_100%] hover:bg-linear-[91deg,_#ff66c6_0%,_#c974fe_100%]">
        <SendHorizonal
          size={24}
          fill="white"
          color=""
          className="hover:scale-120"
          onClick={() => sendMessage()}
        />
      </button>
    </div>
  </main>
);

const ProfileSidebar = () => (
  <aside className="w-[368px] bg-[#1A1A1A] flex flex-col border-l border-gray-700 space-y-6 overflow-y-auto">
    <div className="max-h-[400px]">
      <img
        className=""
        src="https://cdn.get-honey.ai/CoverVideos/single-size/Sarah%20Mitchell.webp"
      />
    </div>
    <div className="-top-8 bg-[var(--main)] p-6 rounded-t-4xl">
      <div>
        <h1 className="text-2xl font-bold mb-[3px]">{activeChat.name}</h1>
        <h3 className="text-base text-[var(--gray)] mb-3">
          {activeChat.description}
        </h3>
      </div>
      <div className="space-y-3">
        <Button
          variant="gradient"
          className="w-full h-12 rounded-xl flex items-center justify-center text-base font-bold shadow-lg gap-2"
          // onClick={() => router.push("/create-character")}
        >
          <WandIcon size={22} />
          Create Your Own Character
        </Button>
        <button className="w-full text-[18px] text-white hover:bg-linear-[91deg,_rgb(101,_223,_113),_rgb(68,_144,_76)] bg-linear-[91deg,_rgb(116,_255,_130),_rgb(81,_165,_90)] font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 cursor-pointer">
          <Phone fill="white" size={24} strokeWidth={0.5} />
          Call Me
        </button>
        <button className="w-full flex items-center justify-center gap-2 border border-pink-400 text-pink-400 font-semibold py-3 rounded-lg hover:bg-pink-400/10 transition-colors">
          <Camera size={20} /> Generate Photo
        </button>
      </div>

      <div className="space-y-6 mt-8">
        <div>
          <h2 className="font-bold mb-4 text-xl">Personality Attributes</h2>
          <ul className="space-y-4 text-sm">
            {sarahMitchellProfile.personality.map((attr) => (
              <AttributeItem key={attr.title} {...attr} />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-xl">Physical Attributes</h3>
          <ul className="space-y-4">
            {sarahMitchellProfile.physical.map((attr) => (
              <AttributeItem key={attr.title} {...attr} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </aside>
);

const AttributeItem = ({ icon: Icon, title, value }) => (
  <li className="flex items-start gap-4 h-full">
    <div className="text-[var(--pink)] self-center">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-lg font-bold text-[rgb(223,_186,_245)]">{title}</p>
      <p className="font-medium text-sm text-white gap-2">{value}</p>
    </div>
  </li>
);
