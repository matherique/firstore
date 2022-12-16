import DashboardLayout from "@components/dashboard-layout";
import { trpc } from "@shared/trpc";
import { GetServerSideProps, NextPage } from "next";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { CreateUserType } from "@shared/validations/user";
import useAlert from "@hooks/useAlerts";
import Link from "next/link";
import { adminOnlyPage } from "@shared/auth";
import { Profile } from "@models";
import { FaSpinner } from "react-icons/fa";

const CadastrarUsuario: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm<CreateUserType>()

  const { mutate: createUser, data, isLoading } = trpc.useMutation(["user.create"])
  const { success, error } = useAlert()


  const onSubmit = useCallback(async (data: CreateUserType) => {
    createUser(data, {
      onSuccess: () => {
        success("Usuário criado com sucesso!")
      },
      onError: (err) => {
        console.error(err)
        error("Erro ao criar usuário!")
      }
    })
  }, [createUser, error, success])

  const inputStyle = useCallback((hasError: boolean) => {
    let style = `block w-full p-2 text-md font-normal text-slate-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-slate-700 focus:bg-white focus:border-slate-600 focus:outline-none`

    if (hasError) return style + ` border-red-500`
    return style + ` border-slate-300`
  }, [])

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-slate-500 font-bold">Cadastrar Usuário</h1>
      <Link
        href="/dashboard/usuarios/listar"
        className="px-7 py-3 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Voltar
      </Link>
    </header>
    <div className="flex flex-row mt-10 ">
      <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className={inputStyle(!!errors.name)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              {...register("email", { required: true })}
              className={inputStyle(!!errors.email)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className={inputStyle(!!errors.password)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="profile">Perfil</label>
            <select
              className={inputStyle(!!errors.profile)} id="profile"
              {...register("profile", { required: true })}
            >
              <option>Escolha um perfil de acesso</option>
              <option value={Profile.ENPLOYEE}>Funcionário</option>
              <option value={Profile.ADMINISTRATOR}>Administrador</option>
            </select>
          </div>
          <div className="flex flex-col">
            <button
              className="flex items-center justify-center px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              Cadastrar {isLoading && <FaSpinner className="animate-spin ml-3" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  </DashboardLayout >
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return adminOnlyPage(context)
}

export default CadastrarUsuario