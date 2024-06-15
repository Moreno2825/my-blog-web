import CreatePubUseCase from "@/application/usecases/pubUseCase/CreatePubUseCase";
import GetOnePubUseCase from "@/application/usecases/pubUseCase/GetOnePubUseCase";
import GetOneUserUseCase from "@/application/usecases/pubUseCase/GetOneUserUseCase";
import UpdatePubUseCase from "@/application/usecases/pubUseCase/UpdatePubUseCase";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Pub from "@/domain/entities/pub";
import PubRepo from "@/infraestructure/implementation/httpRequest/axios/PubRepo";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function FormPage() {
  const router = useRouter();
  const param = useParams();
  const userId = useSelector((state) => state.user._id);
  const fileInputRef = useRef(null);
  const [pubs, setPubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pubRepo = new PubRepo();
  const getOne = new GetOneUserUseCase(pubRepo);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data) => {
    const file = fileInputRef.current.files[0];
    const pub = new Pub(
      param.id || null,
      userId.toString(),
      data.title,
      data.content,
      file,
      []
    );

    const pubRepo = new PubRepo();
    const createPubUseCase = new CreatePubUseCase(pubRepo);
    const updatePubUseCase = new UpdatePubUseCase(pubRepo);
    try {
      if (!param.id) {
        await createPubUseCase.run(pub);
        router.push("/");
        router.refresh();
      } else {
        await updatePubUseCase.run(param.id, pub);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPub = async () => {
    if (!param.id) return;
    try {
      const pubData = await getOne.run(param.id);
      setPubs(pubData.pubs);
      setValue("title", pubData.title);
      setValue("content", pubData.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPub();
  }, [param.id]);

  const exitPage = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 7rem/* 112px */)",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          width: "500px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>{!param.id ? "Crear publicación" : "Editar publicación"}</h1>
        </header>
        <CustomInput
          label="Titulo: "
          name="title"
          control={control}
          fullWidth
          labelColor
          defaultValue={pubs?.title}
        />
        <CustomInput
          label="Contenido: "
          name="content"
          control={control}
          fullWidth
          labelColor
        />
        <input type="file" name="image" ref={fileInputRef} />

        <div style={{ paddingTop: "20px", display: "flex", gap: "10px" }}>
          <CustomButton
            text="Publicar"
            type="submit"
            customDesign={{
              color: "black",
              backgroundColor: "green",
              hoverBackgroundColor: "darkgreen",
            }}
          />
          <CustomButton
            text="Salir"
            type="button"
            onClick={exitPage}
            customDesign={{
              color: "black",
              backgroundColor: "red",
              hoverBackgroundColor: "darkred",
            }}
          />
        </div>
      </form>
    </div>
  );
}
export default FormPage;
