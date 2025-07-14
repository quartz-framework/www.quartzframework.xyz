'use client'

import { Fragment, Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { Logomark } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  )
}

function CloseOnNavigation({ close }: { close: () => void }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    close()
  }, [pathname, searchParams, close])

  return null
}

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const close = useCallback(() => setIsOpen(false), [])

  const onLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget
    if (
      link.pathname + link.search + link.hash ===
      window.location.pathname + window.location.search + window.location.hash
    ) {
      close()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative z-50 block lg:hidden"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-6 w-6 stroke-slate-500 dark:stroke-slate-400" />
      </button>

      <Suspense fallback={null}>
        <CloseOnNavigation close={close} />
      </Suspense>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto lg:hidden"
          onClose={close}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300 ease-in-out"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-200 ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed left-0 top-0 z-50 h-full w-[80vw] max-w-xs bg-white dark:bg-slate-900 shadow-xl px-4 pt-5 pb-10 sm:px-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Link href="/" aria-label="Home page">
                  <Logomark className="h-8 w-8 scale-y-[-1]" />
                </Link>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close navigation"
                >
                  <CloseIcon className="h-6 w-6 stroke-slate-500 dark:stroke-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto
  scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent dark:scrollbar-thumb-slate-600 dark:scrollbar-track-slate-800">
                <Navigation className="px-1" onLinkClick={onLinkClick} />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}