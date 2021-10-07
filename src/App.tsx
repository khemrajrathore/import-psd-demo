import Navbar from "./components/Navbar";
import Editor, { useHandlers } from "./sdk";
import { FileUploader } from "baseui/file-uploader";
import {
  getArtboardContent,
  getArtBoards,
  getDesignInfoStatus,
  uploadFile,
} from "./service";
import { parseDesign } from "./parser";
import { useState } from "react";

function App() {
  const [isUploading, setIsUploading] = useState(false);

  const handlers = useHandlers();
  const importDesign = async (file: File) => {
    let designStatus = "pending";

    const design = await uploadFile(file);
    const interval = setInterval(async () => {
      if (designStatus !== "done") {
        designStatus = await getDesignInfoStatus(design.id);
      } else {
        clearInterval(interval);
        console.log("hh");
        const artBoards = await getArtBoards(design.id);
        const artBoardContent = await getArtboardContent(
          design.id,
          artBoards[0].id
        );
        const parsed = parseDesign(artBoardContent);
        if (handlers) {
          handlers.templateHandler.importTemplate(parsed);
          setIsUploading(false);
        }
      }
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Navbar />
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ width: "420px" }}>
          <div
            style={{
              width: 320,
              margin: "2rem auto",
            }}
          >
            <FileUploader
              onDrop={(acceptedFiles) => {
                importDesign(acceptedFiles[0]);
                setIsUploading(true);
              }}
              progressMessage={isUploading ? `Uploading... hang tight.` : ""}
            />
          </div>
        </div>
        <div></div>
        <Editor />
      </div>
    </div>
  );
}

export default App;
