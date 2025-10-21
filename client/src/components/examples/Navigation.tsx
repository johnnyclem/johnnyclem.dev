import Navigation from "../Navigation";

export default function NavigationExample() {
  return (
    <Navigation
      onDownloadResume={() => console.log("Download resume triggered")}
    />
  );
}
