import * as fs from "fs";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from 'langchain/vectorstores';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { pinecone } from "./utils/pinecone";

// Cambiar nombre de espacio de trabajo: ejemplo curso-video-aws o ejemplo curso-repositorio-aws
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? '';
const PINECONE_NAME_SPACE = 'video-cc-node-curso';

const PATH_FILE = `${process.cwd()}/data/video-subtitulos-node.txt`

const run = async () => {
    const text = fs.readFileSync(PATH_FILE, "utf-8");
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = await textSplitter.createDocuments([text]);

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
