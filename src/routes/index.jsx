import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../pages/sign-in/index.jsx";
import { SignUp } from "../pages/sign-up/index.jsx";
import { PrivateRouteLayout } from "../templates/private/index.jsx";
import { Locais } from "../pages/locals/index.jsx";
import { Dashboard } from "../pages/dashboard/index.jsx"; 
import { CadastrarLocal } from "../pages/cadastrar-local/index.jsx";

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <SignIn />
	},
	{
		path: '/cadastrar',
		element: <SignUp />
	},
	{
		path: '/dashboard',
		element: <PrivateRouteLayout />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/dashboard/locals',
				element: <Locais />,
			},
			{
				path:'/dashboard/locals/cadastrar',
				element: <CadastrarLocal />
			}
		],
	},
])