import React, { useRef, useEffect, useState } from 'react';

// Import flower images
import flower1 from '../../assets/Flowers/Layer 24.png';
import flower2 from '../../assets/Flowers/Layer 21.png';
import flower3 from '../../assets/Flowers/Layer 29.png';
import flower4 from '../../assets/Flowers/Layer 111.png';
import flower5 from '../../assets/Flowers/Layer 18.png';
import flower6 from '../../assets/Flowers/Layer 16.png';

// Timeline data with pastel color accents, each with a unique flower image
const storyEvents = [
	{
		year: '1996',
		title: 'We Met',
		description: 'Our story began in 1996, when fate brought us together for the very first time. A serendipitous meeting that would change our lives forever.',
		flower: flower1,
		color: 'from-blush-50 to-sage-50',
	},
	{
		year: '2016',
		title: 'We Became Official',
		description: 'After years of friendship, we made it official and began our journey as a couple, cherishing our love and keeping it just between us for a while.',
		flower: flower2,
		color: 'from-sage-50 to-cream-50',
	},
	{
		year: '2018',
		title: 'Our Son Kganya Was Born',
		description: 'Our family grew in 2018 with the arrival of our beautiful son, Kganya. He brought new light and laughter into our lives.',
		flower: flower3,
		color: 'from-cream-50 to-blush-100',
	},
	{
		year: '2020',
		title: 'The Proposal & Our First Home',
		description: 'In 2020, Thabi said yes to forever. We moved into our first home together, starting a new chapter filled with love and dreams.',
		flower: flower4,
		color: 'from-blush-100 to-sage-50',
	},
	{
		year: '2023',
		title: 'A New Home',
		description: 'We moved into our new home, a proud milestone and a dream come true. Our hearts and family grew even stronger.',
		flower: flower5,
		color: 'from-sage-50 to-cream-50',
	},
	{
		year: '2025',
		title: '9 Years & Our Wedding',
		description: 'We celebrate 9 years of love and begin our wedding celebrations, surrounded by family and friends. Here's to forever!',
		flower: flower6,
		color: 'from-blush-100 to-blush-50',
	},
];

const OurStory: React.FC = () => {
	const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
	const [visible, setVisible] = useState<boolean[]>(Array(storyEvents.length).fill(false));

	useEffect(() => {
		const observers: IntersectionObserver[] = [];
		storyEvents.forEach((_, idx) => {
			const ref = itemRefs.current[idx];
			if (!ref) return;
			const observer = new window.IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setVisible((prev) => {
								const updated = [...prev];
								updated[idx] = true;
								return updated;
							});
							observer.disconnect();
						}
					});
				},
				{ threshold: 0.2 }
			);
			observer.observe(ref);
			observers.push(observer);
		});
		return () => {
			observers.forEach((observer) => observer.disconnect());
		};
	}, []);

	return (
		<section
			id="our-story"
			className="relative py-28 bg-gradient-to-br from-sage-50 via-cream-50 to-blush-50 overflow-hidden min-h-screen z-[50]"
		>
			{/* Heading */}
			<h1 className="text-center font-serif text-5xl md:text-6xl text-blush-600 mb-8 tracking-tight z-20 relative drop-shadow-lg">
				<span className="font-cursive block text-sage-700 text-5xl md:text-8xl mb-2">A Love Story</span>
			</h1>
			{/* Decorative floating circles and background flowers */}
			<div className="pointer-events-none">
				<div className="absolute top-10 left-10 w-40 h-40 bg-blush-100 rounded-full opacity-30 blur-2xl animate-pulse-slow"></div>
				<div className="absolute bottom-0 right-0 w-72 h-72 bg-sage-100 rounded-full opacity-20 blur-3xl animate-pulse-slower"></div>
				<div className="absolute top-1/2 left-0 w-24 h-24 bg-cream-100 rounded-full opacity-20 blur-2xl animate-pulse"></div>
				{/* Floating flower images */}
				<img
					src={flower1}
					alt="Floating flower"
					className="absolute top-0 left-1/4 w-32 md:w-40 opacity-60 animate-flower-float-1 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
				<img
					src={flower2}
					alt="Floating flower"
					className="absolute bottom-10 right-1/4 w-28 md:w-36 opacity-50 animate-flower-float-2 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
				<img
					src={flower3}
					alt="Floating flower"
					className="absolute top-1/3 right-10 w-24 md:w-32 opacity-40 animate-flower-float-3 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
				<img
					src={flower4}
					alt="Floating flower"
					className="absolute top-24 left-10 w-24 md:w-32 opacity-50 animate-flower-float-4 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
				<img
					src={flower5}
					alt="Floating flower"
					className="absolute bottom-24 left-1/3 w-20 md:w-28 opacity-40 animate-flower-float-5 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
				<img
					src={flower6}
					alt="Floating flower"
					className="absolute top-1/2 right-0 w-24 md:w-32 opacity-40 animate-flower-float-6 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
				<img
					src={flower4}
					alt="Floating flower"
					className="absolute bottom-0 left-0 w-28 md:w-36 opacity-30 animate-flower-float-7 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
				<img
					src={flower1}
					alt="Floating flower"
					className="absolute top-0 right-1/3 w-20 md:w-28 opacity-30 animate-flower-float-8 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
				<img
					src={flower4}
					alt="Floating flower"
					className="absolute bottom-1/4 right-10 w-16 md:w-24 opacity-30 animate-flower-float-9 pointer-events-none"
					style={{ zIndex: 1 }}
				/>
			</div>
			<div className="container mx-auto px-4">
				{/* Timeline */}
				<div className="relative max-w-4xl mx-auto">
					{/* Flowing vertical line */}
					<div className="absolute left-1/2 top-0 h-full w-2 z-0 -translate-x-1/2 rounded-full bg-gradient-to-b from-blush-100 via-sage-100 to-cream-100 animate-gradient-y"></div>
					<ul className="space-y-32 relative z-10">
						{storyEvents.map((event, idx) => {
							const isLeft = idx % 2 === 0;
							return (
								<li
									key={event.year}
									ref={el => (itemRefs.current[idx] = el)}
									className={`
										group flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-12
										${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
										transition-all duration-700 ease-out
										will-change-[opacity,transform]
										${visible[idx]
											? 'opacity-100 translate-y-0 animate-fade-in-up'
											: 'opacity-0 translate-y-16'
										}
									`}
									style={{
										transitionDelay: `${idx * 120}ms`
									}}
								>
									{/* Date marker and flower */}
									<div className="flex flex-col items-center md:items-start md:w-1/4 relative z-20">
										<div className="relative mb-4">
											<img
												src={event.flower}
												alt="Timeline flower"
												className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-full shadow-lg border-4 border-white bg-white"
												style={{ background: 'rgba(255,255,255,0.7)' }}
											/>
											{/* Flowing connector dot */}
											<div className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blush-200 to-sage-100 border-4 border-white shadow-lg z-10"></div>
										</div>
										<div className="font-serif text-xl md:text-2xl text-blush-600 bg-white/80 px-4 py-1 rounded-full shadow border border-blush-100 mb-2 tracking-widest">
											{event.year}
										</div>
									</div>
									{/* Card */}
									<div className={`
										bg-gradient-to-br ${event.color} bg-opacity-60
										backdrop-blur-2xl rounded-3xl shadow-2xl border border-blush-100
										p-8 md:w-3/4 relative
										${isLeft ? 'md:ml-8' : 'md:mr-8'}
										hover:scale-[1.025] hover:shadow-3xl transition-transform duration-300
									`}>
										<h3 className="font-serif text-2xl md:text-3xl text-dusty-800 mb-2 tracking-tight font-bold">
											{event.title}
										</h3>
										<p className="text-lg md:text-xl text-blush-700 mb-2">{event.description}</p>
										{/* Decorative sparkle */}
										<svg className="absolute -top-4 -right-4 w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24">
											<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#E6A4B4" strokeWidth="2" strokeLinecap="round"/>
										</svg>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
				{/* Decorative blush circle */}
				<div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blush-50 rounded-full opacity-40 z-0"></div>
				<div className="absolute -top-24 -right-24 w-72 h-72 bg-blush-100 rounded-full opacity-30 z-0"></div>
				{/* Decorative SVG waves */}
				
			</div>
			{/* Custom keyframes and font for floating and gradient animation */}
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
				.font-cursive { font-family: 'Great Vibes', cursive; }
				@keyframes float {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-12px); }
				}
				.animate-float { animation: float 3s ease-in-out infinite; }
				@keyframes gradient-y {
					0%, 100% { background-position: 0% 0%; }
					50% { background-position: 0% 100%; }
				}
				.animate-gradient-y {
					background-size: 100% 200%;
					animation: gradient-y 6s ease-in-out infinite;
				}
				@keyframes pulse-slow {
					0%, 100% { opacity: 0.3; }
					50% { opacity: 0.6; }
				}
				.animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
				@keyframes pulse-slower {
					0%, 100% { opacity: 0.2; }
					50% { opacity: 0.5; }
				}
				.animate-pulse-slower { animation: pulse-slower 8s ease-in-out infinite; }
				@keyframes fade-in-up {
					0% {
						opacity: 0;
						transform: translateY(40px);
					}
					100% {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in-up {
					animation: fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1) both;
				}
				@keyframes flower-float-1 {
					0%, 100% { transform: translateY(0) rotate(-8deg) scale(1); }
					50% { transform: translateY(-30px) rotate(8deg) scale(1.08); }
				}
				.animate-flower-float-1 { animation: flower-float-1 9s ease-in-out infinite; }
				@keyframes flower-float-2 {
					0%, 100% { transform: translateY(0) rotate(6deg) scale(1); }
					50% { transform: translateY(-20px) rotate(-6deg) scale(1.06); }
				}
				.animate-flower-float-2 { animation: flower-float-2 11s ease-in-out infinite; }
				@keyframes flower-float-3 {
					0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
					50% { transform: translateY(-25px) rotate(12deg) scale(1.04); }
				}
				.animate-flower-float-3 { animation: flower-float-3 13s ease-in-out infinite; }
				@keyframes flower-float-4 {
					0%, 100% { transform: translateY(0) rotate(5deg) scale(1); }
					50% { transform: translateY(-18px) rotate(-5deg) scale(1.07); }
				}
				.animate-flower-float-4 { animation: flower-float-4 10s ease-in-out infinite; }
				@keyframes flower-float-5 {
					0%, 100% { transform: translateY(0) rotate(-3deg) scale(1); }
					50% { transform: translateY(-15px) rotate(3deg) scale(1.05); }
				}
				.animate-flower-float-5 { animation: flower-float-5 12s ease-in-out infinite; }
				@keyframes flower-float-6 {
					0%, 100% { transform: translateY(0) rotate(7deg) scale(1); }
					50% { transform: translateY(-22px) rotate(-7deg) scale(1.06); }
				}
				.animate-flower-float-6 { animation: flower-float-6 14s ease-in-out infinite; }
				@keyframes flower-float-7 {
					0%, 100% { transform: translateY(0) rotate(-10deg) scale(1); }
					50% { transform: translateY(-12px) rotate(10deg) scale(1.03); }
				}
				.animate-flower-float-7 { animation: flower-float-7 15s ease-in-out infinite; }
				@keyframes flower-float-8 {
					0%, 100% { transform: translateY(0) rotate(4deg) scale(1); }
					50% { transform: translateY(-10px) rotate(-4deg) scale(1.02); }
				}
				.animate-flower-float-8 { animation: flower-float-8 13s ease-in-out infinite; }
				@keyframes flower-float-9 {
					0%, 100% { transform: translateY(0) rotate(-2deg) scale(1); }
					50% { transform: translateY(-8px) rotate(2deg) scale(1.01); }
				}
				.animate-flower-float-9 { animation: flower-float-9 12s ease-in-out infinite; }
			`}</style>
		</section>
	);
};

export default OurStory;