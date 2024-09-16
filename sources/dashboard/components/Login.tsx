// components/Login.tsx
'use client';

import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);


  const handleLoginWithGoogle = () => {
    // Implementar lógica de login com Google
    // Supondo que o login seja bem-sucedido, você pode redirecionar o usuário
    window.location.href = '/Chat';

  };

  const handleLoginWithEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implementar lógica de login com email e senha
    window.location.href = '/Chat';

  };

  return (
    <div className="flex flex-col items-center justify-center rounded-xl">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLoginWithEmail}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F26B1D] text-white py-2 rounded-md hover:bg-[#F26B1D] transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="relative text-center">
          <span className="text-gray-500">ou</span>
        </div>

        <button
          onClick={handleLoginWithGoogle}
          className="w-full flex items-center justify-center py-2 mb-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <FcGoogle  className=" mx-2"/>
          Entrar com Google
        </button>
      </div>
    </div>
  );
};

export default Login;
