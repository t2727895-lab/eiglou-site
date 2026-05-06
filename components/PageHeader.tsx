import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header__bg" style={{ backgroundImage: 'url(/assets/images/backgrounds/page-header-bg.jpg)' }}></div>
      <div className="container">
        <div className="page-header__inner">
          <h3>{title}</h3>
          <div className="thm-breadcrumb__inner">
            <ul className="thm-breadcrumb list-unstyled">
              {breadcrumbs.map((crumb, index) => (
                <li key={index}>
                  {crumb.href ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    crumb.label
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="icon-arrow-angle-pointing-to-right"></span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
