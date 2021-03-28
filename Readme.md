# Casavo mobile assessment

## Rationale

Since the two exercises (TODOs and friends finder) are very similar I decided not to do two separate projects (or screens) but include both under the same views, with a list and the detail.

For the dependency/services management I didn't setup anything particular for the simple use case. For a possible evolution of the code I would go with an IOC container like [inversify](https://inversify.io/) that will allow a greater control over the dependencies of the application.

With more time I would have written some services for GPS and linking like I did for the HTTP client to allow a proper inversion of control for the functions I wrote, and open up the possibility to future use cases like decorators over services (e.g. adding authentication over the http client).

## Run

`cd CasavoAssessment && npx react-native run-ios`

## Demo

![Demo GIF](./demo.gif)

## What could come next

- localization with [i18next](https://www.i18next.com/)
- inversify integration
- better detail using [bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/) for fluid navigation
- add error feedbacks when operations on todos fails or no apps are available to perform certain operations (e.g. open map)
- e2e testing with detox