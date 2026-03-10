import DonateUsComponent from "@/Components/DonateUs/DonateUsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Donate Us | Anuja Sushant Patil Global Foundation",
    description: "Support our mission and make a contribution. Your donation helps us empower communities and create lasting impact.",
    openGraph: {
        title: "Donate Us | ASPGF",
        description: "Join us in our journey of empowerment. Every contribution makes a difference.",
        type: "website",
    },
};

export default function DonateUsPage() {
    return <DonateUsComponent />;
}
