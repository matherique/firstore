import DashboardLayout from "@components/dashboard-layout";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const route = useRouter()

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Bem vindo</h1>

      <div className="flex w-3/4 gap-10">
        <div className="w-full mt-4">
          <button
            onClick={() => route.push("/dashboard/produtos/cadastrar")}
            className="w-full py-10 bg-slate-600 text-white font-medium text-xl leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
          >Novo produto</button>
        </div>
        <div className="w-full flex-col mt-4 bg-slate-700">
          <button
            onClick={() => route.push("/dashboard/estoque/listar")}
            className="w-full py-10 bg-slate-600 text-white font-medium text-xl leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
          >Editar estoque</button>
        </div>
        <div className="w-full flex-col mt-4 bg-green-700">
          <button
            onClick={() => route.push("/dashboard/relatorios/listar")}
            className="w-full py-10 bg-slate-600 text-white font-medium text-xl leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
          >Relatórios</button>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Home;
