
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.escuelajs.co/graphql",
  documents: "src/app/graphql/**/*.graphql",
  generates: {
    "src/app/graphql/generated.ts": {
      plugins: ['typescript', 'typescript-operations', "typescript-apollo-angular"]
    },
  }
};

export default config;
