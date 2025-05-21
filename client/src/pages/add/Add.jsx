import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
          [...files].map(async (file) => {
            const url = await upload(file);
            return url;
          })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state, {
      onSuccess: () => {
        navigate("/mygigs");
      },
      onError: (error) => {
        console.log("hna lprob");
        console.error("Submission failed:", error);
      },
    });
  };

  const categoryMap = {
    Design: "Graphics & Design",
    Animation: "Video & Animation",
    Writing: "Writing & Translation",
    AI: "AI Services",
    Marketing: "Digital Marketing",
    Music: "Music & Audio",
    Programming: "Programming & Tech",
    Business: "Business",
    Lifestyle: "Lifestyle",
  };

  return (
      <div className="add">
        <div className="container">
          <h1>Add New Gig</h1>
          <div className="sections">
            <div className="info">
              <label htmlFor="title">Title</label>
              <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="e.g. I will do something I'm really good at"
                  onChange={handleChange}
              />

              <label htmlFor="cat">Category</label>
              <select id="cat" name="cat" onChange={handleChange}>
                {Object.entries(categoryMap).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                ))}
              </select>

              <div className="images">
                <div className="imagesInputs">
                  <label htmlFor="cover">Cover Image</label>
                  <input
                      id="cover"
                      type="file"
                      onChange={(e) => setSingleFile(e.target.files[0])}
                  />

                  <label htmlFor="images">Upload Images</label>
                  <input
                      id="images"
                      type="file"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <button onClick={handleUpload}>
                  {uploading ? "uploading" : "Upload"}
                </button>
              </div>

              <label htmlFor="desc">Description</label>
              <textarea
                  id="desc"
                  name="desc"
                  placeholder="Brief descriptions to introduce your service to customers"
                  cols="0"
                  rows="16"
                  onChange={handleChange}
              ></textarea>

              <button onClick={handleSubmit}>Create</button>
            </div>

            <div className="details">
              <label htmlFor="shortTitle">Service Title</label>
              <input
                  id="shortTitle"
                  type="text"
                  name="shortTitle"
                  placeholder="e.g. One-page web design"
                  onChange={handleChange}
              />

              <label htmlFor="shortDesc">Short Description</label>
              <textarea
                  id="shortDesc"
                  name="shortDesc"
                  placeholder="Short description of your service"
                  cols="30"
                  rows="10"
                  onChange={handleChange}
              ></textarea>

              <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
              <input
                  id="deliveryTime"
                  type="number"
                  name="deliveryTime"
                  onChange={handleChange}
              />

              <label htmlFor="revisionNumber">Revision Number</label>
              <input
                  id="revisionNumber"
                  type="number"
                  name="revisionNumber"
                  onChange={handleChange}
              />

              <label htmlFor="featuresInput">Add Features</label>
              <form className="add" onSubmit={handleFeature}>
                <input id="featuresInput" type="text" placeholder="e.g. page design" />
                <button type="submit">add</button>
              </form>

              <div className="addedFeatures">
                {state?.features?.map((f) => (
                    <div className="item" key={f}>
                      <button
                          onClick={() =>
                              dispatch({ type: "REMOVE_FEATURE", payload: f })
                          }
                      >
                        {f}
                        <span>X</span>
                      </button>
                    </div>
                ))}
              </div>

              <label htmlFor="price">Price</label>
              <input
                  id="price"
                  type="number"
                  name="price"
                  onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Add;
