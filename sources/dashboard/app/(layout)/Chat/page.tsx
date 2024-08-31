import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';

export default function Chat() {
  // Chame as funções para obter classes de estilo
  const titleClass = title(); // Chamada correta
  const subtitleClass = subtitle(); // Chamada correta

  const buttonClassSolid = 'bg-blue-500 text-white hover:bg-blue-600'; // Exemplo de classe
  const buttonClassOutlined = 'border border-blue-500 text-blue-500 hover:bg-blue-50'; // Classe para botão 'bordered'

  return (
    <section className="flex flex-row gap-4 py-8 md:py-0 h-full bg-[#EDE9E2]">
      {/* Sidebar */}
      <aside className="w-1/5 bg-[#EDE9E2] text-black  px-4 h-full shadow-md rounded-md">
        <h2 className="text-lg">Hoje</h2>
        <nav className="flex flex-col space-y-2">
          <Link 
            href="/" 
            className="rounded-xl shadow-xl p-2 bg-[#E25F2B] opacity-85 overflow-hidden whitespace-nowrap overflow-ellipsis"
            style={{ maxWidth: '350px' }} // Defina o tamanho máximo do contêiner
          >
            Como poderia fazer a integração da minha api starbank com meu banco
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 inline-block max-w-xl text-center justify-center">
        {/* Conteúdo principal pode ser adicionado aqui */}
      </div>
    </section>
  );
}
