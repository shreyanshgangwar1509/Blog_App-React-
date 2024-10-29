import React, { useId } from 'react';

function Select({
    options,
    label,
    className='',
    ...props
},ref) {
    const id=useId();
  return (
    <div className='w-full'>
    {label && <label htmlFor={id} className=''></label>}
    <select
    {...props}
    id={id}
    ref ={ref}
    className={`${className}`}
    >
        {options?.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
    </select>
    </div>
  )
}

export default React.forwardRef(Select)