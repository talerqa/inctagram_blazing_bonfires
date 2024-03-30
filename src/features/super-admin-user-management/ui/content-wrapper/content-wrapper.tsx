import s from './content-wrapper.module.scss'

export const ContentWrapper = ({ children, className }: any) => {
  return <div className={`${s.contentWrapper} + ${className}`}>{children}</div>
}
