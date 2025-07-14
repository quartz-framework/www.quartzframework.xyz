'use client'

import { usePathname } from 'next/navigation'

import { navigation } from '@/lib/navigation'

export function DocsHeader({ title }: { title?: string }) {

  function findSectionTitle(items: typeof navigation, pathname: string, parentTitle?: string): string | undefined {
    for (const item of items) {
      if (item.href === pathname) return parentTitle
      if (item.children) {
        const found = findSectionTitle(item.children, pathname, item.title)
        if (found) return found
      }
    }
    return undefined
  }

  let pathname = usePathname()
  const sectionTitle = findSectionTitle(navigation, pathname)

  if (!title && !sectionTitle) {
    return null
  }

  return (
    <header className="mb-9 space-y-1">
      {sectionTitle && (
        <p className="font-display text-sm font-medium text-sky-500">
          {sectionTitle}
        </p>
      )}
      {title && (
        <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
      )}
    </header>
  )
}
