import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingState } from "./ui/multi-step-loader";
import { cn } from "@/lib/utils";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("h-6 w-6", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const StepItem = ({
  item,
  index,
  value,
}: {
  item: LoadingState;
  index: number;
  value: number;
}) => {
  const beforeActive = index < value;
  const afterActive = index >= value;
  const isActive = index === value;

  return (
    <Card
      className={cn("min-h-[250px] w-full max-w-sm", {
        "opacity-50": !isActive,
        "border-2 border-lime-500": isActive,
      })}
    >
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardAction>
          <div>
            {afterActive && (
              <CheckIcon className="text-black dark:text-white" />
            )}
            {beforeActive && (
              <CheckFilled
                className={cn(
                  "text-black dark:text-white",
                  value === index &&
                    "text-black opacity-100 dark:text-lime-500",
                )}
              />
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{item.description}</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {item.button && (
          <Button type="submit" className="w-full" disabled={!isActive}>
            {item.button.text}
          </Button>
        )}
        <Button variant="outline" className="w-full" disabled={!isActive}>
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
};
