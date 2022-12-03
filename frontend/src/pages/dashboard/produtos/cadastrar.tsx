import DashboardLayout from "@components/dashboard-layout";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useAlert from "@hooks/useAlerts";
import Link from "next/link";
import { CreateSchema } from "@shared/validations/product";
import { toCurrency } from "@shared/convert";

type CreateSchemaForm = Omit<CreateSchema, 'price'> & { price: string }

const CadastrarProdutos: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    },
  } = useForm<CreateSchemaForm>()

  const { mutate: createProduct, data } = trpc.useMutation(["product.create"])
  const { success, error } = useAlert()

  const onSubmit = useCallback(async (data: CreateSchemaForm) => {
    createProduct({
      name: data.name,
      price: Number(data.price.replace("R$ ", "").replace(/\./g, "").replace(",", "."))
    }, {
      onSuccess: () => {
        success("Produto cadastrado com sucesso")
      },
      onError: (err) => {
        console.error(err)
        error("Erro ao criar produto")
      }
    })
  }, [createProduct, error, success])

  const inputStyle = useCallback((hasError: boolean) => {
    let style = `block w-full p-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none`

    if (hasError) return style + ` border-red-500`
    return style + ` border-gray-300`
  }, [])

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-pink-500 font-bold">Cadastrar Produto</h1>
      <Link
        href="/dashboard/produtos/listar"
        className="px-7 py-3 bg-pink-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-pink-700 hover:shadow-lg focus:bg-pink-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out"
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
            <label htmlFor="price">Preço</label>
            <input
              type="text"
              id="price"
              {...register("price", {
                required: true,
                onChange: (e) => {
                  e.target.value = toCurrency(e.target.value)
                }
              })}
              className={inputStyle(!!errors.price)}
            />
          </div>
          <div className="flex flex-col">
            <button
              className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  </DashboardLayout>
}

export default CadastrarProdutos