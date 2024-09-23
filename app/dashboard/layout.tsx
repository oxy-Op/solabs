import { auth } from "@/auth";
import UserAddress from "./components/user-popup";
import { FaWallet } from "react-icons/fa";
import { getBalance } from "@/actions/get-balance";
import { SiSolana } from "react-icons/si";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || !session.user || !session.user.publicKey) {
    return null;
  }

  const balance = await getBalance();

  return (
    <main className="flex h-full flex-col bg-[#1b1b1b] overflow-hidden">
      {" "}
      {/* Added overflow-hidden to remove unnecessary scrollbar */}
      <header className="h-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#323333] to-[#1b1b1b] border-b border-b-popover-foreground flex items-center">
        <div className="pl-12 text-3xl font-semibold uppercase">SolAbs</div>
        <div className="ms-auto pr-4 flex space-x-3 items-center">
          <div className="flex space-x-2 items-center">
            <FaWallet className="size-5" />
            <p>{balance.toFixed(2)}</p>
            <SiSolana className="size-4" />
          </div>
          <UserAddress address={session.user.publicKey} />
        </div>
      </header>
      <div className="h-full overflow-y-auto">{children}</div>{" "}
      {/* Ensure the child content has scroll only when needed */}
    </main>
  );
};

export default DashboardLayout;
