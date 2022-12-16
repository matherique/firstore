import DashboardLayout from "@components/dashboard-layout";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAlert from "@hooks/useAlerts";
import { useRouter } from "next/router";
import { FaMeteor, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { toCurrency } from "@shared/convert";
import { UpdateProductSchema } from "@shared/validations/product";

type EditProductSchema = Omit<UpdateProductSchema, 'price'> & { price: string }

const EditarProdutos: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors
    },
  } = useForm<EditProductSchema>()

  const { data: product, isSuccess } = trpc.useQuery(["product.get", { id }])
  const { mutate: updateProduct, isLoading } = trpc.useMutation(["product.update"])
  const { success, error } = useAlert()

  useEffect(() => {
    if (!isSuccess) return
    setValue("name", product.name)
    setValue("price", `R$ ${product.price}`)
  }, [product, isSuccess, setValue])

  const onSubmit = useCallback(async (data: EditProductSchema) => {
    updateProduct({
      ...data,
      price: Number(data.price.replace("R$ ", "").replace(/\./g, "").replace(",", ".")),
      id,
    }, {
      onSuccess: () => {
        success("Producto atualizado com sucesso")
      },
      onError: (err) => {
        console.error(err)
        error("Erro ao atualizar produto: " + err.message)
      }
    })
  }, [id, updateProduct, error, success])

  const inputStyle = useCallback((hasError: boolean) => {
    let style = `block w-full p-2 text-md font-normal text-slate-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-slate-700 focus:bg-white focus:border-slate-600 focus:outline-none`

    if (hasError) return style + ` border-red-500`
    return style + ` border-slate-300`
  }, [])

  if (!isSuccess) {
    return <DashboardLayout>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <FaMeteor className="text-5xl animate-spin" />
      </div>
    </DashboardLayout>
  }

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-slate-500 font-bold">Editar produto</h1>
      <Link
        href="/dashboard/produtos/listar"
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
              className="flex items-center justify-center px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              Salvar {isLoading && <FaSpinner className="animate-spin ml-3" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  </DashboardLayout >
}

export default EditarProdutos