import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { routes } from "./routes";


export default function App(){
	return (
		<AuthProvider>
			<RouterProvider router={routes} />
		</AuthProvider>
	)
}