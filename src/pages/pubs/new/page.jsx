import CreatePubUseCase from "@/application/usecases/pubUseCase/CreatePubUseCase";
import DeletePubUseCase from "@/application/usecases/pubUseCase/DeletePubUseCase";
import GetOneUserUseCase from "@/application/usecases/pubUseCase/GetOneUserUseCase";
import UpdatePubUseCase from "@/application/usecases/pubUseCase/UpdatePubUseCase";
import BasicAlerts from "@/components/CustomAlert";
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
  const [alertMessage, setAlertMessage] = useState(null);

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
      if (param.id) {
        await updatePubUseCase.run(param.id, pub);
        setAlertMessage({
          type: "success",
          message: "Publicación actualizada exitosamente.",
        });
      } else {
        await createPubUseCase.run(pub);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "Error al procesar la publicación.",
      });
    }
  };

  const deletePub = async () => {
    try {
      const deletePubUseCase = new DeletePubUseCase(pubRepo);
      const data = await deletePubUseCase.run(param.id, userId);
      console.log(data);
      router.push("/");
      router.refresh();
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
    if (param && param.id) {
      fetchPub();
    }
  }, [param]);

  const exitPage = () => {
    router.push("/");
  };

  return (
    <div>
      <div
        style={{
          width: "500px",
          padding: "20px",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        {alertMessage && (
          <BasicAlerts
            severity={alertMessage.type}
            message={alertMessage.message}
          />
        )}
      </div>
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
            <h1>
              {!param || !param.id ? "Crear publicación" : "Editar publicación"}
            </h1>
            {param && param.id && (
              <div style={{ display: "flex", paddingTop: "20px" }}>
                <CustomButton
                  text="Eliminar"
                  type="button"
                  onClick={deletePub}
                  customDesign={{
                    color: "black",
                    backgroundColor: "red",
                    hoverBackgroundColor: "darkred",
                  }}
                />
              </div>
            )}
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
    </div>
  );
}
export default FormPage;
