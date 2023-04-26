import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import './style.scss';

export default function ImageUploader() {
  const [files, setFiles] = useState([]);
  const { watch, setValue } = useFormContext();
  const images = watch('images');
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: true,
    maxSize: 3072000,
    onDrop: acceptedFiles => {
      setFiles(prevFiles => [
        ...prevFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);

      setValue('images', [...images, ...acceptedFiles]);
    },
  });

  const thumbs = files.map(file => (
    <div className="thumb" key={file.name}>
      <div className="thumb-inner">
        <img
          src={file.preview}
          className="img"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <div className="image-uploader">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <span className="icon">📂</span>
        <p>عکسهای مورد نظر را در اینجا کشیده و رها کنید</p>
        <p>و یا برای انتخاب آنها اینجا کلیک کنید</p>
      </div>
      {thumbs && thumbs.length > 0 && (
        <div>
          <p className="preview-title">تصاویر آپلود شده:</p>
          <aside className="thumbs-container">{thumbs}</aside>
        </div>
      )}
    </div>
  );
}
