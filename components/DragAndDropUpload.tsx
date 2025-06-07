"use client";
import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { uploadFiles } from "@/lib/uploadFiles";

interface UploadProps {
  onUploadComplete?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

const DragAndDropUpload: React.FC<UploadProps> = ({
  onUploadComplete,
  maxFiles = 1,
  maxSize = 5242880,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      setUploadError(null);
      if (onUploadComplete) {
        onUploadComplete(acceptedFiles);
      }
      try {
        console.log(acceptedFiles);
        // await uploadFiles(acceptedFiles); // ✅ calling upload function
      } catch (err: any) {
        setUploadError(err.message || "Something went wrong during upload.");
      }
    },
    [onUploadComplete]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const errors = fileRejections.map(
      (rejection) => `${rejection.file.name}: ${rejection.errors[0].message}`
    );
    setUploadError(errors.join("\n"));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxFiles,
    maxSize,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="max-w-xl  py-8 px-4">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 shadow-sm ${
          isDragActive
            ? "border-green-400 bg-blue-100"
            : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 text-blue-500 mb-3" />
        <p className="text-gray-600 pb-4">
          {isDragActive
            ? "Drop the files here"
            : "Drag & drop files here or click to browse"}
        </p>
        {/* <p className="text-sm text-gray-400 mt-1">
          JPEG, PNG, GIF, PDF – up to 5MB
        </p> */}
        <Button className="">Upload Your Resume</Button>
      </div>

      {uploadError && (
        <div className="text-red-600 mt-4 p-4 bg-red-100 rounded-md shadow-sm whitespace-pre-line">
          {uploadError}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-lg mb-3 text-white">
            Selected Files
          </h4>
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-800 text-sm">{file.name}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragAndDropUpload;
