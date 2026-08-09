import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("new-app", {
    description: "Scaffold a new client web application or landing page",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of the app (e.g. client-apex or client-saas)?",
        validate: (input: string) => {
          if (input.includes(" ")) {
            return "App name cannot contain spaces";
          }
          if (!input) {
            return "App name is required";
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "apps/{{name}}",
        templateFiles: "templates/app/**",
        base: "templates/app",
      },
    ],
  });
}
