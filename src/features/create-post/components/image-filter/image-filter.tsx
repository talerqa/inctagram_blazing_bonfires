/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

const WRAPPER_STYLE = {
  position: 'relative',
}

const IMAGE_STYLE = {
  display: 'block',
  visibility: 'hidden',
  width: '100%',
}

const SVG_STYLE = {
  display: 'block',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
}

const SVG_ABSOLUTE_STYLE = {
  left: 0,
  position: 'absolute',
  top: 0,
}

const NONE = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]

const GRAYSCALE = [
  0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0, 0, 0, 1, 0,
]

const SEPIA = [0.3, 0.45, 0.1, 0, 0, 0.2, 0.45, 0.1, 0, 0, 0.1, 0.3, 0.1, 0, 0, 0, 0, 0, 1, 0]

const WARM = [1.2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
const COOL = [0.9, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
const BLACK_AND_WHITE = [
  0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0, 0, 0, 1, 0,
]
const VINTAGE = [0.9, 0.5, 0.4, 0, 0, 0.3, 0.8, 0.2, 0, 0, 0.1, 0.4, 0.9, 0, 0, 0, 0, 0, 1, 0]
const CONTRAST = [2, 0, 0, 0, -0.5, 0, 2, 0, 0, -0.5, 0, 0, 2, 0, -0.5, 0, 0, 0, 1, 0]
const BLUR = [
  0.1, 0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,
  0.1,
]

function omit(object, keysToOmit) {
  const result = {}

  Object.keys(object).forEach(key => {
    if (keysToOmit.indexOf(key) === -1) {
      result[key] = object[key]
    }
  })

  return result
}

const types = {
  DUOTONE: 'duotone',
  INVERT: 'invert',
  GRAYSCALE: 'grayscale',
  SEPIA: 'sepia',
  WARM: 'warm',
  COOL: 'cool',
  BLACK_AND_WHITE: 'black_and_white',
  VINTAGE: 'vintage',
  CONTRAST: 'contrast',
  BLUR: 'blur',
}

function convertToDueTone(color1, color2) {
  return [
    color2[0] / 256 - color1[0] / 256,
    0,
    0,
    0,
    color1[0] / 256,
    color2[1] / 256 - color1[1] / 256,
    0,
    0,
    0,
    color1[1] / 256,
    color2[2] / 256 - color1[2] / 256,
    0,
    0,
    0,
    color1[2] / 256,
    0,
    0,
    0,
    1,
    0,
  ]
}

function ImageFilter({
  image,
  filter,
  preserveAspectRatio,
  className,
  style,
  svgStyle,
  svgProps,
  colorOne,
  colorTwo,
  onChange,
}) {
  const [id] = useState(`${new Date().getTime()}${Math.random()}`.replace('.', ''))
  const [filterMatrix, setFilterMatrix] = useState(NONE)

  useEffect(() => {
    const getMatrix = (props, triggerCallback = false) => {
      let newFilter = props.filter

      if (newFilter === types.GRAYSCALE) {
        newFilter = GRAYSCALE
      } else if (newFilter === types.SEPIA) {
        newFilter = SEPIA
      } else if (newFilter === types.WARM) {
        newFilter = WARM
      } else if (newFilter === types.COOL) {
        newFilter = COOL
      } else if (newFilter === types.BLACK_AND_WHITE) {
        newFilter = BLACK_AND_WHITE
      } else if (newFilter === types.VINTAGE) {
        newFilter = VINTAGE
      } else if (newFilter === types.CONTRAST) {
        newFilter = CONTRAST
      } else if (newFilter === types.BLUR) {
        newFilter = BLUR
      } else if (newFilter === types.DUOTONE) {
        newFilter = convertToDueTone(props.colorOne, props.colorTwo)
      }

      // Создаем <canvas> элемент
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      return newFilter
    }

    const newFilterMatrix = getMatrix({ filter, colorOne, colorTwo }, true)

    setFilterMatrix(newFilterMatrix)
  }, [filter, colorOne, colorTwo])

  const aspectRatio = preserveAspectRatio === 'cover' ? 'xMidYMid slice' : preserveAspectRatio
  const renderImage = preserveAspectRatio === 'none'

  const svgMergedStyle = renderImage
    ? {
        ...SVG_STYLE,
        ...SVG_ABSOLUTE_STYLE,
        ...svgStyle,
      }
    : {
        ...SVG_STYLE,
        ...svgStyle,
      }

  const otherProps = omit(
    {
      image,
      filter,
      preserveAspectRatio,
      className,
      style,
      svgStyle,
      svgProps,
      colorOne,
      colorTwo,
      onChange,
    },
    [
      'image',
      'filter',
      'preserveAspectRatio',
      'className',
      'style',
      'svgStyle',
      'svgProps',
      'colorOne',
      'colorTwo',
    ]
  )

  useEffect(() => {
    // Создаем новый Image элемент для изображения
    const img = new Image()

    img.src = image

    img.onload = () => {
      // Создаем <canvas> элемент
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = img.width
      canvas.height = img.height

      // Рисуем изображение на canvas с примененным фильтром
      ctx.filter = `url(#filter-image-${id})`
      ctx.drawImage(img, 0, 0)

      // Получаем base64 строку изображения с фильтром
      const filteredImageBase64 = canvas.toDataURL('image/png')

      onChange(filteredImageBase64)
    }
  }, [image, filterMatrix])

  return (
    <div
      {...otherProps}
      className={`ImageFilter ${className}`}
      style={{ ...WRAPPER_STYLE, ...style }}
    >
      {renderImage && (
        <img
          alt=""
          aria-hidden={true}
          style={IMAGE_STYLE}
          src={image}
          className="ImageFilter-image"
        />
      )}
      <svg {...svgProps} className="ImageFilter-svg" style={svgMergedStyle}>
        <filter id={`filter-image-${id}`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values={filterMatrix.join(' ')} />
        </filter>
        <image
          filter={`url(#filter-image-${id})`}
          preserveAspectRatio={aspectRatio}
          xlinkHref={image}
          x="0"
          y="0"
          width="100%"
          height="100%"
        />
      </svg>
    </div>
  )
}

ImageFilter.propTypes = {
  image: PropTypes.string.isRequired,
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  // Check https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
  preserveAspectRatio: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  svgStyle: PropTypes.object,
  svgProps: PropTypes.object,
  colorOne: PropTypes.array,
  colorTwo: PropTypes.array,
  onChange: PropTypes.func,
}

ImageFilter.defaultProps = {
  filter: NONE,
  preserveAspectRatio: 'none',
  className: '',
  style: {},
  svgStyle: {},
  svgProps: {},
}

export default ImageFilter
