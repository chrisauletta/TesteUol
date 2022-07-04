import { setupTest, createPage } from '@nuxt/test-utils'

describe('browser', () => {
  setupTest({
    testDir: '@/pages/contents',
    fixture: 'contents',
    browser: true
  })

  test('should render page', async () => {
    const page = await createPage('/')
    const body = await page.innerHTML('body')
    expect(body).toContain('Works!')
  })
})