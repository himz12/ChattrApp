import React from 'react';
import { MessageSquare } from 'lucide-react';

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/70'>
      <div className='max-w-md text-center space-y-6'>
        <div className='flex justify-center gap-4 mb-4'>
          <div className='relative'>
            <div className='w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse shadow-lg'>
              <MessageSquare className='w-8 h-8 text-primary' />
            </div>
          </div>
        </div>
        <h2 className='text-3xl font-bold text-primary'>
          Welcome to <span className='text-secondary'>Chattr</span>
        </h2>
        <p className='text-base-content/70'>
          Where the convo never sleeps... <br /> but maybe you should.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
