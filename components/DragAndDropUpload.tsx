"use client";
import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";

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
        // upload logic handled by parent
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
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="w-full py-2">
      <div
        {...getRootProps()}
        className={`group flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? "border-violet-500/40 bg-violet-500/5 shadow-xl shadow-violet-500/5"
            : "border-white/8 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/15"
        }`}
      >
        <input {...getInputProps()} className="w-full" />
        <UploadCloud
          className={`w-8 h-8 mb-3 transition-all duration-300 ${
            isDragActive
              ? "text-violet-400 scale-110"
              : "text-neutral-600 group-hover:text-neutral-400"
          }`}
        />
        <p className="text-sm text-neutral-500 pb-3 font-light">
          {isDragActive
            ? "Drop your PDF here…"
            : "Drag & drop your resume here, or click to browse"}
        </p>
        <span className="text-[10px] text-neutral-700 font-medium uppercase tracking-widest pointer-events-none">
          PDF · Max 5MB
        </span>
      </div>

      {uploadError && (
        <div className="text-red-400/90 mt-3 p-3 bg-red-500/5 border border-red-500/12 rounded-xl text-xs whitespace-pre-line font-light">
          {uploadError}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between bg-white/[0.02] border border-white/6 p-3.5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-violet-500/10 rounded-lg flex items-center justify-center ring-1 ring-violet-500/15">
                    <FileText className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">
                      {file.name}
                    </span>
                    <span className="text-[11px] text-neutral-600">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/8 border border-emerald-500/15 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  Ready
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
