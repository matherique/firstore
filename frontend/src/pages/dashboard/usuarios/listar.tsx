import DashboardLayout from "@components/dashboard-layout";
import useAlert from "@hooks/useAlerts";
import { trpc } from "@shared/trpc";
import { Profile } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { adminOnlyPage } from "@shared/auth";
import useAuth from "@hooks/useAuth";

function getProfile(role: string) {
  switch (role) {
    case Profile.ADMINISTRATOR:
      return "Administrador";
    case Profile.ENPLOYEE:
      return "Funcionário";
  }

  return "Cliente";
}

const DEFAULT_QUANTITY = 10

const ListaUsuario: NextPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const { data: users, refetch } = trpc.useQuery(["user.getAll", {
    query,
    quantity: DEFAULT_QUANTITY,
    page: page
  }]);
  const { success, error } = useAlert()
  const { id } = useAuth();

  const { mutate: deleteUser } = trpc.useMutation(["user.delete"]);

  const handleDelete = useCallback((id: string) => {
    deleteUser({ id }, {
      onSuccess: () => {
        success("Usuário deletado com sucesso")
        refetch()
      },
      onError: () => { error("Erro ao deletar usuário") }
    });
  }, [deleteUser, error, refetch, success])

  const shouldNextPage = users?.length === DEFAULT_QUANTITY
  const shouldPrevPage = page > 1

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-slate-500 font-bold">Lista de Usuários</h1>
      <Link
        href="/dashboard/usuarios/cadastrar"
        className="px-7 py-3 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Novo
      </Link>
    </header>
    <div className="w-full mb-5">
      <input
        className="w-full px-4 py-2 text-base font-normal text-slate-700 bg-white bg-clip-padding border border-solid border-slate-300 rounded transition ease-in-out m-0 focus:text-slate-700 focus:bg-white focus:border-slate-600 focus:outline-none"
        placeholder="digite o nome do usuário"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
    <div className="w-full h-2/3">
      <table className="w-full table-auto">
        <thead className="text-left">
          <tr>
            <th className="w-">Nome</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{getProfile(user.profile)}</td>
              <td>{user.status ? "Ativo" : "Inativo"}</td>
              <td className="flex items-center gap-2">
                <Link href={`/dashboard/usuarios/editar/${user.id}`}>
                  <FaEdit size={30} color="#1e40af" />
                </Link>
                {user.id === id ? null : (
                  < span className="cursor-pointer" onClick={() => handleDelete(user.id)}>
                    <FaTrash size={23} color="#991b1b" />
                  </span>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-5 justify-between">
        <div>
          {
            shouldPrevPage ? (
              <button
                className="px-7 py-1 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </button>) : null
          }
        </div>
        {
          shouldNextPage ? (
            <button
              className="px-7 py-1 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => setPage(page + 1)}
            >
              Proximo
            </button>) : null
        }
      </div>
    </div>
  </DashboardLayout >
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return adminOnlyPage(context)
}

export default ListaUsuario