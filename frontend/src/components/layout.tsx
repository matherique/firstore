import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import Logo from "@public/logo.png";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "@shared/trpc";

type BreadcrumbItem = {
  href: string;
  label: string;
};

type Props = {
  children: React.ReactNode;
  breadcrumb?: BreadcrumbItem[];
};

function CartIcon({ hasItens }: { hasItens: boolean }) {
  if (hasItens) {
    return <FaCartPlus size={30} color="#FFFFFF" />;
  }

  return <FaShoppingCart size={30} color="#FFFFFF" />;
}

function Menu() {
  const { data: session } = useSession()

  const { data } = trpc.useQuery(["shopping-cart.hasItens"])

  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-4 text-slate-500 hover:text-slate-700 focus:text-slate-700">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between">
        <div className="container-fluid basis-1/2">
          <Link href="/" className="flex items-center text-slate-900 hover:text-slate-900 focus:text-slate-900 mt-2 lg:mt-0 mr-1">
            <Image src={Logo} alt="logo" width={200} height={100} />
          </Link>
        </div>
        <div className="container-fluid flex items-center gap-x-5">
          {session ? <div className="flex gap-5">
            <div className="flex flex-col">
              <a
                href="/perfil"
                className="text-xl text-slate-500 cursor-pointer"
              >{session.user.name}</a>
              <small
                onClick={() => signOut()}
                className="self-end text-sm text-slate-500 cursor-pointer hover:underline"
              >
                Sair
              </small>
            </div>
            <Link href="/carrinho-de-compras">
              <CartIcon hasItens={data ?? false} />
            </Link>
          </div> : (<>
            <Link href="/criar-conta" className="text-slate-600 hover:text-slate-700 transition duration-300 ease-in-out">
              Criar conta
            </Link>
            <Link href="/entrar" className="inline-block px-7 py-3 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
              Entrar
            </Link>
          </>)}
        </div>
      </div>
    </nav >
  );
}

export default function Layout({ children, breadcrumb }: Props) {
  return (
    <section className="">
      <div className="mx-auto w-8/12">
        <Menu />
        <nav className="rounded-md w-full">
          <ol className="list-reset flex">
            {breadcrumb &&
              breadcrumb.map((item, index) => {
                const isLastItem = index === breadcrumb.length - 1;
                return (
                  <React.Fragment key={index}>
                    <li className="text-slate-500">
                      {!isLastItem ? (
                        <a
                          href={item.href}
                          className="text-slate-600 hover:text-slate-700"
                        >
                          {item.label}{" "}
                        </a>
                      ) : (
                        item.label
                      )}
                    </li>
                    {!isLastItem ? (
                      <li>
                        <span className="text-slate-500 mx-2">{`>`}</span>
                      </li>
                    ) : null}
                  </React.Fragment>
                );
              })}
          </ol>
        </nav>
        {children}
      </div>
    </section>
  );
}
