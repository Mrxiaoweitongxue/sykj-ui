import { resolve } from 'node:path'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'


export const rootDir = resolve(fileURLToPath(import.meta.url), '../..')

export const componentsDir = resolve(rootDir, 'components')

export const components = readdirSync(componentsDir).filter(f => {
  const path = resolve(componentsDir, f)

  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/index.ts`)
})

// type PrettierConfig = {
//   plugins: string[];
//   printWidth: number;
//   arrowParens: "avoid";
//   bracketSpacing: true;
//   endOfLine: "lf";
//   bracketSameLine: false;
//   quoteProps: "as-needed";
//   semi: false;
//   singleQuote: true;
//   tabWidth: number;
//   trailingComma: "none";
//   useTabs: false;
//   vueIndentScriptAndStyle: false;
//   jsxSingleQuote: true;
//   packageSortOrder: string[];
//   overrides: {
//     files: string;
//     options: {
//       embeddedLanguageFormatting: "off";
//     };
//   }[];
// }

export const prettierConfig = {
  plugins: ["react"],
  printWidth: 100,
  arrowParens: undefined,
  bracketSpacing: true,
  endOfLine: undefined,
  bracketSameLine: false,
  quoteProps: undefined,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: undefined,
  useTabs: false,
  vueIndentScriptAndStyle: false,
  jsxSingleQuote: true,
  packageSortOrder: ["sykj-ui", "common", "packages"],
  overrides: [
    {
      files: "*.md",
      options: {
        embeddedLanguageFormatting: "off"
      }
    }
  ]
}