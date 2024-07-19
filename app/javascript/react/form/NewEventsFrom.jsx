import React from 'react';
import DynamicCalendar from "../newCalendar/components/Calendar"
import { useForm } from 'react-hook-form';

export const Form = () => {
  const {register, handlesubmit} = useForm()

  
  return (
    <div>
      <div class="h-screen flex justify-center items-center m-[30px] p-[40px] ">
      <div class="card-body shadow-2xl">
      
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <DynamicCalendar />
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}