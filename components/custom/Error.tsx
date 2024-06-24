import { useRouter } from "next/router";
import { Button } from "../ui/button";

interface ErrorProps {
  errorMessage: string;
  refetch: () => void;
}

export function Error({ errorMessage, refetch }: ErrorProps) {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-5/6 h-80">
        <h1 className="text-2xl text-center mt-12">{errorMessage}</h1>
      </div>
      <div className="grid-cols-1 grid mb-32 lg:max-w-40 lg:w-96 mb-0 space-x-4">
        <Button
          variant="secondary"
          onClick={() => {
            router.back();
            refetch();
          }}
        >
          Go back
        </Button>
      </div>
    </main>
  );
}
