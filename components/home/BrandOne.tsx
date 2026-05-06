import Image from 'next/image';

const brands = [
  { src: '/assets/images/brand/brand-1-1.png', alt: 'Brand partner 1' },
  { src: '/assets/images/brand/brand-1-2.png', alt: 'Brand partner 2' },
  { src: '/assets/images/brand/brand-1-3.png', alt: 'Brand partner 3' },
  { src: '/assets/images/brand/brand-1-4.png', alt: 'Brand partner 4' },
  { src: '/assets/images/brand/brand-1-5.png', alt: 'Brand partner 5' },
];

export default function BrandOne() {
  return (
    <section className="brand-one">
      <div className="container">
        <div className="brand-one__inner">
          <div className="brand-one__carousel owl-carousel owl-theme">
            {brands.map((brand) => (
              <div className="brand-one__item" key={brand.src}>
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={160}
                  height={60}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
