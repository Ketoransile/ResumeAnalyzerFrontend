"use client";
import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";
import { Button } from "./ui/button";
// import { uploadFiles } from "@/lib/uploadFiles";

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
        // console.log(acceptedFiles);
        // await uploadFiles(acceptedFiles); // ✅ calling upload function
      } catch (err: unknown) {
        if (err instanceof Error) {
          setUploadError(err.message || "Something went wrong during upload.");
        } else {
          setUploadError("Something went wrong during upload.");
        }
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
      // "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="w-full py-4">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 shadow-sm ${
          isDragActive
            ? "border-indigo-500 bg-indigo-500/5 shadow-xl shadow-indigo-500/5"
            : "border-white/10 bg-neutral-900/25 hover:bg-neutral-900/40 hover:border-white/20 hover:shadow-lg"
        }`}
      >
        <input {...getInputProps()} className="w-full" />
        <UploadCloud className={`w-10 h-10 mb-3 transition-all duration-300 ${isDragActive ? "text-indigo-400 scale-110" : "text-neutral-400"}`} />
        <p className="text-sm text-neutral-400 pb-4 font-medium">
          {isDragActive
            ? "Drop your resume PDF here..."
            : "Drag & drop your resume (PDF) here or click to browse"}
        </p>
        <Button className="bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 rounded-xl px-5 py-2 pointer-events-none text-xs">
          Select Resume File
        </Button>
      </div>

      {uploadError && (
        <div className="text-red-400 mt-4 p-4 bg-red-950/20 border border-red-900/30 rounded-xl text-sm whitespace-pre-line shadow-sm">
          {uploadError}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 animate-fade-in">
          <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-neutral-400">
            Selected Resume
          </h4>
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between bg-neutral-900/40 border border-white/5 p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-semibold">{file.name}</span>
                    <span className="text-xs text-neutral-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded-full border border-emerald-500/20">
                  Ready for Analysis
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
