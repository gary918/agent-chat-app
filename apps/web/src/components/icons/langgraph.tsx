import Image from 'next/image';
import cymbalIcon from './cymbal_icon.jpg';

export function LangGraphLogoSVG({
  className,
  width,
  height,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src={cymbalIcon}
      alt="Cymbal Icon"
      width={width}
      height={height}
      className={className}
    />
  );
}
