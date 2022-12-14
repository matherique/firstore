import Image from "next/image";
import Logo from "@public/logo.png";
import { FaUserFriends, FaBox, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import useAuth from "@hooks/useAuth";
import { profile } from "console";
import { Profile } from "@prisma/client";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex w-screen h-screen">
      <aside className="w-72 bg-[#000000]" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3">
          <a href="" className="flex items-center pl-2.5 mb-5">
            <Image src={Logo} alt="logo" width={200} height={100} />
          </a>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/produtos/listar"
                className="group flex items-center p-2 text-base font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-white"
              >
                <FaShoppingBag size={26} color="#FFFFFF" />
                <span className="flex-1 ml-3 whitespace-nowrap text-white group-hover:text-white">
                  Produtos
                </span>
              </Link>
            </li>
            {user?.profile === Profile.ADMINISTRATOR ? (
              <li>
                <Link
                  href="/dashboard/usuarios/listar"
                  className="group flex items-center p-2 text-base font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-white"
                >
                  <FaUserFriends size={26} color="#FFFFFF" />
                  <span className="flex-1 ml-3 whitespace-nowrap text-white group-hover:text-white">
                    Usuários
                  </span>
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                href="/dashboard/estoque/listar"
                className="group flex items-center p-2 text-base font-normal text-slate-900 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-white"
              >
                <FaBox size={26} color="#FFFFFF" />
                <span className="flex-1 ml-3 whitespace-nowrap text-white group-hover:text-white">
                  Estoque
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside >
      <div className="w-full p-6">{children}</div>
    </div >
  );
}

export default DashboardLayout;
