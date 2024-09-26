import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type optionsType = {
  shortDescription: string
  description: string
  icon: string | StaticImport | any
}

// any used in icon for .svg - requirement NextJs
