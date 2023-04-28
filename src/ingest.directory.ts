import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {
  DirectoryLoader,
  TextLoader,
} from "langchain/document_loaders";
import { runPinecone } from "./utils/pinecone.embeddings";
import { runLocal } from "./utils/local.embeddings";


const VECTOR_STORE = process.env.STORE_MODE ?? "";

const FROM_PATH = `${process.cwd()}/data`;

const run = async () => {
  const directoryLoader = new DirectoryLoader(FROM_PATH, {
    ".ts": (path) => new TextLoader(path),
    ".js": (path) => new TextLoader(path),
    ".txt": (path) => new TextLoader(path),
  });

  const rawDocs = await directoryLoader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);

  if (VECTOR_STORE === "pinecone") await runPinecone(docs);
  if (VECTOR_STORE !== "pinecone") await runLocal(docs);

};

(async () => {
  await run()
  console.log('Datos ingestados')
})();
