## Overview

Static site starter template using the [GOV.UK Frontend package](https://frontend.design-system.service.gov.uk/#gov-uk-frontend). Uses webpack for bundling, nunjucks as the HTML template engine and includes support for Babel, TypeScript and Sass.

## Quickstart

`npm install` to install dependencies
`npm run serve` to start the dev server (hot reloading is included)  
`npm run build` to create a production build of all the static files and assets in the /dist/ folder

To add new components, refer to the [GOV.UK Design System components page](https://design-system.service.gov.uk/components/)

<strong>Note:</strong> The GOV.UK Design System component docs will assume that nunjucks has been configured to look in the govuk-frontend node module for templates, macros etc. For instance to sue the text input component the docs will say to do this -

```{% from "govuk/components/input/macro.njk" import govukInput %}```

But due to limitations in this repo we must use the full path instead -

```{% from "node_modules/govuk-frontend/govuk/components/input/macro.njk" import govukInput %}```