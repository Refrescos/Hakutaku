	'use client';

	import { useState, useEffect, useRef, ChangeEvent } from 'react';
	import MessageComponent from '../../../components/MessageComponent';
	import MessageList from '../../../components/MessageList';
	import SearchBar from '../../../components/SearchBar';

	interface Message {
	question: string;
	response: string;
	}

	interface Intent {
	id: string;  // Identificador da intenção
	}

	export default function Chat() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [intents, setIntents] = useState<Intent[]>([]);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	// Função para buscar a última conversa
	const fetchLastConversation = async () => {
		try {
		const response = await fetch('http://localhost:3000/api/conversations');
		if (!response.ok) {
			throw new Error('Erro ao buscar conversas');
		}
		const data = await response.json();
		const intentsArray = data.intents.map((id: string) => ({ id }));
		setIntents(intentsArray);

		// Verifica se há conversas e busca a última
		if (intentsArray.length > 0) {
			const lastIntentId = intentsArray[intentsArray.length - 1].id;
			const lastConversationResponse = await fetch(`http://localhost:3000/api/conversations/${lastIntentId}`);
			if (!lastConversationResponse.ok) {
			throw new Error('Erro ao buscar a última conversa');
			}
			const lastConversationData = await lastConversationResponse.json();
			const chatMessages = lastConversationData.chat.map((chat: { user: string, bot: string }) => ({
			question: chat.user,
			response: chat.bot,
			}));
			setMessages(chatMessages); // Armazena as mensagens da última conversa
		}
		} catch (error) {
		console.error('Erro:', error);
		}
	};

	useEffect(() => {
		fetchLastConversation(); // Busca a última conversa ao montar o componente
	}, []);

	const handleSearch = () => {
		if (searchTerm.trim() === '') return;

		const newMessage: Message = {
		question: searchTerm,
		response: `Resposta simulada para: ${searchTerm}`
		};

		setMessages((prevMessages) => [...prevMessages, newMessage]);
		setSearchTerm('');
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<section className="flex flex-col h-full bg-[#EDE9E2]">
		<div className="flex flex-row gap-4 py-8 md:py-0 flex-1">
			<MessageList chats={intents} />
			<div className="flex-1 flex flex-col items-center justify-center">
			<div className="flex-1 w-full overflow-y-auto px-40" style={{ maxHeight: '500px' }}>
				{messages.map((message, index) => (
				<MessageComponent key={index} message={message} />
				))}
				<div ref={messagesEndRef} />
			</div>
			<SearchBar searchTerm={searchTerm} onChange={handleInputChange} onSearch={handleSearch} />
			</div>
		</div>
		</section>
	);
	}
