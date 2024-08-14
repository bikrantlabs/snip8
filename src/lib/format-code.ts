import * as parserBabel from "prettier/parser-babel"
import * as parserTypescript from "prettier/parser-typescript"
import * as prettierPluginEstree from "prettier/plugins/estree.js"
import * as prettierPluginTypescript from "prettier/plugins/typescript.js"
import * as prettier from "prettier/standalone"

interface FormatCodeReturnType {
  success: boolean
  formattedCode: string | null
  errorMessage?: string
}
export const formatCode = async (
  code: string
): Promise<FormatCodeReturnType> => {
  try {
    const formattedCode = await prettier.format(code, {
      // TODO: Load parsers dynamically according to user's language selection
      parser: "babel-ts",
      plugins: [
        parserBabel,
        parserTypescript,
        prettierPluginEstree,
        prettierPluginTypescript,
      ],
      endOfLine: "auto",
    })
    return { success: true, formattedCode }
  } catch (error) {
    const e = error as unknown as Error
    return {
      success: false,
      formattedCode: null,
      errorMessage: e.message,
    }
  }
}
