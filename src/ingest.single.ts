import * as fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { runPinecone } from "./utils/pinecone.embeddings";
import { runLocal } from "./utils/local.embeddings";

const PATH_FILE = `${process.cwd()}/data/video-subtitulos-node.txt`;
const VECTOR_STORE = process.env.STORE_MODE ?? "";

const run = async () => {
  const text = fs.readFileSync(PATH_FILE, "utf-8");
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  if (VECTOR_STORE === "pinecone") await runPinecone(docs);
  if (VECTOR_STORE !== "pinecone") await runLocal(docs);

};

(async () => {
  await run();
  console.log("Datos ingestados");
})();
