import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from 'langchain/vectorstores';
import {
  DirectoryLoader,
  TextLoader,
} from "langchain/document_loaders";
import { pinecone } from "./utils/pinecone";


const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? '';
const PINECONE_NAME_SPACE = 'CAMBIAR_POR_ESPACIO_DE_TRABAJO';

/**
 * Esto es el directorio del repositorio
 */
const FROM_PATH = `${process.cwd()}/curso-node-api-js-master`;

const run = async () => {
  const directoryLoader = new DirectoryLoader(FROM_PATH, {
    ".ts": (path) => new TextLoader(path),
    ".js": (path) => new TextLoader(path),
  });

  const rawDocs = await directoryLoader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);

  const embeddings = new OpenAIEmbeddings()
  const index = pinecone.Index(PINECONE_INDEX_NAME);

  await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    namespace: PINECONE_NAME_SPACE,
    textKey: 'text',
  });

};

(async () => {
  await run()
  console.log('Datos ingestados')
})();
