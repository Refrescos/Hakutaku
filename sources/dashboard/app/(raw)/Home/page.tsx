import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import starkbank from "public/starkbank.png";
import IconStark from '@/components/icons/IconStark';

export default function Home() {
	return (
		<section className="flex flex-col items-center min-w-screen justify-center h-full bg-[#EDE9E2]">
			<div className="flex flex-row min-w-full text-center min-h-full">
				{/* Sidebar */}
				<div className="w-1/10 bg-[#E25F2B] p-4 flex flex-col"> {/* Ajuste a cor e o preenchimento conforme necessário */}
					{/* Conteúdo da Sidebar */}
					<h2 className="text-lg font-bold">Sidebar</h2>
					<Image src="/Vector.png" alt='logo' width={150} height={150}></Image>
					<ul>
						<li><Link href="/">Link 1</Link></li>
						<li><Link href="/">Link 2</Link></li>
						<li><Link href="/">Link 3</Link></li>
					</ul>
				</div>

				{/* Conteúdo principal */}
				<div className="flex-grow bg-white p-4">
					{/* Aqui você pode adicionar o conteúdo principal da sua página */}
					<h1 className="text-2xl">Conteúdo Principal</h1>
				</div>
			</div>
		</section>
	);
}
