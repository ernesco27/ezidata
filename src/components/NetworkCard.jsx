import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

function NetworkCard({ title, image, description, delay }) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setAnimationClass("animate-slideUp");
  }, []);

  return (
    <Card
      className={`${animationClass} max-w-xs`}
      style={{ animationDelay: `${delay}s` }}
    >
      <CardActionArea component={Link} to={`/network/${title}`}>
        <CardMedia
          component="img"
          sx={{ maxHeight: 140 }}
          image={image}
          alt="image of network provider"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export { NetworkCard };
