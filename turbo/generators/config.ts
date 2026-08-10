/**
 * FILE: config.ts
 * PURPOSE: Define a Turborepo generator that scaffolds a new client web application.
 * ARCHITECTURE: Turbo generator config using plop to prompt for an app name and copy template files into apps/.
 * KEY RULES: App names must be non-empty and contain no spaces; templates are sourced from templates/app.
 * DEPENDS ON: @turbo/gen (PlopTypes).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { PlopTypes } from "@turbo/gen";

/**
 * WHAT IT DOES: Registers the "new-app" Turborepo generator with prompts and file actions.
 * @param {PlopTypes.NodePlopAPI} plop – plop API used to register generators
 * @return {void} – no return value
 * SIDE EFFECTS: Registers a generator on the provided plop instance
 * ASSUMES: plop is a valid NodePlopAPI and template files exist at templates/app
 */
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("new-app", {
    description: "Scaffold a new client web application or landing page",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of the app (e.g. client-apex or client-saas)?",
        /**
         * WHAT IT DOES: Validates the app name entered into the generator prompt.
         * @param {string} input – proposed app name
         * @return {string | true} – error message if invalid, or true if valid
         * SIDE EFFECTS: None
         * ASSUMES: input is a non-null string provided by the plop prompt
         */
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
