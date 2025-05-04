import React from "react";

type FileType = "pdf" | "image" | "word" | "other";

interface FileViewerProps {
  fileUrl: string;
}

const getFileType = (url: string): FileType => {

console.log("url", url);
  const extension = url.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return "pdf";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return "image";
    case "doc":
    case "docx":
      return "word";
    default:
      return "other";
  }
};

const FileViewer: React.FC<FileViewerProps> = ({ fileUrl }) => {

  if (fileUrl) {
    // const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const docExtensions = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"];
  
    const extension = fileUrl.split(".").pop()?.toLowerCase();
  
    if (extension && docExtensions.includes(extension)) {
      const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
      window.open(viewerUrl, "_blank");
    } else {
      window.open(fileUrl, "_blank"); // for images or unknown types
    }
  }
  const fileType = getFileType(fileUrl);

  return (
    <>
        <div style={{ marginTop: "20px" }}>
          <div style={{ marginTop: "10px" }}>
            {fileType === "image" && (
              <img
                src={fileUrl}
                alt="Image"
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              />
            )}

            {fileType === "pdf" && (
              <iframe
                src={fileUrl}
                width="100%"
                height="600px"
                title="PDF Viewer"
              />
            )}

            {fileType === "word" && (
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  fileUrl
                )}&embedded=true`}
                width="100%"
                height="600px"
                title="Word Viewer"
              />
            )}

            {fileType === "other" && (
              <p>Cannot preview this file type. <a href={fileUrl} target="_blank" rel="noopener noreferrer">Open in new tab</a></p>
            )}
          </div>
        </div>
    </>
  );
};

export default FileViewer;
