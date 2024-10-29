import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => {
  return (
    <main className={`p-4 pt-20 max-w-[1200px] mx-auto ${className}`}>
      {children}
    </main>
  );
};

export default Page;
