import Link from 'next/link';
import React from 'react';

function TestItem({ test, labels}: any) {
  let status = <p className='text-[#EFB034] font-bold'>{labels.label_pending}</p>
  let action = 
    <Link href="/tech-test" >
      <p className='text-[#0EA89B] underline decoration-solid'>{labels.label_present}</p>
    </Link>
  
  if (test.vencida) {
    status = <p className='text-[#DE3B40] font-bold'>{labels.label_expired}</p>;
    action = <p className='text-[#BCC1CA]'>{labels.label_present}</p>;
  } else if (test.estado === 'presentada' && test.resultado) {
    status = <p className='text-[#379aE3] font-bold'>{labels.label_ready}</p>;
    action = <p className='text-[#379aE3]'>{test.resultado}</p>;

  }
  return (
    <div className="test-item  grid grid-cols-3 pt-5 pb-5 pl-5 border-solid border-2 border-[#F3F4F6]">
      <h3 className='font-bold'>{test.title}</h3>
      {status}
      {action}
    </div>
  );
}

export default TestItem;