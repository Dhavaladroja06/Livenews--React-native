import { NavigationContainer } from "@react-navigation/native";
import ButtomTab from "./src/navigations/ButtomTab";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ButtomTab />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
