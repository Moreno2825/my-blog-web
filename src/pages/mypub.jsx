
import GetOneUserUseCase from "@/application/usecases/pubUseCase/GetOnePubUseCase";
import CustomButton from "@/components/CustomButton";
import RecipeReviewCard from "@/components/CustomCard";
import PubRepo from "@/infraestructure/implementation/httpRequest/axios/PubRepo";
import { Grid, GridContainer } from "@/styles/index.style";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Mypub() {
  const [pubs, setPubs] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const userId = useSelector((state) => state.user._id);

  const pubRepo = new PubRepo();
  const getAllOrderUseCase = new GetOneUserUseCase(pubRepo);

  const fetchPub = async () => {
    try {
      const pubData = await getAllOrderUseCase.run(userId);
      setPubs(pubData.pubs);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPub();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <GridContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>{userId ? "Publicaciones" : "Iniciar Sesión para ver tus publicaciones"}</h1>
          <div>
            <CustomButton
              text={"Publicar"}
              type="button"
              customDesign={{
                color: "black",
                backgroundColor: "green",
                hoverBackgroundColor: "darkgreen",
              }}
              onClick={() => router.push("/pubs/new/page")}
            />
          </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Grid>
            {pubs.map((pub) => (
              <RecipeReviewCard
                key={pub._id}
                id={pub._id}
                user={pub.user}
                title={pub.title}
                content={pub.content}
                comment={pub.comment}
                image={pub.image.secureUrl}
                expanded={expandedId === pub._id}
                onExpandClick={handleExpandClick}
                isMyPub={true}
              />
            ))}
          </Grid>
        )}
      </GridContainer>
    </>
  );
}
