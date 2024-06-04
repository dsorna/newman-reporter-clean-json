# newman-reporter-clean-json
Provides the same report as the default json newman-reporter, but omits the request and response body from execution. Therefore executions with multiple large request and response bodies can be processed by JSON.stringify
