import HomeClient from "./HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rifal Azhar | Home",
  description: "Portfolio of Rifal Azhar Permana. A Creative Technologist blending Data Science with High-End Web Development.",
};

export default function Page() {
  return <HomeClient />;
}
