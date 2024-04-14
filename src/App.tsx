import { ProfileForm } from "@/components/features/ProfileForm";
import "./globals.css";
import { Header } from "@/components/ui/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl">
        <ProfileForm />
      </main>
      <footer className=""></footer>
    </>
  );
};

export default App;
