// src/lib/registry.tsx

'use client'

import React from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { useServerInsertedHTML } from 'next/navigation'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // THIS IS THE KEY CHANGE:
  // We are moving the `useState` call inside a check to ensure it only runs once.
  // This prevents the sheet from being created twice in development Strict Mode.
  const [styledComponentsStyleSheet] = React.useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    // This is important to avoid a memory leak
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  // This part handles client-side rendering where the sheet is not needed.
  if (typeof window !== 'undefined') {
    return <>{children}</>
  }

  // This part handles the server-side rendering.
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}