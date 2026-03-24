import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import logoFull from "@/assets/logo-full.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="text-center max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Link to="/" className="inline-block mb-10 transition-transform hover:scale-105">
          <img src={logoFull} alt="The Wise Trunk" className="h-24 md:h-32 mx-auto" />
        </Link>

        <h1 className="mb-4 text-6xl font-bold text-accent">404</h1>

        <h2 className="mb-2 text-2xl font-semibold text-primary">Page Not Found</h2>

        <p className="mb-8 text-lg text-muted-foreground">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm hover:scale-105 hover:bg-accent/90 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
