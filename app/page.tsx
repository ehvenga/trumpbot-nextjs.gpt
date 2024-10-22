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
        width={420}
        height={420}
        className='absolute bottom-0 left-1/2 transform -translate-x-1/2'
      />
    </div>
  );
}
