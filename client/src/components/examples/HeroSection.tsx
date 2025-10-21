import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <div className="bg-background">
      <HeroSection
        onDownloadResume={() => console.log("Download resume triggered")}
        onViewPatents={() => console.log("View patents triggered")}
      />
    </div>
  );
}
