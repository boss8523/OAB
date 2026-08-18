import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Aspect = 'video' | 'photo' | 'square' | 'wide' | 'portrait'

const aspectClass: Record<Aspect, string> = {
  video: 'aspect-video',
  photo: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
  portrait: 'aspect-[3/4]',
}

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  aspect?: Aspect
  priority?: boolean
  sizes?: string
  wrapperClassName?: string
}

/**
 * Image pattern with aspect lock, lazy loading, and soft placeholder.
 * Prefer optimized CDN/srcset assets in later milestones.
 */
export function ResponsiveImage({
  src,
  alt,
  aspect = 'photo',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 80vw',
  className,
  wrapperClassName,
  ...props
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface-muted',
        aspectClass[aspect],
        wrapperClassName,
      )}
    >
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...props}
      />
    </div>
  )
}
