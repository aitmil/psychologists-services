import React, { useState } from 'react';
import { useField } from 'formik';
import Icon from '@/ui/icon';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
}) => {
  const [field, meta] = useField(name);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full mb-[18px]">
      <div className="relative w-full">
        <input
          {...field}
          id={name}
          type={type === 'password' && !passwordVisible ? 'password' : 'text'}
          placeholder=" "
          className={`peer w-full px-[18px] py-4 border rounded-xl text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
            meta.touched && meta.error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-border-color'
          }`}
        />

        <label
          htmlFor={name}
          className="absolute left-4 top-[-10px] text-black text-[16px] leading-[125%] bg-white px-1 transition-all transform peer-placeholder-shown:top-[18px] peer-placeholder-shown:left-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:translate-y-0 peer-focus:top-[-10px] peer-focus:translate-y-0 peer-focus:bg-white peer-focus:px-1"
        >
          {label}
        </label>

        {type === 'password' && (
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <Icon
                name="icon-eye-off"
                className="w-5 h-5 stroke-0 stroke-black fill-white"
              ></Icon>
            ) : (
              <Icon
                name="icon-eye"
                className="w-5 h-5 stroke-0 stroke-black fill-white"
              ></Icon>
            )}
          </div>
        )}
      </div>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default InputField;
