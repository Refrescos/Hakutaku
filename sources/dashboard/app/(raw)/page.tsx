import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import Login from '@/components/Login';

export default function Home() {
  return (
    <section className="flex flex-col items-center min-w-screen justify-center h-full">
      <div className="flex flex-row min-w-full text-center min-h-full px-10">
        <div className='w-3/5 h-full items-center justify-center flex'>
          <Image src="/hakutakuBig.png" alt='Avatar hakutaku' width={656} height={856} />
        </div>
        <div className='w-2/5 bg-[#F26B1D] h-full rounded-3xl flex flex-col items-center justify-center gap-y-10'>
          <div>
            <Image src="/loginHakutaku.png" alt='Hakutaku' width={256} height={256} />
            <h1 className='font-bold text-3xl text-white'>BOAS VINDAS!</h1>
          </div>

          <div className='flex flex-col justify-center gap-y-3 w-full px-20'>
          <Login />
          </div>
        </div>
      </div>
    </section>
  );
}
