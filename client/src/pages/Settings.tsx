import axios from "axios";
import React, { useEffect, useState } from "react";
import { IUsers } from "../interfaces/i-users";
import { growl } from "../utils/growl";
import customFetch from "../utils/customFetch";

const Settings: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await customFetch.get("/users");

      const result = response.data;

      if (result.success) {
        setUsers(result.data);
        console.log("user fetch response:", users);
        growl(result.message, "success");
      } else {
        growl(result.message, "error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", "7232bac4-74d5-4356-b229-aa2ede772931");

    try {
      setUploading(true);
      const res = await customFetch.post("/users/image_upload", formData);
      alert("Image uploaded: " + res.data.imageUrl);
      setPreview("");
      getUsers();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (users.length === 0) {
    return;
  }

  return (
    <>
      <h1>Profile</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" width="150" />}
        <button
          className="btn btn-primary"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <h5>List</h5>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h6>{user.name}</h6>
            <img src={user.profileImage} alt={user.name} width="150" />
            <p>{user.role}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Settings;
