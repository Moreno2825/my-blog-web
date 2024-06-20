import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";
import CommentPubUseCase from "@/application/usecases/pubUseCase/CommentPubUseCase";
import PubRepo from "@/infraestructure/implementation/httpRequest/axios/PubRepo";
import { format } from "date-fns";

export default function RecipeReviewCard({
  user,
  title,
  content,
  comment,
  image,
  id,
  isMyPub = false,
}) {
  const router = useRouter();
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const userId = useSelector((state) => state.user._id);
  const [newTask, setNewTask] = useState({
    comment: "",
  });

  const handleNavigation = () => {
    router.push(`/pubs/${id}/page`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlesubmit = async () => {
    const commentData = {
      pubId: id,
      id_user: userId,
      comment: newTask.comment,
    };
    try {
      const pubRepo = new PubRepo();
      const commentPubUseCase = new CommentPubUseCase(pubRepo);
      await commentPubUseCase.run(commentData);
      setNewTask({ comment: "" });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{ maxWidth: 450, backgroundColor: "#d1d9e6", borderRadius: "10px" }}
    >
      <CardHeader
        sx={{ color: "#ffffff", backgroundColor: "#455e84" }}
        avatar={
          <Avatar sx={{ bgcolor: "#1a202c" }} aria-label="recipe">
            {user.name.charAt(0)}
          </Avatar>
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
        <div style={{ display: "flex", width: "100%" }}>
          <div>
            {isMyPub && (
              <React.Fragment>
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleNavigation}
                >
                  <EditIcon />
                </IconButton>
              </React.Fragment>
            )}
          </div>
          <div style={{ marginLeft: "auto" }}>
            <IconButton aria-label="comment" onClick={handleClickOpen}>
              <CommentIcon />
            </IconButton>
          </div>
        </div>
      </CardActions>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          sx={{ width: "100%" }}
        >
          <DialogTitle id="form-dialog-title">Comentarios</DialogTitle>
          <DialogContent sx={{ width: "500px" }}>
            <List>
              {comment.map((comment) => (
                <ListItem key={comment._id}>
                  <ListItemText
                    primary={comment.id_user.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {comment.comment}
                        </Typography>
                        <div></div>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {format(
                            new Date(comment.createdAt),
                            "dd/MM/yyyy HH:mm:ss"
                          )}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <TextField
              sx={{ borderRadius: "10px", color: "#1a202c" }}
              autoFocus
              margin="dense"
              id="name"
              label="Escribir comentario"
              type="text"
              onChange={(e) => {
                setNewTask({ ...newTask, comment: e.target.value });
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handlesubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Card>
  );
}
