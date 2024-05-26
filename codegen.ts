
import type { CodegenConfig } from '@graphql-codegen/cli';
import './loadEnv'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_BACKEND_URI,
  documents: "src/**/*.tsx",
  // watch:true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
    
  },
  ignoreNoDocuments:true
};

export default config;
