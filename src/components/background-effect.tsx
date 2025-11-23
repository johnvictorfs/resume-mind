export const BackgroundEffect = () => (
	<>
		<div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
		<div className="-top-40 -right-40 pointer-events-none absolute h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
		<div className="-left-20 pointer-events-none absolute top-40 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
	</>
);
