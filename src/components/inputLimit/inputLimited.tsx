import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import './_inputLimited.scss';
type Props = {
  maxLength: number,
  children: React.ReactNode,
  name: string
}

/**
 * 
 * @param maxLength: Số kí tự tối đa
 * @param children: Component input
 * @param name: Tên của input
 * 
 */
const InputLimited = ({ children, maxLength, name }: Props) => {
  const [show, setShow] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>();
  const { watch, setValue, setError, formState } = useFormContext();

  // Xem giá trị của input dựa vào name
  const watchField = watch(name);

  // Cập nhật số kí tự khi có thay đổi
  useEffect(() => {
    setCount(watchField ? watchField.length : 0);
  }, [watchField]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (inputRef.current?.value && inputRef.current?.value.length >= maxLength) {
      // Allow backspace, delete, tab, escape, enter, and arrow keys
      if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
        return;
      }
      e.preventDefault();
    }
  }

  useEffect(() => {

    if (count > maxLength) {
      // kiểm tra xem đã có lỗi chưa
      if (!formState.errors[name]) {
        setError(name, { type: 'manual', message: `Không được nhập quá ${maxLength} kí tự` })
      }
    }
    return () => {

    };
  }, [count, formState.errors, maxLength, name, setError]);
  const handleFocus = () => {
    setShow(true)
  };

  const handleBlur = () => {
    setShow(false)
  };

  const handleOnChange = () => {
    setValue(name, inputRef.current?.value, { shouldValidate: true, shouldDirty: true });
  }
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ref: inputRef, onKeyDown: handleKeyDown, onChange: handleOnChange, onFocus: handleFocus, onBlur: handleBlur } as React.HTMLAttributes<HTMLElement>);
    }
    return child;
  });

  return (
    <div className="limited-wrapper">
      {childrenWithProps}
      {show && (
        <div className='limited-container-text'>
          <div className='limited-text'>
            <span className='limited-text-count limited-text-error'>{count}</span>
            <span> / {maxLength}</span>
          </div>

        </div>
      )}
    </div>
  )
}
export default InputLimited