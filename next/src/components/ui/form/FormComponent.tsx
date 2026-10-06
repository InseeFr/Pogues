import React from 'react'

type Props = {
  children: React.ReactNode
}

/**
 * Form common component
 */
export default function FormComponent({ children }: Readonly<Props>) {
  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      {children}
    </div>
  )
}
