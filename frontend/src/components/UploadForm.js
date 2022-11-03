import React, { useEffect, useRef, useState } from "react";
import { useDb } from "../contexts/DatabaseContext";
import { useNavigate } from "react-router-dom";
import { Fab, Button, Input, TextField, IconButton, FormLabel } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import { PhotoCamera } from "@mui/icons-material";
import "../css/UploadForm.css"
import FeedPost from "./FeedPost";

export default function UploadForm() {
  const { uploadArtImage, updateArtData, userInfo } = useDb();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    image: null
  });

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isFormValid()) {
      setLoading(false);
      return;
    }

    const newArtURL = await uploadArtImage(inputs.image);

    const newArt = {
      author: userInfo.username,
      description: inputs.description,
      likes: [],
      price: inputs.price,
      title: inputs.title,
      url: newArtURL,
    };

    await updateArtData(newArt);
    setLoading(false);

    navigate("/profile");
  }

  function isFormValid() {
    for (var k in Object.keys(inputs)) {
      if (!inputs[Object.keys(inputs)[k]]) {
        setError("Some fields are empty.");
        return false;
      }
    }
    if (isNaN(inputs.price)) {
      setError("Price must be a number");
      return false;
    }
    return true;
  }

  function handleDisplayName(fullName) {
    if (!fullName) return;
    const splitName = fullName.split(" ")
    try {
      return splitName[0] + " " + splitName[1][0] + "."
    } catch (e) {
      return fullName;
    }
    
  }

  function uploadFormContent() {

    return <div id="form-wrapper">
      <FormLabel>
        Title:
        <TextField
          variant="outlined"
          value={inputs.title}
          id="artwork-title"
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          placeholder="Forever Peace" />
      </FormLabel>
      <FormLabel>
        Description:
        <TextField
          variant="outlined"
          id="artwork-desc"
          multiline
          placeholder="Lucious Greens and Blues in the Jungle of the Clouds"
          value={inputs.description}
          onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
        />
      </FormLabel>
      <FormLabel>
        Price:
        <TextField
          placeholder="250"
          variant="outlined"
          id="artwork-price"
          value={inputs.price}
          onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          error={isNaN(inputs.price)}
          helperText="Price must be a number."
          startadornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormLabel>
      <FormLabel>
        Image:
        <input
          style={{ display: "none" }}
          id="upload-image"
          name="upload-image"
          type="file"
          accept="image/*"
          onChange={(e) => setInputs({ ...inputs, image: e.target.files[0] })}
        />
        <Fab color="primary" size="small" component="span" aria-label="add">
          <PhotoCamera />
        </Fab>
      </FormLabel>
      <div id="button-div">
        <Button
          id="submit-button"
          variant="contained"
          disabled={loading}
          color="primary"
          onClick={handleSubmit}
          size="medium"
          sx={{ display: 'none' }}
        >
          Post
        </Button>
      </div>

      {error && <div>{error}</div>}
    </div>
  }

  return (
    <div id="UploadForm">
      <div id="left-rect">
        <FeedPost 
        author={handleDisplayName(userInfo.displayName)} 
        title={inputs.title} 
        authorProfilePic={userInfo.photoURL}
        description={inputs.description}
        image={inputs.image ? URL.createObjectURL(inputs.image) : undefined}/>
      </div>
      <div id="right-rect">
        {uploadFormContent()}
      </div>
      {/* <div id="form-title">Upload artwork</div> */}

    </div>
  );
}
