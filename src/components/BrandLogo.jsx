export default function BrandLogo({ className = 'h-11', alt = 'LightStream Finance' }) {
  return (
    <img
      src="/logo.png"
      alt={alt}
      className={`${className} w-auto object-contain`}
    />
  )
}
