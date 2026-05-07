import HomeClient from "./HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rifal Azhar | Junior Data Analyst Portfolio",
  description: "Portfolio of Rifal Azhar Permana — Junior Data Analyst specializing in SQL, Python, and Tableau. Turning business data into clear insights.",
};


export default function Page() {
  return <HomeClient />;
}
