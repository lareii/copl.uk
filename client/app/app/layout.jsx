import Navbar from "@/components/app/navbar";

export default function Layout({ children }) {
  return (
    <div className="flex max-lg:flex-col max-w-screen-lg mx-auto lg:pt-14">
      <div
        className="sticky px-5 top-14 self-start max-lg:top-0 max-lg:py-3 max-lg:w-full max-lg:backdrop-blur-xl max-lg:border-b">
        <Navbar className="min-w-60" />
      </div>
      <div className="w-full px-5 pb-5 max-lg:py-5">
        {children}
      </div>
    </div>
  );
}