import React, { useState } from "react";
import Cropper from "react-easy-crop";
import UseCropImage from "../../../hooks/cropImageUrl";

const CropImage = ({ imgUrl, aspectInit, setCroppedImg, setimgSelected }) => {
  const [disable, setDisable] = useState(false);
  const zoomInit = 1;
  const cropInit = { x: 0, y: 0 };
  const onCropChange = (crop) => {
    setCrop(crop);
  };
  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };
  const onCropComplete = (croppedArea, croppedAreaPxc) => {
    setCroppedAreaPx(croppedAreaPxc);
  };
  const onCrop = async () => {
    setDisable(true);
    try {
      const croppedUrl = await UseCropImage(imgUrl, croppedAreaPx);
      setDisable(false);
      setCroppedImg(croppedUrl);
      setimgSelected(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [croppedAreaPx, setCroppedAreaPx] = useState(null);
  return (
    <div className="">
      <div className="fixed bg-black top-0 left-0 right-0 bottom-0 z-10"></div>
      <div className="fixed top-0 left-0 right-0 bottom-[120px] z-20">
        <Cropper
          image={imgUrl}
          zoom={zoom}
          crop={crop}
          aspect={aspectInit.value}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="fixed bottom-0 w-[60%] h-[80px] z-20">
        <div className="text-center">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(e) => {
              onZoomChange(e.target.value);
            }}
            className="w-[50%]"
          />
        </div>
        <div className="text-center">
          <button
            className="bg-red-500 text-white px-3 mr-5 rounded-lg"
            onClick={() => setimgSelected(false)}
          >
            cancel
          </button>
          {disable ? (
            <button className="bg-green-500 text-white px-3 rounded-lg pointer-events-none">
              crop
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-3 rounded-lg"
              onClick={onCrop}
            >
              crop
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropImage;
