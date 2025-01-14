import { BeforeStep, Then, When } from '@cucumber/cucumber'

let _testServerAddress = ''
BeforeStep(function () {
  _testServerAddress = this.testServerAddress
  console
})

When(`I create a young user with the following details:`, async function (dataTable) {
  console.log(dataTable)
})

Then(
  `I should receive an error message that the user must be at least 18 years old`,
  async function () {},
)
