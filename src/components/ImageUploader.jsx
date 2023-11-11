import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BASE_URL } from "../utils/URL";
import "./ImageUploader.scss";

// 이 함수에 이미지 URL을 만들어야함
const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      //imgURL 로 전달 하기 !
      reader.onload = () => {
        const imageUrl = reader.result;
        //console.log(file); 파일
        //console.log(imageUrl); 문자열
        setImage(imageUrl);
        onImageUpload(file); // 실제 파일 객체를 전달

        const formData = new FormData();
        formData.append("image", file);

        const data = {
          context: "오늘은 겁나 피곤한 하루였다!!!!!!",
          whether: "SUNNY",
        };

        console.log(formData);

        // 이미지를 FormData 의 형식으로 보낸다 이때 imageURL을 가져오면된다 response로
        axios
          .post(`${BASE_URL}`, formData)
          .then((response) => {
            console.log("서버 응답:", response.data);
          })
          .catch((error) => {
            console.error("서버 요청 중 오류 발생:", error);
          });
      };

      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzoneStyle">
        <input {...getInputProps()} />
        {image ? (
          <img className="imageStyle" src={image} alt="Uploaded" />
        ) : (
          <p>이미지 등록</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
