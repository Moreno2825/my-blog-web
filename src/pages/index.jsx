import { fetchData } from "@/tools/api";
import { Grid, GridCard, GridContainer } from "./index.style";
import RecipeReviewCard from "@/components/CustomCard";

export default function Home({ pubsData }) {
  const pubs = pubsData.pubs;

  return (
    <>
      <GridContainer>
        <Grid>
          {pubs &&
            pubs.map((pub) => (
              <RecipeReviewCard
                key={pub._id}
                user={pub.user}
                title={pub.title}
                content={pub.content}
                comment={pub.comment}
              />
            ))}
        </Grid>
      </GridContainer>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const pubsData = await fetchData("http://localhost:3000/api/pubs/getAll");
    return {
      props: { pubsData },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { pubsData: null },
    };
  }
}
