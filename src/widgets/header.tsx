import { Sparkles } from "lucide-react";

export const Header = () => (
	<header className="fixed top-0 z-50 w-full border-white/5 border-b bg-background/80 backdrop-blur-md">
		<div className="container mx-auto flex h-16 items-center justify-between px-4">
			<div className="flex items-center gap-2">
				<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-blue-600">
					<Sparkles className="h-5 w-5 text-white" />
				</div>
				<span className="font-bold text-xl tracking-tight">Resume Mind</span>
			</div>
		</div>
	</header>
);
