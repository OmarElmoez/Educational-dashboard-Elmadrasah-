import React, { useState, useRef } from 'react';
import { FieldValues, UseFormRegister , Path} from 'react-hook-form';
// import SignatureCanvas from 'react-signature-canvas';

const RichTextEditor = <T extends FieldValues>({ register, name }: { register: UseFormRegister<T>; name: Path<T>;}) => {
    const [editorContent, setEditorContent] = useState<string>('');
    const [attachments, setAttachments] = useState<File[]>([]);
    const [penMode, setPenMode] = useState(false);
  
    const editorRef = useRef<HTMLDivElement>(null);
    const signatureCanvasRef = useRef<any>(null);
  
    // Handle rich text editor changes
    const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
      setEditorContent((e.target as HTMLDivElement).innerHTML);
    };
  
    // Apply formatting to selected text
    const applyFormatting = (command: string) => {
        document.execCommand(command, false, undefined); 
      };
      
  
    // Handle file uploads
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []) as File[];
      setAttachments([...attachments, ...files]);
    };
  
    // Handle saving pen drawings
    const handleSaveDrawing = () => {
      const drawingDataUrl = signatureCanvasRef.current.toDataURL();
      setEditorContent((prev) => prev + `<img src="${drawingDataUrl}" alt="drawing"/>`);
      signatureCanvasRef.current.clear();
    };
  
    // Clear pen drawing canvas
    const handleClearDrawing = () => {
      signatureCanvasRef.current.clear();
    };
  
    return (
      <div>
        <label>Terms and Conditions</label>
  
        <div>
          {!penMode ? (
            <>
              {/* Toolbar for formatting */}
              <div>
                <button type="button"style={{margin: "1rem"}}   onClick={() => applyFormatting('bold')}>Bold</button>
                <button type="button"style={{margin: "1rem"}}  onClick={() => applyFormatting('italic')}>Italic</button>
                <button type="button"style={{margin: "1rem"}}  onClick={() => applyFormatting('underline')}>Underline</button>
                <button type="button"style={{margin: "1rem"}}  onClick={() => applyFormatting('insertOrderedList')}>OL</button>
                <button type="button" style={{margin: "1rem"}} onClick={() => applyFormatting('insertUnorderedList')}>UL</button>
              </div>
  
              {/* Content Editable Rich Text Editor */}
              <div
                ref={editorRef}
                contentEditable
                dangerouslySetInnerHTML={{ __html: editorContent }}
                onInput={handleEditorInput}
                style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', marginBottom: '10px' }}
              />
            </>
          ) : (
            <>
              {/* Pen Drawing Mode
              <SignatureCanvas
                ref={signatureCanvasRef}
                canvasProps={{ className: 'signatureCanvas', width: 500, height: 200 }}
                penColor="black"
              />
              <div>
                <button type="button" onClick={handleSaveDrawing}>Save Drawing</button>
                <button type="button" onClick={handleClearDrawing}>Clear</button>
              </div> */}
            </>
          )}
  
          {/* Toggle between Pen and Text Mode */}
          <button type="button" onClick={() => setPenMode(!penMode)}>
            {penMode ? 'Switch to Text Editor' : 'Switch to Pen'}
          </button>
        </div>
  
        {/* File Uploads */}
        <div>
          <label>Upload Attachments:</label>
          <input type="file" multiple onChange={handleFileChange} />
          <div>
            {attachments.map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </div>
        </div>
  
        {/* Hidden input to store the combined editor content */}
        <input
          type="hidden"
          {...register(name)}
          value={JSON.stringify({
            content: editorContent || '',
            attachments,
          })}
        />
      </div>
    );
  };
  
  export default RichTextEditor;