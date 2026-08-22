import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 bg-gray-100 dark:bg-gray-900">
      <h1>Boycott This!</h1>
      <Button variant="outline">Sign In</Button>
    </nav>
  );
}
