'use client';
import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition = 'end', ...props }, ref) => {
    if (type === 'password' && icon) {
      console.error(
        'Cannot use type="password" with icon. The icon is already used for toggling password visibility. Please remove the icon prop or change the input type.',
      );
      icon = undefined;
    }
    const [inputType, setInputType] = React.useState(type);

    const togglePasswordVisibility = () => {
      setInputType(prevType => (prevType === 'password' ? 'text' : 'password'));
    };

    return (
      <div className="relative min-w-[150px]">
        {type === 'password' && iconPosition === 'start' ? (
          <div
            onClick={togglePasswordVisibility}
            className="absolute select-none inset-y-0 left-3 md:left-6 flex items-center w-4 md:w-6 cursor-pointer"
          >
            {inputType === 'password' ? <EyeOffIcon /> : <EyeIcon />}
          </div>
        ) : (
          icon &&
          iconPosition === 'start' && (
            <div className="absolute select-none inset-y-0 left-3 md:left-6 flex items-center w-4 md:w-6 pointer-events-none">
              {icon}
            </div>
          )
        )}
        <input
          type={inputType}
          className={cn(
            'text-m-p md:text-p leading-[14px] md:leading-[16px] flex min-h-[40px] md:min-h-[65px] w-full p-3 md:px-[23px] md:py-[22px] rounded-[10px] bg-dark border-[1px] border-white placeholder:text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none transition focus-visible:border-blue',
            className,
            iconPosition === 'start' && 'pl-8 md:pl-14',
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && iconPosition === 'end' ? (
          <div
            onClick={togglePasswordVisibility}
            className="absolute select-none inset-y-0 right-3 md:right-6 flex items-center w-4 md:w-6 cursor-pointer justify-end"
          >
            {inputType === 'password' ? <EyeOffIcon /> : <EyeIcon />}
          </div>
        ) : (
          icon &&
          iconPosition === 'end' && (
            <div className="absolute select-none inset-y-0 right-3 md:right-6 flex items-center w-4 md:w-6 pointer-events-none justify-end">
              {icon}
            </div>
          )
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
