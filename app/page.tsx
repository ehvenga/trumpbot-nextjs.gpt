import TrumpChat from '@/components/TrumpChat';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl font-bold text-center mb-8'>Chat with Trump</h1>
      <TrumpChat />
      <Image
        src={'/donald_trump.png'}
        alt={'Trump Gleaming'}
        width={380}
        height={380}
        className='hidden md:block md:absolute w-1/4 sm:w-[380px] bottom-0 left-1/2 transform -translate-x-1/2'
      />
    </div>
  );
}
