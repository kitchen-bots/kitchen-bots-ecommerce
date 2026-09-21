import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

function ImageWithFallback({ src, alt, className = '' }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`flex h-full w-full items-center justify-center bg-[#F8FAFC] p-4 text-center text-sm text-[#64748B] ${className}`}>Image unavailable</div>;
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

export default function ProductImage(props: ProductImageProps) {
  return <ImageWithFallback key={props.src} {...props} />;
}
