import { RoutersPath } from '../constants/paths'

import defaultIconDeviceDark from '@/shared/assets/icons/devices/darkIcons/anyDevices.svg'
import defaultIconBrowserDark from '@/shared/assets/icons/devices/darkIcons/browser.svg'
import defaultIconDeviceLight from '@/shared/assets/icons/devices/lightIcons/anyDevices.svg'
import defaultIconBrowserLight from '@/shared/assets/icons/devices/lightIcons/browser.svg'

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
const darkSVG = require.context('@/shared/assets/icons/devices/darkIcons', false, /\.svg$/)
const lightSVG = require.context('@/shared/assets/icons/devices/lightIcons', false, /\.svg$/)

const svgDark = requireAll(darkSVG)
const svgLight = requireAll(lightSVG)

interface svgFile {
  default: {
    src: string
    blurWidth: number
    blurHeight: number
    height: number
    width: number
  }
}

export const findPathSVG = (name: string, isCurrent: boolean, theme?: string): string => {
  const findName = (file: svgFile): string => {
    return file.default.src
      .replace(RoutersPath.folderNextStaticMedia, '')
      .split('.')[0]
      .toLocaleLowerCase()
  }
  const findFile = (files: svgFile[]): svgFile => {
    return files.filter((file: svgFile) => {
      return findName(file) === name.toLocaleLowerCase()
    })[0]
  }

  let defaultIcon
  let file

  if (theme) {
    defaultIcon = isCurrent ? defaultIconBrowserLight : defaultIconDeviceLight
    file = findFile(svgDark)
  } else {
    defaultIcon = isCurrent ? defaultIconBrowserDark : defaultIconDeviceDark
    file = findFile(svgLight)
  }

  return file ? file.default.src : defaultIcon
}
