import { Avatar, Box, ButtonBase, Typography } from "@mui/material";

interface storyProps {
  id: string,
  src : string,
  alt : string,
  title : string,
  onClick: () => void;
}

const avatarStyles = {
  height:"70px", 
  width: "70px", 
  border: "1px solid rgba(0,0,0,0.3)", 
  objectFit: "cover"
}

const Story = ({id, onClick, src, alt, title} : storyProps) => {
  return (
      <Box id={id} sx={{display: "flex", flexDirection: "column"}}>
        <ButtonBase onClick={onClick} sx={{ borderRadius: "100%"}}>
          <Avatar sx={avatarStyles} src={src} alt={alt} />
        </ButtonBase>
        <Typography variant="caption" sx={{textAlign: "center"}}>{title}</Typography>
      </Box>
  );
}

export default Story;

