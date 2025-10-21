import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <HeroSection
      onDownloadResume={() => console.log("Download resume triggered")}
      onViewPatents={() => console.log("View patents triggered")}
    />
  );
}
