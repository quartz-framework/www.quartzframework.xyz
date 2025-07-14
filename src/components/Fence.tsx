'use client'

import { Fragment } from 'react'
import { Highlight, Prism, themes } from 'prism-react-renderer'
import { currentTheme } from '@/markdoc/theme'

export function Fence({
  children,
  language,
}: {
  children: string
  language: string
}) {

  (typeof global !== "undefined" ? global : window).Prism = Prism
  require("prismjs/components/prism-java")

  return (
    <Highlight
      code={children.trimEnd()}
      language={language}
      theme={{styles: currentTheme['styles'], plain: {} }}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={className} style={style}>
          <code>
            {tokens.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                {'\n'}
              </Fragment>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
