import ContactSection from "../ContactSection";

export default function ContactSectionExample() {
  return (
    <ContactSection
      onDownloadResume={() => console.log("Download resume triggered")}
      onDownloadCoverLetter={() => console.log("Download cover letter triggered")}
    />
  );
}
