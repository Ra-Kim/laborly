// data.js
import {
	FaHammer,
	FaPaintRoller,
	FaPlug,
	FaTools,
	FaToilet,
	FaFan,
	FaCogs,
	FaCarCrash,
	FaBroom,
	FaTree,
	FaLock,
	FaFireExtinguisher,
	FaTshirt,
	FaTruckPickup,
	FaWindowRestore,
} from "react-icons/fa";

export const artisanCategories = [
	{
		id: 1,
		title: "Carpenters",
		icon: FaHammer,
		providers: 124,
	},
	{
		id: 2,
		title: "Painters",
		icon: FaPaintRoller,
		providers: 98,
	},
	{
		id: 3,
		title: "Electricians",
		icon: FaPlug,
		providers: 87,
	},
	{
		id: 4,
		title: "Plumbers",
		icon: FaToilet,
		providers: 76,
	},
	{
		id: 5,
		title: "AC Technicians",
		icon: FaFan,
		providers: 52,
	},
	{
		id: 6,
		title: "Auto Mechanics",
		icon: FaCarCrash,
		providers: 65,
	},
	{
		id: 7,
		title: "Welders",
		icon: FaTools,
		providers: 41,
	},
	{
		id: 8,
		title: "Technicians",
		icon: FaCogs,
		providers: 103,
	},
	{
		id: 9,
		title: "Cleaners",
		icon: FaBroom,
		providers: 89,
	},
	{
		id: 10,
		title: "Gardeners",
		icon: FaTree,
		providers: 72,
	},
	{
		id: 11,
		title: "Security Experts",
		icon: FaLock,
		providers: 38,
	},
	{
		id: 12,
		title: "Fire Safety",
		icon: FaFireExtinguisher,
		providers: 22,
	},
	{
		id: 13,
		title: "Tailors",
		icon: FaTshirt,
		providers: 49,
	},
	{
		id: 14,
		title: "Movers",
		icon: FaTruckPickup,
		providers: 34,
	},
	{
		id: 15,
		title: "Window Installers",
		icon: FaWindowRestore,
		providers: 29,
	},
];

export const testimonials = [
	{
		id: 1,
		name: "Chinedu Okafor",
		role: "Homeowner, Lagos",
		message:
			"Laborly connected me with a reliable electrician in just minutes. The process was smooth and stress-free!",
		image: "/images/testimonials/chinedu.jpg",
		rating: 5,
	},
	{
		id: 2,
		name: "Aisha Bello",
		role: "Business Owner, Abuja",
		message:
			"I needed urgent plumbing work at my shop and Laborly delivered! Fast service and great professionals.",
		image: "/images/testimonials/aisha.jpg",
		rating: 4,
	},
	{
		id: 3,
		name: "Tunde Balogun",
		role: "Construction Manager, Ibadan",
		message:
			"Laborly makes it super easy to find trustworthy artisans. I highly recommend it to anyone managing projects.",
		image: "/images/testimonials/tunde.jpg",
		rating: 5,
	},
	{
		id: 4,
		name: "Grace Nwankwo",
		role: "Interior Designer, Port Harcourt",
		message:
			"The handyman I hired through Laborly exceeded my expectations. Punctual, professional, and skilled!",
		image: "/images/testimonials/grace.jpg",
		rating: 5,
	},
	{
		id: 5,
		name: "Joseph Adeyemi",
		role: "Landlord, Enugu",
		message:
			"It's hard to find reliable artisans, but Laborly really came through. Now I use it for all my rental properties.",
		image: "/images/testimonials/joseph.jpg",
		rating: 4,
	},
];
