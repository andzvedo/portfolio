import * as React from "react";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ src, alt, className, fallback, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    return (
      <img
        ref={ref}
        src={imgError && fallback ? fallback : src}
        alt={alt}
        className={`rounded-full object-cover ${className || ''}`}
        onError={() => setImgError(true)}
        {...props}
      />
    );
  }
);
Avatar.displayName = "Avatar";
