import React, { useState, useEffect } from "react";
import GetAllPubUseCase from "@/application/usecases/pubUseCase/GetAllPubUseCase";
import { Grid, GridContainer } from "../styles/index.style";
import RecipeReviewCard from "@/components/CustomCard";
import PubRepo from "@/infraestructure/implementation/httpRequest/axios/PubRepo";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Home() {
  const [pubs, setPubs] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const userId = useSelector((state) => state.user._id);

  const pubRepo = new PubRepo();
  const getAllOrderUseCase = new GetAllPubUseCase(pubRepo);

  const fetchPub = async () => {
    try {
      const pubData = await getAllOrderUseCase.run();
      setPubs(pubData.pubs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
          <h1>Publicaciones de todos los usuarios</h1>
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
              />
            ))}
          </Grid>
        )}
      </GridContainer>
    </>
  );
}
