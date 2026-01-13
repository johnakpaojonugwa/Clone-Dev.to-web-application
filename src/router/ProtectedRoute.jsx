import { Outlet } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function ProtectedRoute() {
	const { isAuthenticated, loadingUser, authRedirect, loadingView } = useAuthGuard();

	if (!isAuthenticated) return authRedirect("/login");

	if (loadingUser) return (
		<div className="flex items-center justify-center h-40">
			{loadingView}
		</div>
	);

	return <Outlet />;
}
