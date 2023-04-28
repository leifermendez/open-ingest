import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/dist/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib";

const DIR = `${process.cwd()}/store`

const runLocal = async (docs: Document<Record<string, any>>[]) => {
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  await vectorStore.save(DIR);
};

export { runLocal };
