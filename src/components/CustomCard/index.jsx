import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Create";
import { useRouter } from "next/router";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  user,
  title,
  content,
  comment,
  image,
  id,
  expanded,
  onExpandClick,
  isMyPub = false,
}) {
  const router = useRouter();
  const handleExpandClick = () => {
    onExpandClick(id);
  };

  const handleNavigation = () => {
    router.push(`/pubs/${id}/page`);
  };

  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: "#d1d9e6", borderRadius: "10px" }}
    >
      <CardHeader
        sx={{ color: "#ffffff", backgroundColor: "#455e84" }}
        avatar={
          <Avatar sx={{ bgcolor: "#1a202c" }} aria-label="recipe">
            {user.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{ color: "#ffffff" }}>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader="September 14, 2016"
        subheaderTypographyProps={{ sx: { color: "#ffffff" } }}
      />
      <CardMedia
        component="img"
        height="200"
        width="100"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isMyPub && (
          <IconButton aria-label="add to favorites" onClick={handleNavigation}>
            <FavoriteIcon />
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph color={"white"}>
            Comment:
          </Typography>
          <Typography paragraph>{comment}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
