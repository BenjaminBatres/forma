
interface IProps {
    width?: number | string
    height?: number | string
    marginBottom?: number | string
    marginLeft?: number | string
    borderRadius?: number | string
    marginTop?: number | string
    boxShadow?: string
}

export default function SkeletonBox({ width, height, marginBottom, marginLeft, borderRadius, marginTop, boxShadow }:IProps) {
  return <div className="skeleton-box" style={{ width, height, marginBottom, marginLeft, borderRadius, marginTop, boxShadow }}></div>
}
