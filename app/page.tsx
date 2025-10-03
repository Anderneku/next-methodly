import { Button } from "@/components/ui/button";
import Image from 'next/image';
export default function Home() {
  return (
    <div>
      <div className="relative flex h-fit w-full items-center justify-center p-8">
        <Image
			className="absolute top-2 left-2 transition-all hover:scale-110 hover:rotate-12"
			src="/methodlyIcon.svg"
			width="128"
			height="128"
			alt=""
		/>
        <h1 className="cursor-default shadow-lg rounded-xl bg-accent-foreground p-4 text-4xl text-accent transition-all hover:scale-150">
          Methodly
        </h1>
      </div>
      <div className="flex flex-col gap-8">
        <section className="flex h-full w-full flex-col items-center justify-center gap-8">
          <div>
            <div className="flex items-center justify-center gap-4">
              <h1 className="cursor-default rounded-xl bg-secondary text-secondary-foreground p-4 text-7xl shadow-lg transition-all hover:scale-110 hover:rotate-[-12deg]">
                Writing Goals
              </h1>
              <h1 className="text-7xl">isn't Enough!</h1>
            </div>
            <div className="flex items-center justify-center gap-4">
              <h1 className="border-b-8 border-dotted border-border font-sans text-7xl">
                Create
              </h1>
              <h1 className="cursor-default rounded-xl bg-primary text-primary-foreground p-4 font-sans text-7xl shadow-lg transition-all hover:scale-110 hover:rotate-12">
                Systems
              </h1>
            </div>
            <p className="p-2 text-center text-[20px] text-muted-foreground">
              Create systems to achieve your goals using the James Clear method
              (Atomic Habits)
            </p>
          </div>
          <form className="flex items-center gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="text-1xl w-2xs shadow-lg rounded-lg border-2 border-border p-2 outline-0 transition-all hover:ring-2 focus:translate-y-[-2px] focus:scale-105 focus:ring-2"
            />
            <Button
              type="submit"
              className="shadow-lg transition-all bg-primary text-primary-foreground  hover:scale-105 active:bg-secondary "
            >
              Join the Waitlist
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
