import {ReactNode} from "react";
import PdfIcon from "@/assets/pdf.svg?react";
import WordIcon from "@/assets/word.svg?react";
import ExcelIcon from "@/assets/excel.svg?react";
import ImgIcon from "@/assets/img.svg?react";

type IconMapping = {
  [key: string]: ReactNode;
};

const getFileIcon = (filename: string): ReactNode => {

  const extension = filename.split('.').pop()?.toLowerCase() || '';

  const iconMapping: IconMapping = {
    // Images
    'jpg': <ImgIcon />,
    'jpeg': <ImgIcon />,
    'png': <ImgIcon />,
    'gif': <ImgIcon />,
    'svg': <ImgIcon />,
    'webp': <ImgIcon />,

    // Documents
    'pdf': <PdfIcon />,
    'doc': <WordIcon />,
    'docx': <WordIcon />,
    // 'txt': FileText,
    // 'rtf': FileText,

    // Spreadsheets
    'xls': <ExcelIcon />,
    'xlsx': <ExcelIcon />,
    'csv': <ExcelIcon />,

    // Video
    // 'mp4': FileVideo,
    // 'mov': FileVideo,
    // 'avi': FileVideo,
    // 'webm': FileVideo,

    // Audio
    // 'mp3': FileAudio,
    // 'wav': FileAudio,
    // 'ogg': FileAudio,

    // Code
    // 'js': FileCode,
    // 'jsx': FileCode,
    // 'ts': FileCode,
    // 'tsx': FileCode,
    // 'html': FileCode,
    // 'css': FileCode,
    // 'json': FileCode,

    // Archives
    // 'zip': FileZip,
    // 'rar': FileZip,
    // '7z': FileZip,
    // 'tar': FileZip,
    // 'gz': FileZip
  };
  
  return iconMapping[extension];
};

export default getFileIcon;