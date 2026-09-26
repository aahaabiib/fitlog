// HOME PAGE — route: "/"
// Just combines the Hero (top banner) and Library (workout grid) sections.
import Hero from "@/components/Hero";
import Library from "@/components/Library";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Library />
    </>
  );
}