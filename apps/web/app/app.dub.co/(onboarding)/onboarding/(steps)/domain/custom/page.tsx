import { StepPage } from "../../step-page";
import { Form } from "./form";

export default function Custom() {
  return (
    <StepPage
      title="Connect a custom domain"
      description={
        <a
          href="https://dub.co/help/article/choosing-a-custom-domain"
          target="_blank"
          className="underline transition-colors hover:text-neutral-700"
        >
          Read our guide for best practices
        </a>
      }
    >
      <Form />
    </StepPage>
  );
}
