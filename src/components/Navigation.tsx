'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { navigation, NavigationItem } from '@/lib/navigation'

const DEFAULT_OPEN: string[] = []

export function Navigation({
                             className,
                             onLinkClick,
                           }: {
  className?: string
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({})

  useEffect(() => {
    const stored = localStorage.getItem('quartz-open-sections')
    if (stored) {
      setOpenSections(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(openSections).length > 0) {
      localStorage.setItem('quartz-open-sections', JSON.stringify(openSections))
    }
  }, [openSections])

  const toggle = (path: string) => {
    setOpenSections((prev) => ({ ...prev, [path]: !prev[path] }))
  }

  useEffect(() => {
    function findAndOpen(items: NavigationItem[], parentPath = ''): boolean {
      for (const item of items) {
        const path = `${parentPath}/${item.title}`
        if (item.href === pathname) {
          setOpenSections((prev) => ({ ...prev, [path]: true }))
          const ref = itemRefs.current[path]
          if (ref) {
            setTimeout(() => {
              ref.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }, 100)
          }
          return true
        }
        if (item.children && findAndOpen(item.children, path)) {
          setOpenSections((prev) => ({ ...prev, [path]: true }))
          return true
        }
      }
      return false
    }

    findAndOpen(navigation)
  }, [pathname])

  const renderTree = (
    items: NavigationItem[],
    parentPath: string = '',
    level: number = 0
  ): JSX.Element => {
    return (
      <ul
        role="list"
        className={clsx(
          level === 0
            ? 'space-y-6'
            : 'mt-2 pl-4 space-y-2 border-l border-slate-200 dark:border-slate-700'
        )}
      >
        {items.map((item) => {
          const path = `${parentPath}/${item.title}`
          const isOpen = openSections[path] ?? DEFAULT_OPEN.includes(item.title)
          const isActive = item.href === pathname

          const hasChildren = item.children && item.children.length > 0
          const isCollapsible = hasChildren

          return (
            <li key={path} ref={(el) => (itemRefs.current[path] = el)}>
              <div className="flex items-center justify-between pr-4">
                {item.href && !hasChildren && (
                  <Link
                    href={item.href}
                    onClick={onLinkClick}
                    className={clsx(
                      'block w-full pl-3.5',
                      isActive
                        ? 'font-semibold text-sky-500'
                        : 'text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                    )}
                  >
                    {item.title}
                  </Link>
                )}

                {item.href && hasChildren && (
                  <Link
                    href={item.href}
                    onClick={onLinkClick}
                    className={clsx(
                      'relative w-full text-left font-display font-medium text-slate-900 dark:text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                      level > 0 ? 'pl-3.5 pr-6' : 'pr-6'
                    )}
                  >
                    <span>{item.title}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        toggle(path)
                      }}
                      aria-expanded={isOpen}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl leading-none"
                    >
                      {isOpen ? '−' : '+'}
                    </button>
                  </Link>
                )}

                {!item.href && hasChildren && (
                  <button
                    type="button"
                    onClick={() => toggle(path)}
                    aria-expanded={isOpen}
                    className={clsx(
                      'w-full text-left font-display font-medium text-slate-900 dark:text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                      level > 0 ? 'pl-3.5' : ''
                    )}
                  >
                    <span>{item.title}</span>
                    <span className="float-right text-slate-400 dark:text-slate-500 text-xl leading-none">
                    {isOpen ? '−' : '+'}
                  </span>
                  </button>
                )}
              </div>

              {hasChildren && isOpen && renderTree(item.children!, path, level + 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  return <nav className={clsx('text-base lg:text-sm', className)}>{renderTree(navigation)}</nav>
}