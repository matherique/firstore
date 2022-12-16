import DashboardLayout from "@components/dashboard-layout";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { adminOnlyPage } from "@shared/auth";

const ListarRelatorios: NextPage = () => {
  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-10">
      <h1 className="text-3xl text-slate-500 font-bold">Lista de Relatórios disponíveis</h1>
    </header>
    <div className="w-full h-2/3">
      <table className="w-full table-auto">
        <thead className="text-left">
          <tr>
            <th className="w-">Nome</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Relatório de produtos do estoque</td>
            <td>
              <Link
                href={`https://api-firstore.azurewebsites.net/stock/report`}
                className="text-blue-900 hover:underline"
              >
                Download
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout >
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return adminOnlyPage(context)
}

export default ListarRelatorios