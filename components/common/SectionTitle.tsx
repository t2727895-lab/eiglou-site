interface SectionTitleProps {
  tagline: string
  title: string
  highlight?: string
  centered?: boolean
}

export default function SectionTitle({
  tagline,
  title,
  highlight,
  centered = true,
}: SectionTitleProps) {
  return (
    <div className={`section-title ${centered ? 'text-center' : 'text-left'} mb-12`}>
      <div className="section-title__tagline-box">
        <span className="section-title__tagline">{tagline}</span>
      </div>
      <h2 className="section-title__title">
        {title}
        {highlight && <span className="text-blue-600"> {highlight}</span>}
      </h2>
    </div>
  )
}
