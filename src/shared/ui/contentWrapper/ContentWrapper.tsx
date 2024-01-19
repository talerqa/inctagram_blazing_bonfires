import s from './ContentWrapper.module.scss'

export const ContentWrapper = ({ children, className }: any) => {
  return <div className={`${s.contentWrapper} + ${className}`}>{children}</div>
}
